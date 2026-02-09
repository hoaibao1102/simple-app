import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getAllTasks } from "../api";

export default function HomePage() {
  const { user } = useAuthStore();

  // Fetch tasks for statistics
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  // Get recent tasks (latest 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Chào mừng trở lại, {user?.fullName || user?.email || "User"}!
          </h2>
          <p className="text-muted-foreground">
            Quản lý công việc của bạn một cách hiệu quả
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tổng tasks</CardDescription>
              <CardTitle className="text-4xl">
                {isLoading ? "..." : stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Tất cả công việc của bạn
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Chờ xử lý</CardDescription>
              <CardTitle className="text-4xl text-yellow-600">
                {isLoading ? "..." : stats.pending}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Tasks chưa bắt đầu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Đang làm</CardDescription>
              <CardTitle className="text-4xl text-blue-600">
                {isLoading ? "..." : stats.inProgress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Tasks đang thực hiện
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Hoàn thành</CardDescription>
              <CardTitle className="text-4xl text-green-600">
                {isLoading ? "..." : stats.completed}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tasks đã xong</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks and Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Tasks */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tasks gần đây</CardTitle>
                  <CardDescription>5 tasks cập nhật mới nhất</CardDescription>
                </div>
                <Link to="/tasks">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Đang tải...</p>
              ) : recentTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Chưa có task nào</p>
                  <Link to="/tasks">
                    <Button>Tạo task đầu tiên</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex items-start justify-between p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ml-4 ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Hoàn thành"
                          : task.status === "in-progress"
                            ? "Đang làm"
                            : "Chờ xử lý"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions & User Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
                <CardDescription>Actions hay dùng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/tasks" className="block">
                  <Button className="w-full" variant="outline">
                    Quản lý Tasks
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button className="w-full" variant="outline">
                    Chỉnh sửa Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
                <CardDescription>Chi tiết người dùng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Tên:</span>
                    <p className="font-medium">
                      {user?.fullName || "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Email:
                    </span>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
