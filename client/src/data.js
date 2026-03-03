import {
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  User,
  Briefcase,
  Wrench,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Terminal,
} from "lucide-react";

// ─── PERSONAL DATA ─────────────────────────────────────────────────────────────
export const personal = {
  name: "Zankar Bhalala",
  role: "Data Analyst & Full Stack Developer",
  title: "Transforming Data Into Intelligence",
  subtitle: "a B.Tech student passionate about",
  description:
    "machine learning, data analysis, and building scalable web applications.",
  bio: "I'm Zankar Bhalala, a B.Tech student at Pandit Deendayal Energy University with a 9.3/10 GPA. I specialize in Data Analytics, Machine Learning (particularly clustering), and Full Stack Development using the MERN stack. From building hybrid ML forecasting systems to engineering queue-driven platforms, I love solving complex problems with elegant solutions. I'm also deeply interested in Agentic AI, Deep Learning, Brain Computer Interface, and Reinforcement Learning.",
  email: "zankar.bhalala16@gmail.com",
  phone: "+91-6354788974",
  location: "Gujarat, India",
  resume: "#",
  github: "https://github.com/Zankar16",
  linkedin: "https://www.linkedin.com/in/zankar-bhalala-3301a6289/",
  stats: [
    { value: 9.3, suffix: "", label: "CGPA / 10" },
    { value: 5, suffix: "+", label: "Projects Built" },
    { value: 10, suffix: "+", label: "Tech Mastered" },
  ],
};

export const socialLinks = [
  { icon: Github, href: personal.github, label: "GitHub" },
  { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
];

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
export const experience = [
  {
    role: "Data Analyst Intern",
    company: "Amdox",
    period: "Dec 2025 – Feb 2026",
    type: "right",
    bullets: [
      "Analysed large-scale telecom and customer datasets to identify patterns, service usage trends, and operational inefficiencies.",
      "Wrote optimized SQL queries to extract, clean, and transform datasets used across reporting dashboards.",
      "Supported KPI reporting by preparing automated data pipelines using Python (Pandas, NumPy).",
    ],
  },
];

// ─── SKILLS (Marquee rows) ─────────────────────────────────────────────────────
export const skillsRow1 = [
  "C/C++", "Python", "Java", "HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js",
];

export const skillsRow2 = [
  "MongoDB", "PHP", "Tailwind CSS", "Bootstrap", "Power BI", "Excel", "Git", "Machine Learning", "Deep Learning",
];

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
export const projects = [
  {
    title: "StockAgent",
    category: "Machine Learning",
    description:
      "A hybrid ML forecasting system for portfolio and market trend analysis. Uses ARIMA, XGBoost, and LSTM models to predict market trends, reducing error through RMSE-based model selection and ensemble optimization. Features stacked Random Forest and XGBoost, CNN1D, and a Streamlit dashboard for interactive analysis.",
    tags: ["LSTM", "ARIMA", "XGBoost", "Random Forest", "CNN1D", "Streamlit", "Python"],
    live: "",
    source: "https://github.com/Zankar16",
    color: "#1d4ed8",
    image: "",
  },
  {
    title: "ReMido – Ayurvedic Dosha Classifier",
    category: "Machine Learning",
    description:
      "A hybrid ML classification system to predict Ayurvedic dosha types using physiological and lifestyle features. Leverages K-Means++ clustering (classified multiple clusters by probability) combined with Random Forest and PCA for multi-class classification.",
    tags: ["K-Means++", "Random Forest", "PCA", "Python", "Scikit-learn"],
    live: "",
    source: "https://github.com/Zankar16",
    color: "#059669",
    image: "",
  },
  {
    title: "SyncMyClass",
    category: "Full Stack",
    description:
      "A smart subject selection and class registration platform with queue-driven allotment, automated ticketing, real-time seat allocation, and a faculty analytics dashboard for workload balancing and allocation insights.",
    tags: ["Node.js", "React.js", "MongoDB", "Express.js"],
    live: "",
    source: "https://github.com/Zankar16",
    color: "#dc2626",
    image: "",
  },
  {
    title: "Smart Home Automation System",
    category: "Full Stack",
    description:
      "A scalable web-based management and analysis system (SCADA-like) integrating user authentication, dynamic dashboards, and efficient database indexing to support real-time data processing and structured reporting.",
    tags: ["PHP", "MySQL", "CSS", "HTML", "JavaScript"],
    live: "",
    source: "https://github.com/Zankar16",
    color: "#B8926A",
    image: "",
  },
];
