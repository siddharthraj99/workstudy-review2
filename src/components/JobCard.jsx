import { useApp } from "../context/AppContext";

function JobCard({ job, onApply, showApplyButton = false }) {
  const { user, applications } = useApp();

  // Check if this student already applied
  const alreadyApplied = applications.some(
    (a) => a.studentId === user?.id && a.jobId === job.id
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800">{job.title}</h3>
          <p className="text-xs text-blue-500 font-medium mt-0.5">{job.department}</p>
        </div>
        <span className="text-xs bg-green-50 text-green-600 border border-green-100 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          ${job.pay}/hr
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">{job.description}</p>

      {/* Details Row */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
        <span>⏱ {job.hoursPerWeek} hrs/week</span>
        <span>👥 {job.slots} slot{job.slots !== 1 ? "s" : ""}</span>
        <span>📅 {job.postedDate}</span>
      </div>

      {/* Apply Button */}
      {showApplyButton && (
        <button
          onClick={() => onApply(job.id)}
          disabled={alreadyApplied}
          className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-150
            ${
              alreadyApplied
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            }`}
        >
          {alreadyApplied ? "Already Applied" : "Apply Now"}
        </button>
      )}
    </div>
  );
}

export default JobCard;
