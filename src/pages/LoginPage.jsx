import { useState } from "react";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const { login, USERS } = useApp();
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!selectedId) {
      setError("Please select a user to continue.");
      return;
    }
    login(Number(selectedId));
  };

  const students = USERS.filter((u) => u.role === "student");
  const admin = USERS.find((u) => u.role === "admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">WS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">WorkStudy Portal</h1>
          <p className="text-sm text-gray-400 mt-1">University Work-Study Management System</p>
        </div>

        {/* Role Select Info */}
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
          Select Account to Login
        </p>

        {/* Admin Card */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2 font-medium">Administrator</p>
          <button
            onClick={() => { setSelectedId(admin.id); setError(""); }}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150
              ${
                selectedId === admin.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
              }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
              {admin.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{admin.name}</p>
              <p className="text-xs text-gray-400">{admin.email}</p>
            </div>
            {selectedId === admin.id && (
              <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Student Cards */}
        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">Students</p>
          <div className="space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => { setSelectedId(student.id); setError(""); }}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150
                  ${
                    selectedId === student.id
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.email}</p>
                </div>
                {selectedId === student.id && (
                  <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 mt-3 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all duration-150 active:scale-95"
        >
          Continue to Dashboard →
        </button>

        <p className="text-xs text-center text-gray-300 mt-4">
          FSAD-PS42 · Mock Authentication Only
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
