import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function HeroSection() {
  const [heroSection, setHeroSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        // Extract the last part of the URL
        const slug = location.pathname.split('/').filter(Boolean).pop();

        // Fetch data from the API using the slug
        const response = await axios.get(`/api/pageHeading/heading?pageType=${slug}`, { withCredentials: true });
        const heroData = response.data;
        setHeroSection(heroData);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      }
    };

    fetchHeroSection();
  }, [location]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center text-center pt-44 pb-16 p-6">
      <h1 className="text-white text-6xl md:text-4xl lg:text-6xl font-semibold mb-7">
        {heroSection.heading || "Blogs"}
      </h1>
      <p className="text-white max-w-screen-lg text-xl md:text-xl mb-6">
        {heroSection.subheading || "This is the blog page"}
      </p>

    </div>
  );
}
