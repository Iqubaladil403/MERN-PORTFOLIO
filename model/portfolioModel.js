const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const aboutSchema = new mongoose.Schema({
    imageurl: {
        type: String,
        required: true,
    },
    description1: {
        type: String,
        required: true,
    },
    description2: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
});

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    technologies: {
        type: Array,
        required: true,
    },
    imageLink:{
        type:String,
        required:true,
    }
});

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNO: {
        type: String,
        required: true,
    },
    fbLink: {
        type: String,
        required: true,
    },
    instaLink: {
        type: String,
        required: true,
    },
    emailLink: {
        type: String,
        required: true,
    },
    linkedinLink: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
});

module.exports = {
    Intro: mongoose.model("intros", introSchema),
    About: mongoose.model("abouts", aboutSchema),
    Experience: mongoose.model("experiences", experienceSchema),
    Project: mongoose.model("projects", projectSchema),
    Course: mongoose.model("courses", coursesSchema),
    Contact: mongoose.model("contacts", contactSchema),
};


