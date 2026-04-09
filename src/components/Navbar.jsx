import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-white font-semibold text-lg">Note App</span>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-gray-400 text-sm hidden sm:block truncate max-w-48">
              {user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
