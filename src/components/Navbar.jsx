import { useApp } from "../context/AppContext";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  jobs: "Jobs",
  applications: "Applications",
  hours: "Work Hours",
  feedback: "Feedback",
};

function Navbar() {
  const { user, currentPage } = useApp();

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-bold text-gray-800">
          {PAGE_TITLES[currentPage] || "Dashboard"}
        </h1>
        <p className="text-xs text-gray-400">
          {user?.role === "admin" ? "Admin Panel" : "Student Portal"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
