import { useState } from "react";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";

// Log hours form for students
function LogHoursForm({ approvedJobs, onLog, onClose }) {
  const [form, setForm] = useState({
    jobTitle: approvedJobs[0]?.jobTitle || "",
    date: new Date().toISOString().slice(0, 10),
    hours: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.jobTitle || !form.date || !form.hours) {
      setError("Job, date, and hours are required.");
      return;
    }
    if (Number(form.hours) <= 0 || Number(form.hours) > 24) {
      setError("Hours must be between 1 and 24.");
      return;
    }
    onLog(form);
    onClose();
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Job Position *</label>
        <select name="jobTitle" value={form.jobTitle} onChange={handleChange} className={inputClass}>
          {approvedJobs.map((app) => (
            <option key={app.id} value={app.jobTitle}>{app.jobTitle}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Date *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hours Worked *</label>
          <input name="hours" type="number" min="0.5" max="24" step="0.5" value={form.hours} onChange={handleChange} className={inputClass} placeholder="e.g. 4" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} placeholder="What did you work on?" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Submit Log</button>
      </div>
    </div>
  );
}

function WorkHours() {
  const { user, workLogs, logHours, applications, USERS } = useApp();
  const [showModal, setShowModal] = useState(false);

  const isAdmin = user?.role === "admin";

  // Student: only their logs; Admin: all logs
  const logs = isAdmin ? workLogs : workLogs.filter((w) => w.studentId === user.id);

  // For students: approved jobs to log hours against
  const approvedJobs = applications.filter(
    (a) => a.studentId === user?.id && a.status === "approved"
  );

  // Admin: per-student summary
  const students = USERS.filter((u) => u.role === "student");

  const totalHours = logs.reduce((sum, w) => sum + w.hours, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {isAdmin ? "Student Work Hours" : "My Work Hours"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Total logged: <span className="font-semibold text-blue-600">{totalHours} hours</span>
          </p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => {
              if (approvedJobs.length === 0) {
                alert("You need an approved job before logging hours.");
                return;
              }
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Log Hours
          </button>
        )}
      </div>

      {/* Admin: per-student summary cards */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {students.map((student) => {
            const studentLogs = workLogs.filter((w) => w.studentId === student.id);
            const hrs = studentLogs.reduce((sum, w) => sum + w.hours, 0);
            return (
              <div key={student.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-400">{studentLogs.length} log entries</p>
                  </div>
                  <span className="ml-auto text-lg font-bold text-blue-600">{hrs} hrs</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: totalHours > 0 ? `${(hrs / totalHours) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Work Log Entries</h3>
        </div>
        {logs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">⏱</p>
            <p className="text-sm text-gray-500">No work logs yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  {isAdmin && <th className="text-left px-5 py-3">Student</th>}
                  <th className="text-left px-5 py-3">Job</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-center px-5 py-3">Hours</th>
                  <th className="text-left px-5 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    {isAdmin && (
                      <td className="px-5 py-3">
                        <span className="text-xs font-medium text-gray-700">{log.studentName}</span>
                      </td>
                    )}
                    <td className="px-5 py-3">
                      <span className="text-xs font-medium text-gray-700">{log.jobTitle}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">{log.date}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {log.hours}h
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">{log.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-100">
                  {isAdmin && <td className="px-5 py-3" />}
                  <td className="px-5 py-3 text-xs font-bold text-gray-600" colSpan={2}>Total</td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-xs font-bold text-blue-700">{totalHours}h</span>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Log Hours Modal */}
      {showModal && (
        <Modal title="Log Work Hours" onClose={() => setShowModal(false)}>
          <LogHoursForm
            approvedJobs={approvedJobs}
            onLog={logHours}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default WorkHours;
