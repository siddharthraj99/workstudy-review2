import { useApp } from "../context/AppContext";

function StatCard({ label, value, color, icon }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${colorMap[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function AdminDashboard() {
  const { jobs, applications, workLogs, USERS, setCurrentPage } = useApp();

  const students = USERS.filter((u) => u.role === "student");
  const pendingApps = applications.filter((a) => a.status === "pending");
  const approvedApps = applications.filter((a) => a.status === "approved");
  const totalHours = workLogs.reduce((sum, w) => sum + w.hours, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold">Welcome back, Admin! 👋</h2>
        <p className="text-blue-100 text-sm mt-1">
          Here's a quick overview of the work-study program status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Job Postings" value={jobs.length} color="blue" icon="💼" />
        <StatCard label="Pending Applications" value={pendingApps.length} color="amber" icon="📋" />
        <StatCard label="Approved Students" value={approvedApps.length} color="green" icon="✅" />
        <StatCard label="Total Hours Logged" value={totalHours} color="purple" icon="⏱" />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Recent Applications</h3>
            <button
              onClick={() => setCurrentPage("applications")}
              className="text-xs text-blue-500 hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {applications.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-gray-700">{app.studentName}</p>
                  <p className="text-xs text-gray-400">{app.jobTitle}</p>
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
            ))}
            {applications.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No applications yet.</p>
            )}
          </div>
        </div>

        {/* Student Hours Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Hours per Student</h3>
            <button
              onClick={() => setCurrentPage("hours")}
              className="text-xs text-blue-500 hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {students.map((student) => {
              const hrs = workLogs
                .filter((w) => w.studentId === student.id)
                .reduce((sum, w) => sum + w.hours, 0);
              const percent = totalHours > 0 ? (hrs / totalHours) * 100 : 0;
              return (
                <div key={student.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-gray-700">{student.name}</p>
                    <p className="text-xs text-gray-400">{hrs} hrs</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">Active Job Postings</h3>
          <button
            onClick={() => setCurrentPage("jobs")}
            className="text-xs text-blue-500 hover:underline"
          >
            Manage →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobs.slice(0, 3).map((job) => (
            <div key={job.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs font-semibold text-gray-800">{job.title}</p>
              <p className="text-xs text-blue-500 mt-0.5">{job.department}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{job.hoursPerWeek} hrs/wk</span>
                <span className="text-xs font-medium text-green-600">${job.pay}/hr</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
