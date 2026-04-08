import { useState } from "react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

// Status badge colors
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border border-amber-200",
    approved: "bg-green-50 text-green-600 border border-green-200",
    rejected: "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}

// Used by Admin to show all applications with approve/reject actions
function ApplicationCard({ application, isAdmin = false }) {
  const { updateApplication } = useApp();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackAction, setFeedbackAction] = useState("approved");
  const [feedback, setFeedback] = useState("");

  const handleAction = (action) => {
    setFeedbackAction(action);
    setFeedback("");
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    updateApplication(application.id, feedbackAction, feedback);
    setShowFeedbackModal(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">{application.jobTitle}</h3>
            {isAdmin && (
              <p className="text-xs text-blue-500 font-medium mt-0.5">
                👤 {application.studentName}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">Applied: {application.appliedDate}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {/* Feedback */}
        {application.feedback && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 mb-3">
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Feedback: </span>
              {application.feedback}
            </p>
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && application.status === "pending" && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleAction("approved")}
              className="flex-1 py-2 bg-green-50 text-green-600 border border-green-200 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => handleAction("rejected")}
              className="flex-1 py-2 bg-red-50 text-red-500 border border-red-200 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              ✗ Reject
            </button>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <Modal
          title={`${feedbackAction === "approved" ? "Approve" : "Reject"} Application`}
          onClose={() => setShowFeedbackModal(false)}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You are about to <strong>{feedbackAction}</strong> {application.studentName}'s application for{" "}
              <strong>{application.jobTitle}</strong>.
            </p>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Feedback (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="Add a note for the student..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                  feedbackAction === "approved"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ApplicationCard;
