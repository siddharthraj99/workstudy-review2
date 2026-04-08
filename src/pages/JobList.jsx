import { useState } from "react";
import { useApp } from "../context/AppContext";
import JobCard from "../components/JobCard";
import Modal from "../components/Modal";

// Form used by Admin to post a new job
function AddJobForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    department: "",
    hoursPerWeek: "",
    pay: "",
    description: "",
    slots: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = () => {
    if (!form.title || !form.department || !form.hoursPerWeek || !form.pay || !form.description || !form.slots) {
      setError("All fields are required.");
      return;
    }
    onAdd({
      ...form,
      hoursPerWeek: Number(form.hoursPerWeek),
      pay: Number(form.pay),
      slots: Number(form.slots),
    });
    onClose();
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Job Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="e.g. Lab Assistant" />
        </div>
        <div>
          <label className={labelClass}>Department *</label>
          <input name="department" value={form.department} onChange={handleChange} className={inputClass} placeholder="e.g. Science Dept." />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Hours/Week *</label>
          <input name="hoursPerWeek" type="number" min="1" value={form.hoursPerWeek} onChange={handleChange} className={inputClass} placeholder="10" />
        </div>
        <div>
          <label className={labelClass}>Pay ($/hr) *</label>
          <input name="pay" type="number" step="0.5" min="0" value={form.pay} onChange={handleChange} className={inputClass} placeholder="12.50" />
        </div>
        <div>
          <label className={labelClass}>Open Slots *</label>
          <input name="slots" type="number" min="1" value={form.slots} onChange={handleChange} className={inputClass} placeholder="2" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Describe the role and responsibilities..." />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Post Job</button>
      </div>
    </div>
  );
}

function JobList() {
  const { user, jobs, addJob, applyForJob } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const isAdmin = user?.role === "admin";

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (jobId) => {
    const result = applyForJob(jobId);
    setToast(result.message);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="p-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {isAdmin ? "Job Postings" : "Available Jobs"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{filtered.length} position{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-44"
          />
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Post Job
            </button>
          )}
        </div>
      </div>

      {/* Job Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm text-gray-500">No jobs match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showApplyButton={!isAdmin}
              onApply={handleApply}
            />
          ))}
        </div>
      )}

      {/* Add Job Modal */}
      {showModal && (
        <Modal title="Post New Job" onClose={() => setShowModal(false)}>
          <AddJobForm onAdd={addJob} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default JobList;
