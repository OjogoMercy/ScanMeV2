import { Icons } from "./Icons";
import { Colors } from "./Theme";
import { Images } from "./Images";

export const courses = [
  {
    id: "1",
    title: "PHY103",
    description:
      "Learn the basics of Python programming, including syntax, data types, and functions.",
    image: Images.slide1,
  },
  {
    id: "2",
    title: "CPS201",
    description:
      "Build dynamic web applications using React, JSX, and state management.",
    image: Images.slide2,
  },
  {
    id: "3",
    title: "CSE201",
    description:
      "Explore data analysis, visualization, and machine learning techniques.",
    image: Images.slide3,
    },
  {
    id: "4",
    title: "PHY103",
    description:
      "Learn the basics of Python programming, including syntax, data types, and functions.",
    image: Images.slide1,
  },
];
 export  const rank = {
    rank: "1",
    score: "1000",
    streak: "10",
  };
 export const categories = [
    {
      id: 1,
      icon: Icons.create,
      text: "Create",
      navigate: "Create",
      color: Colors.green2,
    },
    {
      id: 2,
      icon: Icons.chat,
      text: "Forum",
      navigate: "Forum",
      color: Colors.primary,
    },
    {
      id: 3,
      icon: Icons.book2,
      text: "Past Question",
      navigate: "PastQuestion",
      color: Colors.primary2,
    },
];
  export const menuOptions = [
    { title: "Edit profile", icon: "person-circle-outline" },
    { title: "Upgrade to premium", icon: "star-outline" },
    { title: "Test History", icon: "time-outline" },
    { title: "Open web app", icon: "globe-outline" },
    { title: "Contact us", icon: "call-outline" },
    { title: "Terms & Condition", icon: "document-text-outline" },
    { title: "Report a problem", icon: "alert-circle-outline" },
    { title: "Log out", icon: "log-out-outline" },
];
  export const examData = [
    {
      image: Images.slide1,
      courseTitle: "INS 302 ",
      text: "Human Computer Interaction",
      description:
        "Covers foundational concepts of HCI and its relevance in modern computing.",
    },
    {
      image: Images.slide2,
      courseTitle: "CSC 304",
      text: "Software Engineering.",
      description:
        "Focuses on structured development processes and engineering principles.",
    },
    {
      image: Images.slide3,
      courseTitle: "MGT 306 ",
      text: "Principles of Management",
      description:
        "Explores planning, organizing, leading, and controlling in business contexts.",
    },
    {
      image: Images.slide3,
      courseTitle: "MGA 202",
      text: "Introduction to Accounting",
      description:
        "Introduces basic accounting principles and bookkeeping techniques.",
    },
    {
      image: Images.slide1,
      courseTitle: "INS 204",
      text: "Information Systems",
      description:
        "Examines hardware, software, data, procedures, and people in IS.",
    },
];
   export    const products = [
      {
        id: 1,
        name: "Laptop",
        price: 999,
        category: "Electronics",
        ratings: [4, 5, 3, 4, 5],
        description: "High-performance laptop",
      },
      {
        id: 2,
        name: "Smartphone",
        price: 699,
        category: "Electronics",
        ratings: [5, 4, 5, 3],
        description: "Latest smartphone model",
      },
      {
        id: 3,
        name: "Headphones",
        price: 199,
        category: "Electronics",
        ratings: [4, 3, 4, 2, 5, 4],
        description: "Noise-cancelling headphones",
      },
    ];


 
