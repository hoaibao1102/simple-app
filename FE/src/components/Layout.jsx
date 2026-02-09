import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Button } from "./ui/Button";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất thành công!");
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link to="/home">
                <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition">
                  TaskApp
                </h1>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex gap-6">
                <Link
                  to="/home"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/home") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/tasks")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/profile")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Profile
                </Link>
                {/* Admin link - Chỉ hiển thị cho Admin */}
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/users"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/admin/users")
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    👑 Admin
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                <strong>{user?.fullName || user?.email}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
