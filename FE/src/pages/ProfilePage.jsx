import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { getProfile } from "../api";

export default function ProfilePage() {
  // Fetch profile
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-muted-foreground">Đang tải profile...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-destructive">
            Lỗi tải profile: {error.response?.data?.message || error.message}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Chi tiết tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Họ tên
                  </p>
                  <p className="text-base font-semibold">
                    {profile?.fullName || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-base font-semibold">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Vai trò
                  </p>
                  <p className="text-base">
                    {profile?.role === "ADMIN" ? "Admin" : "User"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Trạng thái
                  </p>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      profile?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {profile?.status === "ACTIVE" ? "Đang hoạt động" : "Khác"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin tài khoản</CardTitle>
              <CardDescription>Dữ liệu hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ID
                  </p>
                  <p className="text-base font-mono text-sm break-all">
                    {profile?.id || profile?._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Ngày tạo
                  </p>
                  <p className="text-base">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Cập nhật lần cuối
                  </p>
                  <p className="text-base">
                    {profile?.updatedAt
                      ? new Date(profile.updatedAt).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Lưu ý:</strong> Hiện tại chưa có API để chỉnh sửa profile
            hoặc đổi mật khẩu. Vui lòng liên hệ admin nếu cần thay đổi thông
            tin.
          </p>
        </div>
      </div>
    </Layout>
  );
}
