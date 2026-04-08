import { useApp } from "../context/AppContext";

function Feedback() {
  const { user, getStudentApplications } = useApp();

  const myApps = getStudentApplications(user.id);
  const appsWithFeedback = myApps.filter((a) => a.feedback && a.feedback.trim() !== "");

  const statusIcon = {
    approved: "✅",
    rejected: "❌",
    pending: "⏳",
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Feedback</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          View feedback from the administrator on your applications.
        </p>
      </div>

      {appsWithFeedback.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-sm font-semibold text-gray-600">No feedback yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Feedback will appear here once the admin reviews your applications.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appsWithFeedback.map((app) => (
            <div
              key={app.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm
                ${app.status === "approved" ? "border-green-200" : app.status === "rejected" ? "border-red-200" : "border-gray-100"}`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{statusIcon[app.status]}</span>
                    <h3 className="text-sm font-bold text-gray-800">{app.jobTitle}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Applied: {app.appliedDate}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize border
                    ${app.status === "approved" ? "bg-green-50 text-green-600 border-green-200"
                      : app.status === "rejected" ? "bg-red-50 text-red-500 border-red-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"}`}
                >
                  {app.status}
                </span>
              </div>

              {/* Feedback Box */}
              <div
                className={`rounded-xl px-4 py-3
                  ${app.status === "approved" ? "bg-green-50" : app.status === "rejected" ? "bg-red-50" : "bg-gray-50"}`}
              >
                <p className="text-xs font-semibold text-gray-500 mb-1">Admin Feedback:</p>
                <p className="text-sm text-gray-700 leading-relaxed">{app.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      {myApps.length > 0 && appsWithFeedback.length < myApps.length && (
        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
          <p className="text-xs text-blue-600 font-medium">
            ℹ️ You have {myApps.length - appsWithFeedback.length} application(s) pending review.
            Feedback will appear here once the admin responds.
          </p>
        </div>
      )}
    </div>
  );
}

export default Feedback;
