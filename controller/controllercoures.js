const Course = require("../model/couresmodel");
const purchase = require("../model/userpurchase")
const cloudinary = require('cloudinary').v2;

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// ✅ Create Course
const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        // ✅ Validate request data
        if (!title || !description || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Validate file upload
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "File is required" });
        }

        const image = req.files.image;

        // ✅ Validate file format
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({ error: "Invalid file format. Only PNG and JPG are allowed." });
        }

        // ✅ Upload to Cloudinary
        const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath);

        if (!cloudResponse || cloudResponse.error) {
            return res.status(400).json({ error: "Error uploading file to Cloudinary" });
        }

        // ✅ Create new course
        const newCourse = new Course({
            title,
            description,
            price,
            image: {
                public_id: cloudResponse.public_id,
                url: cloudResponse.secure_url,
            }
        });

        // ✅ Save to database
        await newCourse.save();

        // ✅ Send success response
        res.status(201).json({ message: "Course created successfully", course: newCourse });

    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Update Course
const updateCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const { courseId } = req.params;

        console.log("Course ID:", courseId);  // Log the received courseId
        console.log("Request Body:", req.body);  // Log the request body

        // ✅ Find the existing course
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // ✅ Handle image update
        let updatedImage = course.image; // Keep existing image by default
        if (req.files && req.files.image) {
            const image = req.files.image;
            console.log("Image Uploaded:", image);  // Log uploaded image

            // ✅ Validate file format
            const allowedFormats = ["image/jpeg", "image/png"];
            if (!allowedFormats.includes(image.mimetype)) {
                return res.status(400).json({ error: "Invalid file format. Only PNG and JPG are allowed." });
            }

            // ✅ Delete old image from Cloudinary
            if (course.image && course.image.public_id) {
                console.log("Deleting old image from Cloudinary...");  // Debug
                await cloudinary.uploader.destroy(course.image.public_id);
            }

            // ✅ Upload new image to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath);
            console.log("Cloudinary Response:", cloudResponse);  // Log Cloudinary response

            if (cloudResponse.error) {
                return res.status(400).json({ error: "Error uploading image to Cloudinary" });
            }

            updatedImage = {
                public_id: cloudResponse.public_id,
                url: cloudResponse.secure_url,
            };
        }

        // ✅ Update course details
        course.title = title || course.title;
        course.description = description || course.description;
        course.price = price || course.price;
        course.image = updatedImage;

        // ✅ Save updated course
        const updatedCourse = await course.save();
        console.log("Updated Course:", updatedCourse);  // Log the updated course

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });

    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Log the received courseId for debugging
        console.log("Course ID to delete:", courseId);

        // ✅ Find the course in the database
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // ✅ Delete the image from Cloudinary if it exists
        if (course.image && course.image.public_id) {
            console.log("Deleting image from Cloudinary...");
            await cloudinary.uploader.destroy(course.image.public_id);
        }

        // ✅ Delete the course from the database
        await Course.findByIdAndDelete(courseId);
        console.log(`Course with ID ${courseId} deleted successfully`);

        // ✅ Respond with success message
        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getCourses = async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await Course.find();

        // Respond with the courses
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const buyCourse = async (req, res) => {
    try {
        const { userId } = req.body; // Get user ID from request body
        const { courseId } = req.params; // Get course ID from URL params

        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if user already bought the course
        if (course.students.includes(userId)) {
            return res.status(400).json({ message: "User already purchased this course" });
        }

        // Update the course (add user to students list)
        course.students.push(userId);
        await course.save();

        return res.status(200).json({ message: "Course purchased successfully", course });
    } catch (err) {
        console.error("Error in buyCourse:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};




module.exports = { createCourse, updateCourse,deleteCourse,getCourses,buyCourse};
