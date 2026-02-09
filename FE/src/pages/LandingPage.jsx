import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">TaskApp</div>
          <div className="flex gap-3">
            <Link to="/register">
              <Button variant="outline">Đăng ký</Button>
            </Link>
            <Link to="/login">
              <Button variant="default">Đăng nhập</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Quản lý công việc hiệu quả
            <span className="text-primary block mt-2">với TaskApp</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ứng dụng giúp bạn tổ chức, theo dõi và hoàn thành công việc một cách
            dễ dàng. Tăng năng suất làm việc ngay hôm nay!
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Bắt đầu ngay
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Dễ sử dụng
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Giao diện đơn giản, trực quan, dễ dàng thao tác ngay cả với người
              mới
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Bảo mật an toàn
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dữ liệu được mã hóa và bảo vệ với công nghệ bảo mật hiện đại
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Nhanh chóng
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hiệu suất cao, phản hồi nhanh, không làm gián đoạn công việc của
              bạn
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 TaskApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
