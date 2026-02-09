import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../api";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    role: "",
    status: "",
  });

  // Fetch users with filters
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-users", page, searchTerm, roleFilter, statusFilter],
    queryFn: () =>
      getAllUsers({
        page,
        limit: 10,
        search: searchTerm || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
      }),
  });

  // Fetch user detail
  const { data: userDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["user-detail", selectedUser],
    queryFn: () => getUserById(selectedUser),
    enabled: !!selectedUser,
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-detail"] });
      toast.success("Cập nhật user thành công!");
      setEditingUser(null);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Xóa user thành công!");
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Xóa thất bại!");
    },
  });

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditForm({
      fullName: user.fullName,
      role: user.role,
      status: user.status,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      userId: editingUser,
      data: editForm,
    });
  };

  const handleDeleteClick = (userId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa user này? (Sẽ set status thành INACTIVE)",
      )
    ) {
      deleteMutation.mutate(userId);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset về trang 1 khi search
  };

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">
                {error.response?.status === 403
                  ? "Bạn không có quyền truy cập trang này. Chỉ Admin mới có quyền quản lý người dùng."
                  : `Lỗi: ${error.response?.data?.message || error.message}`}
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
            <p className="text-muted-foreground">
              Danh sách và quản lý tất cả người dùng trong hệ thống
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Tìm kiếm & Lọc</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Tìm kiếm</Label>
                  <Input
                    id="search"
                    placeholder="Email hoặc tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <select
                    id="role"
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(e.target.value);
                      setPage(1);
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Tất cả</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Tất cả</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Users List */}
        {isLoading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Đang tải...</p>
            </CardContent>
          </Card>
        ) : usersData?.data?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Không tìm thấy người dùng nào
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  Danh sách người dùng ({usersData?.pagination?.total || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Họ tên</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Vai trò</th>
                        <th className="text-left py-3 px-4">Trạng thái</th>
                        <th className="text-left py-3 px-4">Ngày tạo</th>
                        <th className="text-right py-3 px-4">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData?.data?.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="py-3 px-4 font-medium">
                            {user.fullName}
                          </td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === "ADMIN"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === "ACTIVE"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUser(user.id)}
                              >
                                Chi tiết
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditClick(user)}
                              >
                                Sửa
                              </Button>
                              {user.status === "ACTIVE" && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteClick(user.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  Xóa
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {usersData?.pagination && (
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Trang {usersData.pagination.page} /{" "}
                      {usersData.pagination.totalPages} (
                      {usersData.pagination.total} người dùng)
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Trước
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        disabled={
                          page === usersData.pagination.totalPages ||
                          usersData.pagination.totalPages === 0
                        }
                      >
                        Sau
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* User Detail Modal */}
        {selectedUser && !editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Chi tiết người dùng</CardTitle>
                    <CardDescription>
                      Thông tin đầy đủ của người dùng
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUser(null)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingDetail ? (
                  <p className="text-center text-muted-foreground">
                    Đang tải...
                  </p>
                ) : userDetail ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        ID
                      </p>
                      <p className="font-mono text-sm break-all">
                        {userDetail.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Họ tên
                      </p>
                      <p className="font-semibold">{userDetail.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Email
                      </p>
                      <p>{userDetail.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Vai trò
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          userDetail.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {userDetail.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Trạng thái
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          userDetail.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {userDetail.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Ngày tạo
                      </p>
                      <p>
                        {new Date(userDetail.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Cập nhật lần cuối
                      </p>
                      <p>
                        {new Date(userDetail.updatedAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Chỉnh sửa người dùng</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin người dùng
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingUser(null)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="editFullName">Họ tên</Label>
                    <Input
                      id="editFullName"
                      value={editForm.fullName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editRole">Vai trò</Label>
                    <select
                      id="editRole"
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editStatus">Trạng thái</Label>
                    <select
                      id="editStatus"
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="flex-1"
                    >
                      {updateMutation.isPending ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingUser(null)}
                      disabled={updateMutation.isPending}
                    >
                      Hủy
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
