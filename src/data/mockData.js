// ─── Mock Users ───────────────────────────────────────────────────────────────
export const USERS = [
  { id: 1, name: "Dr. Sarah Williams", role: "admin", email: "admin@university.edu" },
  { id: 2, name: "Alex Johnson", role: "student", email: "alex.j@student.edu" },
  { id: 3, name: "Maria Garcia", role: "student", email: "maria.g@student.edu" },
];

// ─── Mock Jobs ────────────────────────────────────────────────────────────────
export const INITIAL_JOBS = [
  {
    id: 1,
    title: "Library Assistant",
    department: "Library Services",
    hoursPerWeek: 10,
    pay: 12.5,
    description: "Help students find resources, shelve books, and manage the circulation desk.",
    slots: 3,
    postedDate: "2025-01-10",
  },
  {
    id: 2,
    title: "IT Help Desk Technician",
    department: "Information Technology",
    hoursPerWeek: 15,
    pay: 14.0,
    description: "Provide technical support to students and faculty, troubleshoot hardware and software issues.",
    slots: 2,
    postedDate: "2025-01-12",
  },
  {
    id: 3,
    title: "Research Assistant",
    department: "Biology Dept.",
    hoursPerWeek: 12,
    pay: 13.5,
    description: "Assist professors with ongoing research projects, data collection, and lab maintenance.",
    slots: 1,
    postedDate: "2025-01-15",
  },
  {
    id: 4,
    title: "Campus Tour Guide",
    department: "Admissions",
    hoursPerWeek: 8,
    pay: 11.0,
    description: "Lead prospective students and families on campus tours and answer questions about university life.",
    slots: 5,
    postedDate: "2025-01-18",
  },
  {
    id: 5,
    title: "Student Records Clerk",
    department: "Registrar's Office",
    hoursPerWeek: 10,
    pay: 12.0,
    description: "Assist with filing, data entry, and student records management in a confidential environment.",
    slots: 2,
    postedDate: "2025-01-20",
  },
];

// ─── Mock Applications ────────────────────────────────────────────────────────
export const INITIAL_APPLICATIONS = [
  {
    id: 1,
    studentId: 2,
    studentName: "Alex Johnson",
    jobId: 1,
    jobTitle: "Library Assistant",
    status: "pending",
    appliedDate: "2025-01-20",
    feedback: "",
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Alex Johnson",
    jobId: 4,
    jobTitle: "Campus Tour Guide",
    status: "approved",
    appliedDate: "2025-01-19",
    feedback: "Great enthusiasm! Welcome aboard.",
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Maria Garcia",
    jobId: 2,
    jobTitle: "IT Help Desk Technician",
    status: "approved",
    appliedDate: "2025-01-21",
    feedback: "Strong technical background, approved.",
  },
  {
    id: 4,
    studentId: 3,
    studentName: "Maria Garcia",
    jobId: 3,
    jobTitle: "Research Assistant",
    status: "rejected",
    appliedDate: "2025-01-22",
    feedback: "Position already filled, please apply next semester.",
  },
];

// ─── Mock Work Logs ───────────────────────────────────────────────────────────
export const INITIAL_WORK_LOGS = [
  {
    id: 1,
    studentId: 2,
    studentName: "Alex Johnson",
    jobTitle: "Campus Tour Guide",
    date: "2025-01-25",
    hours: 4,
    notes: "Gave 2 tours to prospective students",
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Alex Johnson",
    jobTitle: "Campus Tour Guide",
    date: "2025-01-27",
    hours: 3,
    notes: "Orientation day tour",
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Maria Garcia",
    jobTitle: "IT Help Desk Technician",
    date: "2025-01-26",
    hours: 5,
    notes: "Resolved 8 support tickets",
  },
  {
    id: 4,
    studentId: 3,
    studentName: "Maria Garcia",
    jobTitle: "IT Help Desk Technician",
    date: "2025-01-28",
    hours: 4,
    notes: "Network troubleshooting session",
  },
];
