import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Tawk.to chatbot script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/630dcc4b37898912e96620d6/1gbmuc2sq";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append the script to the document body
    document.body.appendChild(script);

    // Inject custom CSS to change button color
    const style = document.createElement("style");
    style.innerHTML = `
      .tawk-button {
        background-color: #ec2127 !important;
        border-color: #ec2127 !important;
      }
      .tawk-button:hover {
        background-color: #d41e22 !important;
        border-color: #d41e22 !important;
      }
    `;
    document.head.appendChild(style);

    // Optional: Use Tawk.to API to set custom attributes (if supported)
    Tawk_API.onLoad = function() {
      // Attempt to set custom styles via API (limited support)
      if (Tawk_API.setAttributes) {
        Tawk_API.setAttributes({
          widgetColor: '#ec2127' // Attempt to set widget color
        }, function(error) {
          if (error) {
            console.error('Error setting Tawk.to attributes:', error);
          }
        });
      }
    };

    return () => {
      // Cleanup: Remove the script and style when the component unmounts
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return <div id="chatbot-container"></div>;
};

export default Chatbot; 