import { createContext, useContext, useState } from "react";
import {
  USERS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_WORK_LOGS,
} from "../data/mockData";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [jobs, setJobs] = useState(() => {
    try { const s = localStorage.getItem("jobs"); return s ? JSON.parse(s) : INITIAL_JOBS; } catch { return INITIAL_JOBS; }
  });
  const [applications, setApplications] = useState(() => {
    try { const s = localStorage.getItem("applications"); return s ? JSON.parse(s) : INITIAL_APPLICATIONS; } catch { return INITIAL_APPLICATIONS; }
  });
  const [workLogs, setWorkLogs] = useState(() => {
    try { const s = localStorage.getItem("workLogs"); return s ? JSON.parse(s) : INITIAL_WORK_LOGS; } catch { return INITIAL_WORK_LOGS; }
  });
  const VALID_PAGES = ["dashboard", "jobs", "applications", "hours", "feedback"];
  const getPageFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    return VALID_PAGES.includes(hash) ? hash : "dashboard";
  };
  const [currentPage, setCurrentPageState] = useState(getPageFromHash);
  const setCurrentPage = (page) => {
    window.location.hash = page;
    setCurrentPageState(page);
  };

  // login now accepts a full user object (from backend)
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    window.location.hash = "dashboard";
    setCurrentPageState("dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.hash = "";
    setCurrentPageState("dashboard");
  };

  const saveJobs = (updated) => { setJobs(updated); localStorage.setItem("jobs", JSON.stringify(updated)); };
  const saveApplications = (updated) => { setApplications(updated); localStorage.setItem("applications", JSON.stringify(updated)); };
  const saveWorkLogs = (updated) => { setWorkLogs(updated); localStorage.setItem("workLogs", JSON.stringify(updated)); };

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      postedDate: new Date().toISOString().slice(0, 10),
    };
    saveJobs([newJob, ...jobs]);
  };

  const applyForJob = (jobId) => {
    const alreadyApplied = applications.find(
      (a) => a.studentId === user.id && a.jobId === jobId
    );
    if (alreadyApplied) return { success: false, message: "You already applied for this job." };

    const job = jobs.find((j) => j.id === jobId);
    const newApp = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      jobId,
      jobTitle: job.title,
      status: "pending",
      appliedDate: new Date().toISOString().slice(0, 10),
      feedback: "",
    };
    saveApplications([newApp, ...applications]);
    return { success: true, message: "Application submitted successfully!" };
  };

  const updateApplication = (appId, status, feedback = "") => {
    const updated = applications.map((a) => (a.id === appId ? { ...a, status, feedback } : a));
    saveApplications(updated);
  };

  const logHours = (logData) => {
    const newLog = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      ...logData,
      hours: Number(logData.hours),
    };
    saveWorkLogs([newLog, ...workLogs]);
  };

  const getStudentApplications = (studentId) =>
    applications.filter((a) => a.studentId === studentId);

  const getStudentWorkLogs = (studentId) =>
    workLogs.filter((w) => w.studentId === studentId);

  const getTotalHours = (studentId) =>
    workLogs
      .filter((w) => w.studentId === studentId)
      .reduce((sum, w) => sum + w.hours, 0);

  const value = {
    user,
    USERS,
    login,
    logout,
    jobs,
    addJob,
    applications,
    applyForJob,
    updateApplication,
    workLogs,
    logHours,
    currentPage,
    setCurrentPage,
    getStudentApplications,
    getStudentWorkLogs,
    getTotalHours,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
