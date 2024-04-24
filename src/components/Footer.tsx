import React from "react";
import facebook from "/svgs/facebook.svg";
import twitter from "/svgs/twitter.svg";
import youtube from "/svgs/youtube.svg";
import linkedin from "/svgs/linkedin.svg";

const links = [
  "Undergraduate Portal",
  "Post Graduate Portal",
  "CCE Portal",
  "E-Learning Portal",
  "Journal System",
  "E-Transcript System",
  "PDS Registration",
  "SUG Election Nomination",
];

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-[#824D77] px-16 py-6 text-white">
      <div className="flex gap-6">
        <div className="w-[60%]">
          <p className="mb-3">About</p>
          <p className="text-sm">
            The Mission of FUTA is to promote technological advancement by
            providing conducive environment for research, teaching and learning
            engenders development of products that are technologically oriented,
            self-reliant and relevant to society
          </p>
          <p className="mb-3 mt-6 text-base">Universities Core Values</p>
          <p className="text-sm">
            The University core values with the acronym "ICARE"
          </p>
          <button className="p-3 bg-black text-xs mt-2 cursor-pointer">
            See Details
          </button>
        </div>
        <div className="w-[20%]">
          <p className="mb-2">Quick Links</p>
          {links.map((link) => (
            <p key={link} className="text-sm cursor-pointer hover:text-black">
              {link}
            </p>
          ))}
        </div>
        <div className="w-[20%]">
          <p className="mb-3">Contact Us</p>
          <p className="text-sm">
            The Federal University of Technology Akure <br /> P.M.B. 704 <br />{" "}
            Akure, Ondo State.
          </p>
          <p className="mb-3 mt-6">Support Line:</p>
          <p className="text-sm">
            +234 906 670 7545 <br /> +234 907 616 5061
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-6 mt-10 border-t ">
        <p>Copyright © 2018 FUTA. All Rights Reserved.</p>
        <div className="flex gap-4">
          <img src={facebook} className="cursor-pointer" />
          <img src={twitter} className="cursor-pointer" />
          <img src={youtube} className="cursor-pointer" />
          <img src={linkedin} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;