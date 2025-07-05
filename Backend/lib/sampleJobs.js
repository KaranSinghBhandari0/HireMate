require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
const Job = require("../models/Job");

const jobs = [
    {
        title: "Software Developer",
        company: "Tata Consultancy Services",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2022/04/tata_consultancy_services-logo-brandlogos.net_-768x768.png",
        location: "Bangalore, India",
        description: "Develop and maintain software applications for TCS clients across various industries.",
        experience: "0-2 years",
        role: "Full-Time",
        postedOn: "June 10, 2025",
        salary: "₹6,00,000 - ₹9,00,000 per year",
        requirements: [
            "Proficiency in Java or Python",
            "Understanding of databases and SQL",
            "Basic knowledge of software development lifecycle"
        ],
        responsibilities: [
            "Write clean, efficient code",
            "Participate in code reviews",
            "Collaborate with cross-functional teams"
        ]
    },
    {
        title: "Product Manager",
        company: "Flipkart",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2025/02/flipkart_icon-logo_brandlogos.net_uh1az-768x762.png",
        location: "Bengaluru, India",
        description: "Drive product vision and strategy for Flipkart's e-commerce platform.",
        experience: "3-5 years",
        role: "Full-Time",
        postedOn: "June 12, 2025",
        salary: "₹25,00,000 - ₹35,00,000 per year",
        requirements: [
            "Proven product management experience",
            "Strong analytical skills",
            "Understanding of e-commerce domain"
        ],
        responsibilities: [
            "Define product roadmap",
            "Coordinate with engineering and design teams",
            "Analyze market trends"
        ]
    },
    {
        title: "Data Scientist",
        company: "Zomato",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
        location: "Gurugram, India",
        description: "Build machine learning models to improve Zomato's recommendation systems and operations.",
        experience: "2-4 years",
        role: "Full-Time",
        postedOn: "June 8, 2025",
        salary: "₹15,00,000 - ₹25,00,000 per year",
        requirements: [
            "Expertise in Python and ML frameworks",
            "Experience with big data technologies",
            "Strong statistical knowledge"
        ],
        responsibilities: [
            "Develop predictive models",
            "Analyze user behavior data",
            "Optimize delivery algorithms"
        ]
    },
    {
        title: "Frontend Developer",
        company: "Paytm",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/800px-Paytm_logo.png",
        location: "Noida, India",
        description: "Build responsive user interfaces for Paytm's financial services platform.",
        experience: "1-3 years",
        role: "Full-Time",
        postedOn: "June 5, 2025",
        salary: "₹8,00,000 - ₹12,00,000 per year",
        requirements: [
            "Proficiency in React.js",
            "Knowledge of state management",
            "Understanding of UI/UX principles"
        ],
        responsibilities: [
            "Develop reusable components",
            "Optimize frontend performance",
            "Implement responsive designs"
        ]
    },
    {
        title: "DevOps Engineer",
        company: "Jio Platforms",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2023/08/jio-logo_brandlogos.net_s9dim-512x512.png",
        location: "Mumbai, India",
        description: "Build and maintain CI/CD pipelines for Jio's digital services platform.",
        experience: "2-5 years",
        role: "Full-Time",
        postedOn: "June 15, 2025",
        salary: "₹12,00,000 - ₹18,00,000 per year",
        requirements: [
            "Experience with AWS/GCP",
            "Knowledge of containerization",
            "CI/CD pipeline expertise"
        ],
        responsibilities: [
            "Automate deployment processes",
            "Monitor system performance",
            "Implement security best practices"
        ]
    },
    {
        title: "UX Designer",
        company: "Swiggy",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Swiggy_logo.png/800px-Swiggy_logo.png",
        location: "Bangalore, India",
        description: "Design intuitive user experiences for Swiggy's food delivery platform.",
        experience: "1-3 years",
        role: "Full-Time",
        postedOn: "June 9, 2025",
        salary: "₹10,00,000 - ₹15,00,000 per year",
        requirements: [
            "Proficiency in Figma/Sketch",
            "User research experience",
            "Portfolio demonstrating UX skills"
        ],
        responsibilities: [
            "Create wireframes and prototypes",
            "Conduct user testing",
            "Collaborate with product teams"
        ]
    },
    {
        title: "Cybersecurity Analyst",
        company: "Wipro",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2022/04/wipro-logo-brandlogos.net_-512x512.png",
        location: "Pune, India",
        description: "Protect Wipro's systems and client data from security threats.",
        experience: "2-4 years",
        role: "Full-Time",
        postedOn: "June 14, 2025",
        salary: "₹9,00,000 - ₹14,00,000 per year",
        requirements: [
            "Security certifications preferred",
            "Knowledge of security frameworks",
            "Incident response experience"
        ],
        responsibilities: [
            "Monitor security systems",
            "Investigate breaches",
            "Implement security controls"
        ]
    },
    {
        title: "Business Analyst",
        company: "Infosys",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
        location: "Hyderabad, India",
        description: "Analyze business requirements and translate them into technical solutions.",
        experience: "1-3 years",
        role: "Full-Time",
        postedOn: "June 7, 2025",
        salary: "₹7,00,000 - ₹10,00,000 per year",
        requirements: [
            "Strong analytical skills",
            "Requirements gathering experience",
            "Basic SQL knowledge"
        ],
        responsibilities: [
            "Document business processes",
            "Create functional specifications",
            "Liaise between business and IT"
        ]
    },
    {
        title: "Mobile App Developer",
        company: "BYJU'S",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2022/07/byjus-logo_brandlogos.net_hbf6z-512x512.png",
        location: "Bangalore, India",
        description: "Develop and maintain BYJU'S educational mobile applications.",
        experience: "1-3 years",
        role: "Full-Time",
        postedOn: "June 11, 2025",
        salary: "₹8,00,000 - ₹12,00,000 per year",
        requirements: [
            "React Native/Flutter experience",
            "Mobile app development knowledge",
            "Understanding of REST APIs"
        ],
        responsibilities: [
            "Build new app features",
            "Fix bugs and optimize performance",
            "Work with UX designers"
        ]
    },
    {
        title: "Cloud Architect",
        company: "HCL Technologies",
        companyLogo: "https://brandlogos.net/wp-content/uploads/2013/03/hcl-technologies-vector-logo.png",
        location: "Chennai, India",
        description: "Design and implement cloud solutions for HCL's enterprise clients.",
        experience: "5-8 years",
        role: "Full-Time",
        postedOn: "June 13, 2025",
        salary: "₹20,00,000 - ₹30,00,000 per year",
        requirements: [
            "AWS/Azure certifications",
            "Cloud architecture experience",
            "Infrastructure as code knowledge"
        ],
        responsibilities: [
            "Design cloud solutions",
            "Mentor junior engineers",
            "Optimize cloud costs"
        ]
    }
];

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        return Job.insertMany(jobs);
    })
    .then(() => {
        console.log("Data seeded successfully");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error seeding data:", err);
        mongoose.connection.close();
    });
