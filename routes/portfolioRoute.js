const router = require("express").Router();
const nodemailer = require("nodemailer");
const {
  Intro,
  About,
  Experience,
  Project,
  Course,
  Contact,
} = require("../model/portfolioModel");
const userModel = require("../model/userModel");


//get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intro = await Intro.find();
    const about = await About.find();
    const experience = await Experience.find();
    const project = await Project.find();
    const course = await Course.find();
    const contact = await Contact.find();

    res.status(200).send({
      intro: intro[0],
      about: about[0],
      experience: experience,
      project: project,
      course: course,
      contact: contact[0],
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error); // Log the error
    res
      .status(500)
      .send({
        message: "Failed to retrieve portfolio data",
        error: error.message,
      });
  }
});

router.post("/add-intro", async (req, res) => {
  try {
    // Extract the form data from the request body
    const { welcomeText, firstName, lastName, caption, description } = req.body;

    // Create a new portfolio intro document
    const newIntro = new Intro({
      welcomeText,
      firstName,
      lastName,
      caption,
      description,
    });

    // Save the document to the database
    const savedIntro = await newIntro.save();

    // Send a response back with the saved data
    res.json({
      success: true,
      message: "Data saved successfully!",
      data: savedIntro,
    });
  } catch (error) {
    // Handle errors and send a response with an error message
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while saving data.",
    });
  }
});

router.post("/update-intro", async (req, res) => {
  try {
    const data = await Intro.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Intro not found",
      });
    }

    res.status(200).send({
      data: data, // Updated document
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

/**
 * Update an existing experience or create a new one if _id doesn't exist
 */
router.post("/update-experience", async (req, res) => {
  try {
    const { _id, company, title, description, period } = req.body;

    // If _id exists, update the existing experience
    if (_id) {
      const data = await Experience.findOneAndUpdate(
        { _id }, // Find experience by ID
        { company, title, description, period }, // Update fields
        { new: true } // Return the updated document
      );

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Experience not found.",
        });
      }

      res.status(200).send({
        success: true,
        message: "Experience updated successfully.",
        data, // Return the updated experience document
      });
    }
    // If _id doesn't exist, create a new experience
    else {
      const newExperience = new Experience({
        company,
        title,
        description,
        period,
      });

      const savedExperience = await newExperience.save();

      res.status(201).send({
        success: true,
        message: "Experience added successfully.",
        data: savedExperience,
      });
    }
  } catch (error) {
    console.error("Error updating/adding experience:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating/adding experience.",
      error: error.message,
    });
  }
});

//Delete experience
router.delete("/delete-experience", async (req, res) => {
  try {
    const data = await Experience.findByIdAndDelete(req.body._id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Experience deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//Add or update project

router.post("/update-project", async (req, res) => {
  try {
    const { _id, title, imageLink, description, link, technologies} =
      req.body;
      
    // If _id exists, update the existing experience
    if (_id) {
      const data = await Project.findOneAndUpdate(
        { _id }, // Find experience by ID
        {
          title,
          imageLink,
          description,
          link,
          technologies,
        }, // Update fields
        { new: true } // Return the updated document
      );

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Project not found.",
        });
      }

      res.status(200).send({
        success: true,
        message: "Project updated successfully.",
        data, // Return the updated project document
      });
    }
    // If _id doesn't exist, create a new experience
    else {
      const newProject = new Project({
        title,
        imageLink,
        description,
        link,
        technologies,
      });

      const savedExperience = await newProject.save();

      res.status(201).send({
        success: true,
        message: "Project added successfully.",
        data: savedExperience,
      });
    }
  } catch (error) {
    console.error("Error updating/adding Project:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating/adding Project.",
      error: error.message,
    });
  }
});

//Delete project
router.delete("/delete-project", async (req, res) => {
  try {
    const data = await Project.findByIdAndDelete(req.body._id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Project deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//Add or update course

router.post("/update-course", async (req, res) => {
  try {
    const { _id, title, imageLink, description } = req.body;

    // If _id exists, update the existing experience
    if (_id) {
      const data = await Course.findOneAndUpdate(
        { _id }, // Find experience by ID
        { title, image: imageLink, description }, // Update fields
        { new: true } // Return the updated document
      );

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Course not found.",
        });
      }

      res.status(200).send({
        success: true,
        message: "Course updated successfully.",
        data, // Return the updated project document
      });
    }
    // If _id doesn't exist, create a new experience
    else {
      const newCourse = new Course({
        title,
        image: imageLink,
        description,
      });

      const savedExperience = await newCourse.save();

      res.status(201).send({
        success: true,
        message: "Course added successfully.",
        data: savedExperience,
      });
    }
  } catch (error) {
    console.error("Error updating/adding Course:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating/adding Course.",
      error: error.message,
    });
  }
});

//Delete project
router.delete("/delete-course", async (req, res) => {
  try {
    const data = await Course.findByIdAndDelete(req.body._id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Course deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//Add or update contact

router.post("/update-contact", async (req, res) => {
  try {
    const {
      _id,
      emailLink,
      fbLink,
      instaLink,
      githubLink,
      linkedinLink,
      name,
      phoneNO,
    } = req.body;

    // If _id exists, update the existing experience
    if (_id) {
      const data = await Contact.findOneAndUpdate(
        { _id }, // Find experience by ID
        {   emailLink,
          fbLink,
          instaLink,
          githubLink,
          linkedinLink,
          name,
          phoneNO,}, // Update fields
        { new: true } // Return the updated document
      );

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Contact not found.",
        });
      }

      res.status(200).send({
        success: true,
        message: "Contact updated successfully.",
        data, // Return the updated project document
      });
    }
    // If _id doesn't exist, create a new experience
    else {
      const newContact = new Contact({
        emailLink,
        fbLink,
        instaLink,
        githubLink,
        linkedinLink,
        name,
        phoneNO,
      });

      const savedContact = await newContact.save();

      res.status(201).send({
        success: true,
        message: "Contact added successfully.",
        data: savedContact,
      });
    }
  } catch (error) {
    console.error("Error updating/adding Contact:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating/adding Contact.",
      error: error.message,
    });
  }
});

// admin login


router.post("/admin-login", async (req, res) => {
  try {
    const user = await userModel.findOne({ username:req.body.username  , password:req.body.password });
    user.password = "";
    if(!user){
      res.status(401).send({
        success: false,
        message: "invalid username or password",
      });
    }
     else {
      res.status(200).send({
        success: true,
        message: "Login successful",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
});

// 📨 Email Send Route
router.post('/send-email', async (req, res) => {
  const { names, email, messages } = req.body;
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Apna hi email dalen jisme receive karna hai
        subject: `New Contact Form Submission from ${names}`,
        text: `Name: ${names}\nEmail: ${email}\n\nMessage: ${messages}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({success: true, message: "Email sent successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to send email", error: error.message });
        console.log(error.message);
        
    }
});

module.exports = router;
