import { useApp } from "../context/AppContext";

function StudentDashboard() {
  const { user, jobs, getStudentApplications, getStudentWorkLogs, setCurrentPage } = useApp();

  const jobsData = jobs;

  // Existing logic (unchanged)
  const myApps = getStudentApplications(user.id);
  const myLogs = getStudentWorkLogs(user.id);
  const totalHours = myLogs.reduce((sum, w) => sum + w.hours, 0);
  const approvedJobs = myApps.filter((a) => a.status === "approved");
  const pendingApps = myApps.filter((a) => a.status === "pending");

  return (
    <div className="p-6 space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold">Hello, {user.name.split(" ")[0]}! 👋</h2>
        <p className="text-blue-100 text-sm mt-1">
          {approvedJobs.length > 0
            ? `You're currently working as: ${approvedJobs[0].jobTitle}`
            : "Browse jobs below and start applying!"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Jobs Available", value: jobsData.length, icon: "💼", color: "blue" }, // 🔥 FROM BACKEND
          { label: "My Applications", value: myApps.length, icon: "📋", color: "amber" },
          { label: "Approved", value: approvedJobs.length, icon: "✅", color: "green" },
          { label: "Hours Logged", value: totalHours, icon: "⏱", color: "purple" },
        ].map(({ label, value, icon, color }) => {
          const colorMap = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            amber: "bg-amber-50 text-amber-600",
            purple: "bg-purple-50 text-purple-600",
          };
          return (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${colorMap[color]}`}>
                {icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* My Applications */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">My Applications</h3>
            <button
              onClick={() => setCurrentPage("applications")}
              className="text-xs text-blue-500 hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {myApps.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">
                No applications yet.
                <button onClick={() => setCurrentPage("jobs")} className="text-blue-500 underline ml-1">
                  Browse jobs →
                </button>
              </p>
            ) : (
              myApps.slice(0, 4).map((app) => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{app.jobTitle}</p>
                    <p className="text-xs text-gray-400">{app.appliedDate}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize
                      ${app.status === "pending" ? "bg-amber-50 text-amber-600"
                        : app.status === "approved" ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Work Logs */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Recent Work Logs</h3>
            <button
              onClick={() => setCurrentPage("hours")}
              className="text-xs text-blue-500 hover:underline"
            >
              Log hours →
            </button>
          </div>
          <div className="space-y-2">
            {myLogs.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No hours logged yet.</p>
            ) : (
              myLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{log.jobTitle}</p>
                    <p className="text-xs text-gray-400">{log.date}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                    {log.hours} hrs
                  </span>
                </div>
              ))
            )}
          </div>

          {totalHours > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-500 font-medium">Total Hours</p>
              <p className="text-sm font-bold text-blue-600">{totalHours} hrs</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setCurrentPage("jobs")} className="px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl">
            🔍 Browse Jobs
          </button>
          <button onClick={() => setCurrentPage("hours")} className="px-4 py-2.5 bg-white border text-gray-600 text-xs font-semibold rounded-xl">
            ⏱ Log Work Hours
          </button>
          <button onClick={() => setCurrentPage("feedback")} className="px-4 py-2.5 bg-white border text-gray-600 text-xs font-semibold rounded-xl">
            💬 View Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;