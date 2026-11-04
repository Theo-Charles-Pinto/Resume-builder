/**
 * ResumeCraft for Students — Data Model, Question Definitions & Sample Profiles
 */

// Clean Blank State (Default: NO PREFILL as requested by user)
const initialResumeData = {
  personal: {
    fullName: "",
    targetRole: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    photo: "" // base64 photo URL
  },
  summary: "",
  education: [
    {
      id: "edu_1",
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "", // e.g. "8.8 / 10 CGPA"
      honors: "",
      coursework: ""
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: "",
      role: "",
      technologies: "",
      link: "",
      bullets: [""]
    }
  ],
  experience: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    concepts: ""
  },
  leadership: [],
  certifications: [],
  styling: {
    template: "modern-tech",
    accentColor: "#4f46e5", // Vibrant Indigo default
    fontFamily: "Inter, sans-serif",
    showPhoto: false, // Default: without photo (ATS standard)
    zoom: 1
  }
};

// Optional Sample Profiles for 1-Click Exploration (Loaded ONLY if user explicitly clicks "Sample Profiles")
const sampleProfiles = {
  cs: {
    personal: {
      fullName: "Aarav Sharma",
      targetRole: "Software Development Engineer (SDE) Intern",
      email: "aarav.sharma@college.edu",
      phone: "+91 98765 43210",
      location: "Bengaluru, India",
      linkedin: "linkedin.com/in/aarav-sharma-dev",
      github: "github.com/aaravsharma",
      portfolio: "aaravsharma.dev",
      photo: ""
    },
    summary: "Final year B.Tech Computer Science student with strong foundations in Data Structures, Algorithms, and Full-Stack Development. Solved 350+ LeetCode problems and built 3 production-grade web applications with React, Node.js, and PostgreSQL. Seeking a 2027 SDE Intern / Graduate Engineer Trainee role.",
    education: [
      {
        id: "edu_1",
        institution: "National Institute of Technology (NIT)",
        degree: "Bachelor of Technology in Computer Science & Engineering",
        location: "Bengaluru, India",
        startDate: "Aug 2023",
        endDate: "May 2027 (Expected)",
        gpa: "8.92 / 10 CGPA",
        honors: "Department Merit Scholar (Top 5% of batch)",
        coursework: "Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Database Management Systems, Operating Systems, Computer Networks"
      }
    ],
    projects: [
      {
        id: "proj_1",
        title: "CampusMart — College P2P Marketplace",
        role: "Lead Full-Stack Developer",
        technologies: "React, Node.js, Express, PostgreSQL, TailwindCSS",
        link: "github.com/aaravsharma/campusmart",
        bullets: [
          "Architected a responsive campus marketplace connecting 600+ verified college students for buying and selling textbooks and lab equipment.",
          "Implemented JWT authentication, debounced search filters, and real-time chat websockets, reducing transaction cycle time by 40%.",
          "Engineered RESTful APIs with Redis caching, supporting 50+ concurrent requests with sub-100ms response times."
        ]
      },
      {
        id: "proj_2",
        title: "MediScan — AI Document Summarizer for Prescriptions",
        role: "Solo Creator",
        technologies: "Python, FastAPI, Gemini API, Docker, Streamlit",
        link: "github.com/aaravsharma/mediscan-ai",
        bullets: [
          "Developed an OCR & NLP pipeline converting unstructured prescription scans into digital dosage reminders and contraindication alerts.",
          "Secured 1st Place out of 48 teams at Smart India Campus Hackathon 2025."
        ]
      }
    ],
    experience: [
      {
        id: "exp_1",
        organization: "ZetaTech Labs",
        role: "Software Engineering Intern",
        location: "Bengaluru, India",
        startDate: "May 2025",
        endDate: "July 2025",
        bullets: [
          "Automated internal batch invoice reconciliation pipeline using Python and SQL, eliminating 14 hours of manual monthly accounting.",
          "Authored 25+ unit and integration tests using Jest and Postman, raising test coverage from 68% to 89%."
        ]
      }
    ],
    skills: {
      languages: "C++, Java, Python, JavaScript (ES6+), TypeScript, SQL",
      frameworks: "React.js, Node.js, Express.js, Next.js, TailwindCSS",
      tools: "Git, GitHub, Docker, Postman, PostgreSQL, MongoDB, Linux",
      concepts: "Data Structures & Algorithms, Object-Oriented Design (OOP), REST APIs, DBMS"
    },
    leadership: [
      {
        id: "lead_1",
        organization: "College Coding & Algorithm Club",
        role: "Technical Lead",
        date: "Aug 2024 - Present",
        bullets: [
          "Conducted 8 coding bootcamps on Dynamic Programming and Graph Algorithms attended by 180+ junior students.",
          "Organized annual college-wide hackathon with ₹50,000 prize pool and 300+ participants."
        ]
      }
    ],
    certifications: [
      {
        id: "cert_1",
        name: "Oracle Certified Associate, Java SE Programmer",
        issuer: "Oracle",
        date: "Jan 2025"
      }
    ],
    styling: {
      template: "modern-tech",
      accentColor: "#4f46e5",
      fontFamily: "Inter, sans-serif",
      showPhoto: false,
      zoom: 1
    }
  },

  business: {
    personal: {
      fullName: "Ananya Iyer",
      targetRole: "Business Analyst / Management Trainee",
      email: "ananya.iyer@univ.edu",
      phone: "+91 98112 34567",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/ananya-iyer",
      github: "",
      portfolio: "",
      photo: ""
    },
    summary: "Pre-final year BBA / Commerce Honors student specializing in Financial Markets and Business Analytics. Experienced in financial modeling, advanced Excel, and competitive case analysis. Seeking an internship in corporate strategy, equity research, or management consulting.",
    education: [
      {
        id: "edu_1",
        institution: "St. Xavier's College",
        degree: "Bachelor of Commerce (Honours) / BBA",
        location: "Mumbai, India",
        startDate: "Aug 2023",
        endDate: "May 2026",
        gpa: "9.15 / 10 CGPA",
        honors: "Rank 1 in Financial Management, Academic Excellence Award",
        coursework: "Corporate Finance, Financial Accounting, Business Statistics, Marketing Strategy, Microeconomics"
      }
    ],
    projects: [
      {
        id: "proj_1",
        title: "D2C FMCG Market Penetration Strategy",
        role: "Lead Student Consultant",
        technologies: "Advanced Excel (DCF, Pivot Tables), Tableau, Power BI",
        link: "",
        bullets: [
          "Analyzed consumer purchasing behavior across 4 tier-2 Indian cities for an organic snacks startup with ₹10 Cr ARR.",
          "Synthesized survey responses from 500+ consumers to optimize pricing tiers, increasing projected product margin by 16%."
        ]
      }
    ],
    experience: [],
    skills: {
      languages: "English (Fluent), Hindi (Fluent), Marathi (Conversational)",
      frameworks: "Financial Modeling, Market Sizing, SWOT Analysis, DCF Valuation",
      tools: "Advanced Excel (VLOOKUP, INDEX/MATCH, Macros), Tableau, Power BI, PowerPoint",
      concepts: "Brand Strategy, Cost-Benefit Analysis, KPI Tracking, Presentation Skills"
    },
    leadership: [
      {
        id: "lead_1",
        organization: "Commerce & Economics Society",
        role: "Vice President",
        date: "Jul 2024 - Present",
        bullets: [
          "Led team of 18 students to organize annual National Business Conclave with 400+ delegates.",
          "Secured ₹2.5 Lakhs in corporate sponsorships."
        ]
      }
    ],
    certifications: [
      {
        id: "cert_1",
        name: "Financial Modeling and Valuation Analyst (FMVA)",
        issuer: "CFI",
        date: "Nov 2024"
      }
    ],
    styling: {
      template: "classic-academic",
      accentColor: "#0f766e",
      fontFamily: "'Merriweather', serif",
      showPhoto: false,
      zoom: 1
    }
  },

  clear: {
    personal: {
      fullName: "",
      targetRole: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      photo: ""
    },
    summary: "",
    education: [
      {
        id: "edu_1",
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
        honors: "",
        coursework: ""
      }
    ],
    projects: [
      {
        id: "proj_1",
        title: "",
        role: "",
        technologies: "",
        link: "",
        bullets: [""]
      }
    ],
    experience: [],
    skills: {
      languages: "",
      frameworks: "",
      tools: "",
      concepts: ""
    },
    leadership: [],
    certifications: [],
    styling: {
      template: "modern-tech",
      accentColor: "#4f46e5",
      fontFamily: "Inter, sans-serif",
      showPhoto: false,
      zoom: 1
    }
  }
};

// Power Action Verbs categorized for Students
const studentActionVerbs = {
  "Developed & Built (Technical)": [
    "Architected", "Built", "Coded", "Configured", "Deployed", "Designed", "Engineered", 
    "Implemented", "Integrated", "Modeled", "Programmed", "Refactored", "Automated"
  ],
  "Led & Organized (Clubs & Events)": [
    "Spearheaded", "Coordinated", "Directed", "Founded", "Guided", "Organized", 
    "Mentored", "Chaired", "Facilitated", "Empowered", "Pioneered", "Mobilized"
  ],
  "Researched & Analyzed (Academics & Labs)": [
    "Analyzed", "Benchmarked", "Calculated", "Discovered", "Evaluated", "Examined", 
    "Formulated", "Investigated", "Surveyed", "Synthesized", "Validated", "Quantified"
  ],
  "Improved & Optimized (Results)": [
    "Accelerated", "Boosted", "Decreased", "Enhanced", "Expanded", "Maximized", 
    "Minimized", "Optimized", "Revamped", "Streamlined", "Strengthened", "Upgraded"
  ],
  "Communicated & Teamwork": [
    "Authored", "Collaborated", "Demonstrated", "Negotiated", "Presented", "Published", 
    "Partnered", "Trained", "Instructed", "Documented", "Liaised", "Pitched"
  ]
};

// Guided Interview Questions Definitions (Clean, student-focused, Indian CGPA out of 10)
const wizardSteps = [
  {
    id: "step_target",
    stepNum: 1,
    stepLabel: "Target Role",
    title: "What role or internship are you targeting?",
    subtitle: "Recruiters and ATS engines match your resume against the job title first.",
    tip: "Be specific! E.g. 'Software Engineer Trainee', 'Full-Stack Developer Intern', or 'Business Analyst'.",
    type: "target"
  },
  {
    id: "step_contact",
    stepNum: 2,
    stepLabel: "Contact & Photo",
    title: "How should campus recruiters reach you?",
    subtitle: "Include professional contact channels and optionally add your formal headshot photo.",
    tip: "Use your professional college email or a clean Gmail. You can also toggle the formal photo on or off anytime!",
    type: "contact"
  },
  {
    id: "step_education",
    stepNum: 3,
    stepLabel: "Education & CGPA",
    title: "What are your college and degree details?",
    subtitle: "For college students and freshers, academic performance is a major hiring benchmark.",
    tip: "Include your CGPA out of 10 (e.g. 8.5 / 10 CGPA). If your CGPA is 7.5 or above, definitely include it! Mention foundational subjects like Data Structures, DBMS, or Finance.",
    type: "education"
  },
  {
    id: "step_projects",
    stepNum: 4,
    stepLabel: "Projects",
    title: "What projects, apps, or hackathons have you built?",
    subtitle: "Hands-on projects are what separate average resumes from top-selected candidates.",
    tip: "Use the formula: [Action Verb] + [What you built / Tech stack] + [Impact / Result]. E.g. 'Engineered an e-commerce web app using React & Node.js, reducing query latency by 35%'.",
    type: "projects"
  },
  {
    id: "step_experience",
    stepNum: 5,
    stepLabel: "Internships / Roles",
    title: "Have you completed any internships, campus jobs, or TA positions?",
    subtitle: "Summer internships, part-time roles, or student assistantships.",
    tip: "If you don't have corporate experience yet, don't worry! Academic projects, hackathons, and clubs are 100% sufficient for student placement.",
    type: "experience"
  },
  {
    id: "step_skills",
    stepNum: 6,
    stepLabel: "Technical Skills",
    title: "What programming languages, frameworks, and tools do you know?",
    subtitle: "Recruiters scan these keywords during initial campus filtration rounds.",
    tip: "Group skills cleanly: Programming Languages, Frameworks, Tools/Databases, and Core Concepts. Never use percentage rating bars!",
    type: "skills"
  },
  {
    id: "step_leadership",
    stepNum: 7,
    stepLabel: "Clubs & Events",
    title: "What college clubs, technical fests, or volunteer work did you lead?",
    subtitle: "Demonstrates teamwork, initiative, public speaking, and culture fit.",
    tip: "Mention technical club activities, organizing college symposiums, or sports captaincy.",
    type: "leadership"
  },
  {
    id: "step_summary",
    stepNum: 8,
    stepLabel: "Elevator Pitch",
    title: "Craft your 2-3 sentence student elevator pitch",
    subtitle: "A strong opening summary gives the placement coordinator and hiring manager an immediate impression.",
    tip: "Keep it under 3 lines so your resume fits strictly on 1 single page! Click '✨ Auto-Generate Pitch' to create one instantly.",
    type: "summary"
  }
];
