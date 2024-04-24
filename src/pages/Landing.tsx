import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import futa from "/images/futa.jpg";
import info from "/svgs/info.svg";
import market from "/svgs/market.svg";
import faq from "/svgs/faq.svg";
import staff from "/svgs/staff.svg";
import { FAQ, Footer } from "../components";

const staffData = [
  {
    name: "Prof. (Mrs.) Oladunni A. DARAMOLA",
    img: "images/daramola.png",
  },
  {
    name: "Aiyedun Bamidele Ojo",
    img: "images/ojo.png",
  },
  {
    name: "Onyekwere Veronica Dupe",
    img: "images/dupe.png",
  },
  {
    name: "Alewi Adeniyi Adesanya",
    img: "images/niyi.png",
  },
  {
    name: "Akinseli-Akinnola Mabel",
    img: "images/mabel.png",
  },
];

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const navigate = useNavigate();
  const [len, setLen] = useState<number | null>(3);

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center px-16 py-4">
        {/* logo  */}
        <div className="flex items-center cursor-pointer">
          <img src={logo} className="h-12" loading="lazy" />
          <p className="w-[180px] text-sm text-[#824D77] font-bold ml-1">
            FUTA Centre for Entrepreneurship (CENT)
          </p>
        </div>

        <div className="flex gap-14">
          <button className="flex gap-2 items-center">
            <img src={info} className="w-5" />
            <a href="#info" className="text-sm">
              About Us
            </a>
          </button>
          <button className="flex gap-2 items-center">
            <img src={faq} className="w-5" />
            <a href="#faq" className="text-sm">
              FAQ
            </a>
          </button>
          <button className="flex gap-2 items-center">
            <img src={staff} className="w-5" />
            <a href="#staff" className="text-sm">
              Staff
            </a>
          </button>
        </div>

        {/* MARKETPLACE BUTTON */}
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => navigate("/auth")}>
            <p className="text-sm">Sign In</p>
          </div>
          <div
            className="bg-[#824D77] px-4 py-3 cursor-pointer rounded-lg hover:shadow-md"
            onClick={() => navigate("/products")}
          >
            <button className="flex gap-2 text-white text-sm">
              <img src={market} className="w-5" />
              <p>Marketplace</p>
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        className="h-[35rem] flex justify-center items-center bg-cover bg-center bg-no-repeat bg-black bg-opacity-45 bg-blend-overlay"
        style={{ backgroundImage: "url(/images/exhibition.jpeg)" }}
      >
        <div className="flex flex-col items-center">
          {/* <p className="w-2/3 text-center text-gray-300 text-5xl">
            Unveiling exposure: A groundbreaking exploration of exhibits.
          </p>
          <p className="text-gray-400 mt-6">
            Join us for an unprecedented journey through [brief overview of
            exhibition content]
          </p> */}
        </div>
        <div></div>
      </div>

      {/* sponsors */}
      {/* <div className="flex justify-evenly bg-gray-500 py-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <img
            src={`/images/sp${index}.png`}
            className="h-14"
            key={index.toString()}
          />
        ))}
      </div> */}

      {/* CENT INFO */}
      <div id="info" className="flex gap-24 px-16 pt-24">
        {/* <img src="/images/Aa.png" className="w-48" /> */}
        <div>
          <p className="text-3xl font-bold mb-8">
            CENTRE FOR ENTREPRENEURSHIP (CENT)
          </p>
          <p className="text-justify">
            The Centre for Entrepreneurship (CENT) was established in 2011, the
            need for the University to provide leadership as a core objective
            especially in innovation, resource change, and technical progress
            through knowledge, prompted the establishment of the Centre . The
            primary responsibility of the Centre is to discover and develop
            inherent skills in trainees (university students and non-students
            within the University catchment area) so as to transform hitherto
            societal business/skill concept to new high growing venture
            potentials in line with the Town and Gown mantra of the University.{" "}
            <br />
            <br /> The Centre seeks to explore the opportunity of talent
            discovery, skill acquisition and entrepreneurship development, in
            the transformation of Nigeria. Therefore, the Centre seeks to
            explore sustainable Entrepreneurship development as a vital tool for
            job creation and empowerment.
          </p>
        </div>
        <img src={futa} />
      </div>

      {/* FAQ SECTION */}
      <div className="px-16 pt-24">
        <div className="flex justify-between items-center">
          <p id="faq" className="text-3xl font-bold mb-8">
            Frequently Asked Questions for ENT 302
          </p>
          {len ? (
            <button
              className="text-sm cursor-pointer"
              onClick={() => setLen(null)}
            >
              Show All
            </button>
          ) : (
            <button
              className="text-sm cursor-pointer"
              onClick={() => setLen(3)}
            >
              Collapse
            </button>
          )}
        </div>
        <div className="flex gap-20">
          <img src="/images/faq3.jpg" className="w-64 h-64" />
          <FAQ length={len} />
        </div>
      </div>

      {/* STAFF SECTION */}
      <div className="px-16 mt-24" id="staff">
        <p className="text-3xl font-bold mb-8">Staff members of CENT</p>
        <div className="flex justify-between py-12">
          {staffData.map((member, index) => (
            <div className="flex flex-col items-center" key={index.toString()}>
              <img src={member.img} className="w-32 rounded-full" />
              <p className="w-52 text-sm text-center mt-3">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
