import React, { useState, useEffect } from 'react';
import axios from 'axios';
import log from '../../public/images/Log.png';
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa6";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black to-blue-500">
      <div className="h-screen text-white">
        {/* Header */}
        <header className="flex item-center justify-between container mx-auto py-6">
          <div className="flex space-x-2">
            <img
              src={log}
              alt="logo"
              className="w-[50px] h-[50px] rounded-full"
            />
            <h2 className="text-orange-500 pt-2 text-2xl">CourseHaven</h2>
          </div>
          <div className="space-x-4">
            <Link
              to={"/signup"}
              className="bg-transparent text-white py-2 px-4 border text-xl"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="bg-transparent text-white py-2 px-4 border text-xl"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Main Section */}
        <section className="text-center py-20">
          <h1 className="text-4xl text-orange-500 font-semibold">CourseHaven</h1>
          <br />
          <br />
          <p className="text-gray-500">
            Your skills, your courses — crafted for you.
          </p>
          <div className="space-x-4 mt-6">
            <button className="bg-green-500 text-white hover:bg-white duration-900 hover:text-black rounded px-6 py-3 font-semibold">
              Explore Courses
            </button>
            <button className="bg-white text-black hover:bg-green-500 duration-900 hover:text-white rounded px-6 py-3 font-semibold">
              Course Videos
            </button>
          </div>
        </section>

        {/* Courses Slider Section */}
        <section className="container mx-auto pb-10">
          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : (
            <Slider {...settings}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-white rounded-lg text-black text-center shadow-lg"
                >
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="rounded-lg mx-auto w-full h-48 object-cover"
                  />
                  <h3 className="font-semibold text-lg my-2">{course.title}</h3>
                  <button className="bg-green-500 text-white hover:bg-green-600 duration-300 rounded px-4 py-2 mt-2 font-semibold">
                    Enroll
                  </button>
                </div>
              ))}
            </Slider>
          )}
        </section>

        <hr />

        {/* Footer */}
        <footer className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex space-x-2">
                <img
                  src={log}
                  alt="logo"
                  className="w-[30px] h-[30px] rounded-full"
                />
                <h2 className="text-orange-500 pt-2 text-xl">CourseHaven</h2>
              </div>
              <p className="py-4">Follow us:</p>
              <div className="flex space-x-2">
                <a href="">
                  <FaFacebook className="text-2xl hover:text-blue-400" />
                </a>
                <a href="">
                  <GrInstagram className="text-2xl hover:text-pink-600" />
                </a>
                <a href="">
                  <FaTwitter className="text-2xl hover:text-blue-600" />
                </a>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-semibold mb-4">Contact</h1>
              <ul className="space-y-2 text-lg text-gray-400">
                <li className="hover:text-white">YouTube: Learn Coding</li>
                <li className="hover:text-white">Telegram: Learn Coding</li>
                <li className="hover:text-white">GitHub: Learn Coding</li>
              </ul>
            </div>

            <div>
              <h1 className="text-xl font-semibold mb-4">© 2025 CourseHaven</h1>
              <ul className="space-y-2 text-lg text-gray-400">
                <li className="hover:text-white">Terms & Conditions</li>
                <li className="hover:text-white">Privacy Policy</li>
                <li className="hover:text-white">Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
