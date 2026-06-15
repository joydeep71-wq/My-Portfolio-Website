import { StatMetric, CareerMilestone, CompetencyCategory, LeadershipPhilosophy } from "./types";

export const EXECUTIVE_HEADER = {
  name: "JOYDEEP DAS",
  initials: "JD",
  title: "Automotive After-Sales & Service Operations Leader",
  tagline: "Driving Operational Excellence & Business Transformation",
  markets: ["India", "GCC", "Middle East"],
  yearsOfExperience: "30+ Years",
  email: "dasjoydeep71@yahoo.com",
  phone: "+91 9176603555",
  location: "Chennai, India",
  linkedin: "https://linkedin.com", // Professional placeholder for layout
  summary: "Dynamic senior management professional with 30+ years of experience in automotive retail, after-sales, bodyshop operations, and business transformation across India, Oman, and Iraq. Proven expertise in P&L management, service operations, customer satisfaction, network expansion, team leadership, and process optimization. Successfully led multi-location workshops, delivered revenue growth, improved profitability, and built high-performing teams across dealership and OEM environments."
};

export const EXECUTIVE_STATS: StatMetric[] = [
  {
    id: "stat_1",
    value: "30+",
    label: "Years of Experience",
    description: "Leading scale automotive service, bodily repair, and retail business operations globally.",
    iconName: "History",
    category: "Leadership"
  },
  {
    id: "stat_2",
    value: "8,700+",
    label: "Monthly Vehicle Inflow",
    description: "Successfully managing high-capacity scale across 16 service workshops and 6 bodyshops.",
    iconName: "Wrench",
    category: "Scale"
  },
  {
    id: "stat_3",
    value: "1,100+",
    label: "Employees Led",
    description: "Directed massive workforce operations across 25 service outlets under Saud Bahwan Group, Oman.",
    iconName: "Users",
    category: "Leadership"
  },
  {
    id: "stat_4",
    value: "95%",
    label: "Service Absorption Ratio",
    description: "Achieved record service coverage of dealership operating costs at Premsons Motor.",
    iconName: "TrendingUp",
    category: "Impact"
  },
  {
    id: "stat_5",
    value: "+55%",
    label: "Toyota Parts Growth",
    description: "Engineered high-growth part wholesaling and logistics strategy in hostile market (Iraq).",
    iconName: "Layers",
    category: "Impact"
  },
  {
    id: "stat_6",
    value: "12%",
    label: "YoY Operating Profit Margin",
    description: "Consistent growth in system-wide service profitability and cash flow optimizations.",
    iconName: "Coins",
    category: "Impact"
  }
];

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: "milestone_1",
    role: "General Manager – Service & Bodyshop Business",
    company: "Premsons Motor Pvt. Ltd.",
    location: "Eastern India",
    period: "Apr 2024 – Present",
    description: "Leading service and bodyshop operations with full P&L accountability for one of the largest Maruti Suzuki dealerships in Eastern India.",
    details: [
      "Full P&L responsibility for multi-crore automotive service operations, bodyshop centers, and parts logistics; serving as a master of labor revenue per job and overhead absorption.",
      "Spearheaded specialized end-to-end consultation on complex insurance claim processes for automobile accident repairs, securing fast-track surveyor approvals.",
      "Directed complete accident vehicle damage assessment protocols, deploying state-of-the-art diagnostic standards to eliminate lost estimates and optimize job cards.",
      "Drove execution of latest autobody damage repair techniques and advanced high-performance paint re-finish specialist systems across major workshop zones.",
      "Conducted rigorous professional training and developmental coaching for estimators and bodyshop service advisors to lift productivity and labor penetration.",
      "Engineered a proactive bodyshop business generation pipeline with targeted conversions of standard mechanical service vehicles into aesthetic bodyshop repair jobs.",
      "Sustained a record 95% service absorption ratio, ensuring perfect operational cost recovery purely through high-margin bodyshop repairs & after-sales service flow."
    ],
    metrics: [
      { label: "Absorption Ratio", value: "95%" },
      { label: "Network Scope", value: "Large Scale Multi-location" }
    ],
    category: "Executive",
    brandColor: "bg-blue-600/10 text-blue-400 border-blue-500/20",
    logoInitial: "P"
  },
  {
    id: "milestone_2",
    role: "General Manager",
    company: "Rukn Al-Sayarat (Toyota Dealer)",
    location: "Iraq",
    period: "Nov 2022 – Dec 2023",
    description: "Managed two tier-one Toyota dealership operations with comprehensive responsibility for after-sales service, part supply chain, network expansion, and overall dealer profitability.",
    details: [
      "Engineered an aggressive parts and logistics growth program, boosting Toyota Genuine Parts wholesale volume by 55% in Iraq.",
      "Structured and deployed rigorous Toyota Service Management (TSM) standards, enhancing workshop utilization and customer retention parameters.",
      "Orchestrated cross-functional service operations, handling complex regional logistics, staff safety, and vendor contract negotiations."
    ],
    metrics: [
      { label: "Toyota Parts Growth", value: "+55%" },
      { label: "dealerships", value: "2 Direct Outlets" }
    ],
    category: "Executive",
    brandColor: "bg-red-600/10 text-red-400 border-red-500/20",
    logoInitial: "T"
  },
  {
    id: "milestone_3",
    role: "Head – Auto Service Planning & Operations",
    company: "Saud Bahwan Group",
    location: "Oman (GCC)",
    period: "2018 – 2022",
    description: "Handled massive scale operations planning, resource deployment, premium product developments, and after-sales service profitability across 25 prime outlets.",
    details: [
      "Led and inspired a massive workforce of over 1,100+ professional employees across 25 prime service centers in the Sultanate of Oman.",
      "Optimized multi-million dollar resource allocations, space planning, and service marketing programs to lift profit margins by 12% YoY.",
      "Collaborated at high OEM leadership levels to align brand standards, technician capabilities, and state-of-the-art diagnostic infrastructures."
    ],
    metrics: [
      { label: "Workforce Size", value: "1,100+ Employees" },
      { label: "Service Outlets", value: "25 Locations" }
    ],
    category: "Executive",
    brandColor: "bg-emerald-600/10 text-emerald-400 border-emerald-500/20",
    logoInitial: "S"
  },
  {
    id: "milestone_4",
    role: "Deputy General Manager",
    company: "Mahindra & Mahindra Ltd.",
    location: "India",
    period: "2003 – 2018",
    description: "Promoted and held key senior leadership tenures managing massive regional operations, service network growth, customer advocacy programs, and strategic fleet business accounts.",
    details: [
      "Pioneered regional after-sales business strategies for Mahindra's commercial and passenger vehicle divisions across major territories.",
      "Cultivated deep partnership integrations with major taxi/logistic fleets, driving service-level agreements (SLAs) and reliable repeat parts business.",
      "Envisioned and deployed regional parts networks, establishing high SLA response times and technician standard development protocols."
    ],
    metrics: [
      { label: "Tenure", value: "15 Years" },
      { label: "Role Scope", value: "Regional GM" }
    ],
    category: "Management",
    brandColor: "bg-cyan-600/10 text-cyan-400 border-cyan-500/20",
    logoInitial: "M"
  },
  {
    id: "milestone_5",
    role: "Earlier Career Operations Insights",
    company: "Fiat India | Daewoo Motors | Tata Motors",
    location: "India",
    period: "Pre-2003",
    description: "Established a highly solid foundation of hands-on automotive repair, service engineering, and customer relations management at prestigious automotive companies.",
    details: [
      "Assistant Manager Customer Care – Fiat India Pvt Ltd: Managed customer escalation systems, warranty processing, and diagnostic program setups.",
      "Senior Engineer Service – Daewoo Motors: Directed technically challenging field diagnostics, workshop repairs, and local team trainings.",
      "Workshop Manager – Tata Motors Passenger Cars: Spearheaded direct day-to-day workshop coordination, staff schedules, and vehicle parts tracking."
    ],
    metrics: [
      { label: "Tech Foundation", value: "Hands-on Engineering" },
      { label: "Key Brands", value: "Fiat, Daewoo, Tata" }
    ],
    category: "Earlier",
    brandColor: "bg-purple-600/10 text-purple-400 border-purple-500/20",
    logoInitial: "F"
  }
];

export const CORE_COMPETENCIES: CompetencyCategory[] = [
  {
    id: "comp_1",
    title: "Operational Leadership",
    iconName: "ShieldAlert",
    description: "P&L responsibility, large-scale automotive workshop management, and high-performance team leadership.",
    skills: ["P&L Management", "After-Sales & Service Operations", "Bodyshop Management", "Team Leadership (1100+ Staff)"]
  },
  {
    id: "comp_2",
    title: "Business Growth & Network",
    iconName: "BarChart3",
    description: "Expanding retail networks, driving high-growth service marketing, and optimization of logistics/parts wholesales.",
    skills: ["Network Expansion", "Service Marketing", "Parts Wholesaling & Distribution", "Fleet Business Partnerships"]
  },
  {
    id: "comp_3",
    title: "Process & Quality Strategy",
    iconName: "Cpu",
    description: "Kaizen continuous improvement, insurance claim optimizations, technical capabilities development, and high customer absorption.",
    skills: ["Kaizen & Process Improvement", "Insurance Claims Resolution", "Training & Professional Development", "Dealership Absorption Metrics"]
  },
  {
    id: "comp_4",
    title: "Collision & Bodyshop Strategy",
    iconName: "Wrench",
    description: "Accident vehicle repair lifecycle, from claim processing consultation, precise damage assessments, to premium refinishing and conversion monetization.",
    skills: [
      "End-to-End Insurance claim consultation",
      "Accident vehicle damage assessment",
      "Latest autobody damage repair techniques",
      "Autobody paint re finish specialist",
      "Lost estimate & Service advisor training",
      "Service-to-bodyshop job conversions",
      "Labour revenue & P&L management"
    ]
  }
];

export const LEADERSHIP_PHILOSOPHY: LeadershipPhilosophy[] = [
  {
    id: "phil_1",
    quote: "Service Absorption is the ultimate measure of a dealership's resilience. When service operations pay for 100% of dealership overhead, the retail system becomes invincible.",
    title: "Financial Resilience",
    description: "Ensuring stable cash security by driving highly efficient workshops that easily offset vehicle sales fluctuations.",
    iconName: "Activity"
  },
  {
    id: "phil_2",
    quote: "Continuous improvement (Kaizen) is not restricted to industrial production lines. It thrives primarily in the busy workshop floor, shortening lead cycles and respecting customer time.",
    title: "Process Perfection",
    description: "Refining vehicle flow streams, simplifying parts distribution networks, and implementing lean service schedules.",
    iconName: "RotateCw"
  },
  {
    id: "phil_3",
    quote: "Managing a team of 1,100 people across 25 outlets taught me that scale requires extreme alignment. Empowering grassroot workshop managers with clear tools is how you sustain a brand.",
    title: "People-First Alignment",
    description: "Building supportive working cultures focused on regular training, shared standards, and motivating milestones.",
    iconName: "HeartHandshake"
  }
];

export const EDUCATION_CREDENTIALS = [
  {
    id: "edu_1",
    degree: "MBA (General Management)",
    institution: "Indian Institute of Management, Kozhikode (IIMK)",
    description: "Top-tier executive management program covering corporate finance, operations planning, strategy, and business scaling architectures.",
    badge: "IIM Kozhikode",
    color: "from-blue-600/20 to-blue-500/10 border-blue-500/30 text-blue-400"
  },
  {
    id: "edu_2",
    degree: "Management Development Program",
    institution: "Indian Institute of Management, Bangalore (IIMB)",
    description: "Specialized leadership curriculum focused on operational decision-making models, advanced strategic marketing, and team capabilities scaling.",
    badge: "IIM Bangalore",
    color: "from-amber-600/20 to-amber-500/10 border-amber-500/30 text-amber-400"
  },
  {
    id: "edu_3",
    degree: "Automobile Engineering",
    institution: "Rustamji Institute of Technology (RJIT)",
    description: "Rigorous technical foundations in internal combustion engines, modern drivetrain engineering, vehicle dynamics, and materials systems.",
    badge: "Automobile Eng.",
    color: "from-slate-600/20 to-slate-500/10 border-slate-500/30 text-slate-300"
  }
];
