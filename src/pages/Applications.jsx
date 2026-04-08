import { useState } from "react";
import { useApp } from "../context/AppContext";
import ApplicationCard from "../components/ApplicationCard";

function Applications() {
  const { user, applications, getStudentApplications } = useApp();
  const [filter, setFilter] = useState("all");

  const isAdmin = user?.role === "admin";

  // Admin sees all; student sees only their own
  const allApps = isAdmin ? applications : getStudentApplications(user.id);

  const filtered =
    filter === "all" ? allApps : allApps.filter((a) => a.status === filter);

  const counts = {
    all: allApps.length,
    pending: allApps.filter((a) => a.status === "pending").length,
    approved: allApps.filter((a) => a.status === "approved").length,
    rejected: allApps.filter((a) => a.status === "rejected").length,
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          {isAdmin ? "Manage Applications" : "My Applications"}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {isAdmin
            ? "Review and manage student work-study applications."
            : "Track the status of all your submitted applications."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border
              ${
                filter === tab.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500"
              }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                ${filter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Application Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm text-gray-500">
            {filter === "all" ? "No applications found." : `No ${filter} applications.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
