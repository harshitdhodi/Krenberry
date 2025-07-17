import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Tawk.to chatbot script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6878bb091786aa1911e6bfca/1j0bpl850";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    // Optional custom button styling
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

    // Optional Tawk.to API customization
    Tawk_API.onLoad = function () {
      if (Tawk_API.setAttributes) {
        Tawk_API.setAttributes(
          {
            widgetColor: '#ec2127',
          },
          function (error) {
            if (error) {
              console.error('Error setting Tawk.to attributes:', error);
            }
          }
        );
      }
    };

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return <div id="chatbot-container"></div>;
};

export default Chatbot;
