import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PricingSection = ({ setServiceSlug }) => {
  const [normalpackage, setNormalpackage] = useState([]);
  const [hourlypackage, setHourlypackage] = useState([]);
  const [showHourlyPackages, setShowHourlyPackages] = useState(false);
  const location = useLocation();
  const [heading, setHeading] = useState("");
  const [subHeading, setSubheading] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const response = await axios.get(`/api/packagedescription/front/${slug}`, {
          withCredentials: true,
        });
        const { title, description } = response.data.data.packages[0];
        setHeading(title || "");
        setSubheading(description || "");
      } catch (error) {
        console.error("Error fetching headings:", error);
      }
    };
    fetchHeadings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/packages/front/${slug}`, {
          withCredentials: true,
        });
        if (response.data.data.packages.length > 0) {
          setServiceSlug(response.data.data.packages[0].servicecategories[0]);
        }
        setNormalpackage(response.data.data.packages);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    const fetchHourlyData = async () => {
      try {
        const response = await axios.get(`/api/packages/hourlypackage/${slug}`, {
          withCredentials: true,
        });
        if (response.data.data.packages.length > 0) {
          setServiceSlug(response.data.data.packages[0].servicecategories[0]);
        }
        setHourlypackage(response.data.data.packages);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
    fetchHourlyData();
  }, [location.pathname, setServiceSlug]);

  const parseJsonArray = (jsonArray) => {
    try {
      return JSON.parse(jsonArray);
    } catch {
      return [];
    }
  };

  const togglePackageView = () => {
    setShowHourlyPackages(!showHourlyPackages);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const PackageCard = ({ item }) => {
    const whatIsTheir = parseJsonArray(item.whatIsTheir[0]);
    const whatIsNotTheir = parseJsonArray(item.whatIsNotTheir[0]);

    const splitHeading = (text) => {
    const words = text.trim().split(" ");
    const midpoint = Math.floor(words.length / 2);
    const firstPart = words.slice(0, midpoint).join(" ") + " ";
    const secondPart = words.slice(midpoint).join(" ");
    return { firstPart, secondPart };
  };

    return (
      <div className="bg-[#F7F4EE] border border-gray-300 shadow-lg rounded-lg p-6 mb-10 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center">
          <h3 className="md:text-2xl font-bold mb-2">
            {splitHeading(item.title).firstPart}
            <span className="text-[#ec2127]">{splitHeading(heading).secondPart}
            </span></h3>
        </div>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: item.description }} />
        <p className="text-4xl text-black font-bold pb-2">₹{item.price}</p>
        
        <div className="mt-6 mb-4 text-md text-gray-600 flex-grow">
          <ul className="list-disc list-inside">
            {whatIsTheir.map((detail, index) => (
              <li key={index} className="flex gap-2 mb-4">
                <FaCheck className="text-[#ec2127] text-md flex-shrink-0 mt-2" />
                {detail}
              </li>
            ))}
          </ul>
          {!showHourlyPackages && (
            <p>
              <b>Additional Revisions</b>: After the free virtual meeting,
              any further changes will be charged on an hourly basis.
              <span className="text-[#ec2127] cursor-pointer" onClick={togglePackageView}>
                (Hourly Rates)
              </span>
            </p>
          )}
          <ul className="mt-2 mb-4 text-md text-gray-600">
            {whatIsNotTheir.map((exclusion, index) => (
              <li key={index} className="flex gap-2 mb-4">
                <RxCross2 className="text-red-600 text-md flex-shrink-0 mt-2" />
                {exclusion}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-auto w-full px-4 py-2 bg-[#ec2127] text-white rounded-lg text-sm sm:text-base"
          onClick={() => navigate(`/contact`)}
        >
          Get Started
        </button>
      </div>
    );
  };
  const splitHeading = (text) => {
    const words = text.trim().split(" ");
    const midpoint = Math.floor(words.length / 2);
    const firstPart = words.slice(0, midpoint).join(" ") + " ";
    const secondPart = words.slice(midpoint).join(" ");
    return { firstPart, secondPart };
  };

  return (
    <div className="mt-20">
      <div className="text-center p-6">
        <h2 className="text-2xl md:text-4xl font-bold font-serif text-gray-800 mb-8">
         {splitHeading(heading).firstPart}
  <span className="text-[#ec2127]">{splitHeading(heading).secondPart}</span>
        </h2>
        <p className="text-lg md:text-2xl px-4 md:px-20 text-gray-600">
          <ReactQuill
            readOnly={true}
            value={subHeading}
            modules={{ toolbar: false }}
            theme="bubble"
            className="quill-content"
          />
        </p>
        {showHourlyPackages && (
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-gray-800 my-8">
            Hourly Packages
          </h2>
        )}
        {showHourlyPackages && (
          <button
            onClick={togglePackageView}
            className="px-6 py-2 bg-[#ec2127] text-white rounded-lg hover:bg-red-600"
          >
            Back to Regular Packages
          </button>
        )}
      </div>

      <div className="mt-10 mb-10 xl:w-[75%] px-6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {showHourlyPackages
            ? hourlypackage.map((item) => <PackageCard key={item._id} item={item} />)
            : normalpackage.map((item) => <PackageCard key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;