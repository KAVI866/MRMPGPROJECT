import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets"; // Import your images

export const Home = () => {
  return (
    <section className="grid md:grid-cols-3 h-[600px] my-10 gap-6 mx-5">
      {/* Left Section (flex-2) */}
      <div
        className="md:col-span-2 flex flex-col justify-center items-start p-8 bg-cover bg-center relative rounded-2xl"
        style={{ backgroundImage: `url(${assets.main1})` }}
      >

        {/* Content */}
        <div className=" text-white space-y-6  flex flex-col  items-center">
          <h4 className=" absolute text-lg  font-bold uppercase tracking-widest top-5 left-5">Home</h4>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
            Your Home Away From Home
          </h1>
          <p className="text-xl leading-relaxed">
            Experience comfort and affordability with our PG accommodations.
            Enjoy amenities like high-speed Wi-Fi and delicious homemade meals.
          </p>
          <Link
            to="/about"
            className="inline-block bg-primary px-6 py-3 rounded-full font-semibold hover:bg-secondary transition"
          >
            Explore More
          </Link>
        </div>
      </div>

      {/* Right Section (flex-1) */}
      <div
        className="bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${assets.main2})` }}
      ></div>
    </section>
  );
};


