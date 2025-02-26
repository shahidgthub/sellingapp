import React, { useState, useEffect } from 'react';
import axios from 'axios';
import log from '../../public/images/booklog.jpg';
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerPadding: "20px",
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, arrows: false } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, arrows: false } }
  ]
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate("/login", { replace: true }); // 🔄 Ensures proper redirect without back navigation
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/get");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-500 bg-fixed ">
      <div className="min-h-screen text-white">
        <header className="flex lg:flex-nowrap flex-wrap items-center justify-between container mx-auto py-6">
          <div className="flex space-x-2">
            <img src={log} alt="logo" className="w-[70px] h-[70px] rounded-full" />
            <h2 className="text-orange-500 pt-4 text-2xl font-bold">CourseHaven</h2>
          </div>
          <div className="space-x-4 lg:pt-0 pt-6">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white py-2 px-4 border text-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/" className="bg-transparent text-white py-2 px-4 border text-xl">
                  Signup
                </Link>
                <Link to="/login" className="bg-transparent text-white py-2 px-4 border text-xl">
                  Login
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="text-center py-20">
          <h1 className="text-4xl text-orange-500 font-semibold">CourseHaven</h1>
          <p className="text-gray-500 mt-4">Your skills, your courses — crafted for you.</p>
          <div className="space-x-4 mt-6">
            <Link to={'/courses'} className="bg-green-500 text-white hover:bg-white duration-500 hover:text-black rounded px-6 py-3 font-semibold">
              Explore Courses
            </Link>
            <button className="bg-white text-black hover:bg-green-500 duration-500 hover:text-white rounded px-6 py-3 font-semibold lg:mt-0 mt-4">
              Course Videos
            </button>
          </div>
        </section>

        <section className="container mx-auto">
          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : (
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course.id} className="pb-2 lg:px-2 px-4">
                  <div className="bg-gray-900 rounded-lg py-5 shadow-lg flex flex-col items-center">
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="rounded-full mx-auto w-40 h-40 object-cover mt-4"
                    />
                    <h3 className="font-semibold text-md text-white my-2 text-center line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-white px-2 mb-2 text-center text-sm line-clamp-3 h-20">
                      {course.description}
                    </p>
                    <p className="text-white px-2 mb-2 text-center text-base font-semibold">
                      {course.price}
                    </p>
                    <button className="bg-orange-500 text-white hover:bg-blue-600 duration-300 rounded-full px-6 py-2 mt-auto font-semibold">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          )}
          <hr className="mt-4" />
        </section>

        <footer className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex space-x-2">
                <img src={log} alt="logo" className="w-[30px] h-[30px] rounded-full" />
                <h2 className="text-orange-500 pt-2 text-xl">CourseHaven</h2>
              </div>
              <p className="py-4">Follow us:</p>
              <div className="flex space-x-2">
                <a href="#"><FaFacebook className="text-2xl hover:text-blue-400" /></a>
                <a href="#"><GrInstagram className="text-2xl hover:text-pink-600" /></a>
                <a href="#"><FaTwitter className="text-2xl hover:text-blue-600" /></a>
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
