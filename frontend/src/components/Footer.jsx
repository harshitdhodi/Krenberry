import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaGoogle, FaBehance, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('/api/footer/getfooter');
        const transformedData = transformIncomingData(response.data);
        setFooterData(transformedData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/services/getCategory`, {
          withCredentials: true,
        });
        setServices(response.data.map(item => ({ name: item.category, slug: item.slug })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/newsletter/postnewsletter', { name, email }, { withCredentials: true });
      setMessage(response.data.message);
      setEmail('');
      setName('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get('/api/logo/footercolor', { withCredentials: true });
        setLogo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogos();
  }, []);

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-[#F7F4EE] text-black px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 py-6 md:py-10">
      <section className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          
          {/* Company Info Column */}
          <div className="lg:col-span-1 col-span-1 sm:col-span-2">
            <Link to="/" className="inline-block relative">
            {logo ? (
              <div className="relative">
                <img
                  src={`/api/logo/download/${logo.photo}`}
                  alt={logo.alt || ""}
                  title={logo.imgTitle || ""}
                  className="min-h-12 md:h-12 lg:h-14 xl:h-20 max-w-[150px] min-w-[100px] w-auto object-contain"
                />
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
            ) : null}
            </Link>
            <p className='text-sm text-left text-gray-600 leading-relaxed'>
              {footerData.description}
            </p>
            {/* Social Media Links - Uncomment if needed */}
            {/* <div className="flex space-x-4 mt-4">
              <a href={footerData.linkedinLink} target='_blank' rel='noopener noreferrer' 
                 className="text-gray-600 hover:text-[#ec2127] transition-colors duration-300">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href={footerData.instagramLink} target='_blank' rel='noopener noreferrer'
                 className="text-gray-600 hover:text-[#ec2127] transition-colors duration-300">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href={footerData.googleLink} target='_blank' rel='noopener noreferrer'
                 className="text-gray-600 hover:text-[#ec2127] transition-colors duration-300">
                <FaGoogle className="h-6 w-6" />
              </a>
              <a href={footerData.behanceLink} target='_blank' rel='noopener noreferrer'
                 className="text-gray-600 hover:text-[#ec2127] transition-colors duration-300">
                <FaBehance className="h-6 w-6" />
              </a>
            </div> */}
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1 col-span-1">
            <h4 className="font-bold text-md mb-4 lg:mb-6 uppercase">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={`/${service.slug}`} 
                    className="text-gray-600 text-sm cursor-pointer hover:text-[#ec2127] transition-colors duration-300 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div className="lg:col-span-1 col-span-1">
            <h4 className="font-bold text-md mb-4 lg:mb-6 uppercase">About</h4>
            <ul className="space-y-2">
              {footerData.aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 text-sm cursor-pointer hover:text-[#ec2127] transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-1 col-span-1">
            <h4 className="font-bold text-md mb-4 lg:mb-6 uppercase">Legal</h4>
            <ul className="space-y-2">
              {footerData.legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    rel='noopener noreferrer' 
                    className="text-gray-600 text-sm cursor-pointer hover:text-[#ec2127] transition-colors duration-300 inline-block break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="xl:col-span-2 col-span-1 sm:col-span-2">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg lg:text-xl mb-3 sm:mb-4 lg:mb-6 text-gray-800">
                Weekly Design Juice
              </h4>
              <p className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                Subscribe to get weekly updates on design trends and inspiration.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-1 border border-gray-200 rounded-lg text-sm lg:text-base 
                      focus:outline-none focus:border-[#ec2127] focus:ring-2 focus:ring-[#ec2127]/20 
                      transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-1 border border-gray-200 rounded-lg text-sm lg:text-base 
                      focus:outline-none focus:border-[#ec2127] focus:ring-2 focus:ring-[#ec2127]/20 
                      transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-2 bg-[#ec2127] text-white rounded-lg 
                    hover:bg-red-600 hover:shadow-lg active:transform active:scale-95
                    transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3 
                    text-sm lg:text-base font-medium lg:font-semibold shadow-sm
                    ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  <span>{loading ? 'Subscribing...' : 'Subscribe Now'}</span>
                  {!loading && <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
                </button>
              </form>
              {message && (
                <div className={`mt-3 lg:mt-4 px-3 sm:px-4 lg:px-5 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-medium ${
                  message.includes('successfully') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

// Function to transform the incoming data
const transformIncomingData = (data) => {
  return {
    logo: "../images/rndlogo.webp",
    description: data.newsletter || "Description not available",
    linkedinLink: data.linkedinLink || "",
    instagramLink: data.instagramLink || "",
    googleLink: data.googleLink || "",
    behanceLink: data.behanceLink || "",
    aboutLinks: [
      { name: "About Us", path: "/aboutus" },
      { name: "Career", path: "/career" },
      { name: "Collaboration", path: "/collabration" },
      { name: "Contact us", path: "/contact" },
      { name: "FAQ", path: "/helpCenter" }
    ],
    legalLinks: [
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Cookies Policy", path: "/cookies-policy" },
    ]
  };
};

export default Footer;