import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from "../assets/loader2.mp4";

// LoadingSpinner component with 95% playback logic
const LoadingSpinner = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current;
        if (!isVideoPlayed && currentTime / duration >= 0.95) {
          setIsVideoPlayed(true);
          onVideoEnd(); // Trigger the callback when 95% is reached
        }
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [onVideoEnd, isVideoPlayed]);

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
  <video
    ref={videoRef}
    autoPlay
    muted
    className="h-[80%] w-[80%] object-contain"
  >
    <source src={Loader} type="video/mp4" />
  </video>
</div>

  );
};

// PageTransition wrapper component
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  const handleVideoEnd = () => {
    setIsLoading(false); // Hide the loader and show the content
  };

  return (
    <>
      {isLoading && <LoadingSpinner onVideoEnd={handleVideoEnd} />}
      <div className={isLoading ? 'hidden' : 'block'}>
        {children}
      </div>
    </>
  );
};

// Route wrapper component
const PageLoader = ({ element: Element, ...rest }) => {
  return (
    <Suspense fallback={<LoadingSpinner onVideoEnd={() => {}} />}>
      <PageTransition>
        {Element}
      </PageTransition>
    </Suspense>
  );
};

export default PageLoader;
