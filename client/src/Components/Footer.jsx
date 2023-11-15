import React from "react";
import {
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoTwitter,
} from "react-icons/bi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
          <h3 className="text-2xl mb-4">About Blog It</h3>
          <p>
            "Blog It" is a dynamic platform dedicated to exploring the latest
            trends, insights, and innovations in the todays industry. Our expert
            writers curate valuable content, ranging from in-depth articles to
            insightful tutorials, providing readers with a comprehensive
            understanding of latest technologies. Stay updated with the rapidly
            evolving world through our engaging and informative posts. Join our
            community and embark on a journey of continuous learning and
            discovery.
          </p>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0 flex flex-col items-center">
          <h3 className="text-2xl mb-4">Quick Links</h3>
          <ul className="list-none p-0">
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-white hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0  flex flex-col items-center">
          <h3 className="text-2xl mb-4">Connect With Us</h3>
          <ul className="list-none p-0">
            <li>
              <Link
              target="_blank"
                to="https://www.linkedin.com/in/abhishek-kumar-388117266/"
                className=" flex items-center  gap-3 text-white hover:text-gray-400"
              >
                <BiLogoLinkedin /> Linkedin
              </Link>
            </li>
            <li>
              <Link
              target="_blank"
                to="https://github.com/abhishekkumar0841"
                className=" flex items-center  gap-3 text-white hover:text-gray-400"
              >
                <BiLogoGithub /> GitHub
              </Link>
            </li>
            <li>
              <Link
              target="_blank"
                to="https://twitter.com/"
                className=" flex items-center  gap-3 text-white hover:text-gray-400"
              >
                <BiLogoTwitter /> Twitter
              </Link>
            </li>
            <li>
              <Link
              target="_blank"
                to="https://web.telegram.org"
                className=" flex items-center  gap-3 text-white hover:text-gray-400"
              >
                <BiLogoTelegram /> Telegram
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>
          &copy; {new Date().getFullYear()} Blog It. All rights reserved. |
          Designed and Developed by Abhishek Kumar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
