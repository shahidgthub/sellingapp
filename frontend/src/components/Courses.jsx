import React, { useState, useEffect } from 'react';
import axios from 'axios';
import log from '../../public/images/booklog.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { Search } from 'lucide-react';



const settings = {
  dots: true,
  arrows: false,
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
     <header className="flex lg:flex-nowrap flex-wrap items-center justify-between container mx-auto py-6">
           <div className="flex space-x-2">
             <img src={log} alt="logo" className="w-[70px] h-[70px] rounded-full" />
             <h2 className=" pt-4 text-2xl font-bold">Courses</h2>
           </div>
           <div className='flex gap-2'>
           <div className="relative w-full max-w-sm mt-2">
      <Search className="absolute right-3   mt-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
           <IoMdContact  className=' w-10 h-10 mt-2'/>

             

           </div>
         
         </header>
    <section className="container mx-auto">
      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course._id} className="pb-2 lg:px-2 px-4">
              <div className= "rounded-lg py-5 shadow-lg  border border-gray-400 ">
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="rounded-full mx-auto w-60 h-60 object-cover mt-4"
                />
                <h3 className="font-semibold text-md my-2 text-center line-clamp-1">
                  {course.title}
                </h3>
                <p className=" px-2 mb-2 text-center text-sm line-clamp-3 h-20">
                  {course.description}
                </p>
                <div className='flex justify-between px-2 py-2'>
                <p className=" text-base font-semibold">
                  {course.price}
                </p>
                <p className='text-base font-semibold text-blue-300'>20% off</p>
                </div>
                <Link to='/buy' className="bg-orange-500 text-white hover:bg-blue-600 duration-300  mx-2 rounded-xl px-8 py-2 mt-auto font-semibold">
                  Buy
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
      
    </section>
    </>
  );
};

export default Courses;
