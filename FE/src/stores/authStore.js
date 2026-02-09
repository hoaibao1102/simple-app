// import thư viện zustand và middleware persist để tạo store quản lý
//  trạng thái xác thực người dùng
import { create } from "zustand";
import { persist } from "zustand/middleware";

// tạo store authStore với các trạng thái và phương thức liên quan đến xác thực
export const useAuthStore = create(
  // sử dụng middleware persist để lưu trữ trạng thái xác thực vào localStorage
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // phương thức setAuth để cập nhật trạng thái xác thực khi
      //  người dùng đăng nhập thành công
      setAuth: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // phương thức updateAccessToken để cập nhật accessToken mới sau khi làm mới token
      updateAccessToken: (accessToken) => set({ accessToken }),

      // phương thức logout để xóa trạng thái xác thực khi người dùng đăng xuất
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
