import { QueryClient } from "@tanstack/react-query";

//queryClient được cấu hình với các tùy chọn mặc định để
// tối ưu hóa hiệu suất và trải nghiệm người dùng,
// bao gồm thời gian staleTime: là thời gian mà dữ liệu được coi là "tươi" và không cần phải refetch,
// số lần retry khi có lỗi, và refetchOnWindowFocus: để kiểm soát việc tự động refetch khi cửa sổ được focus lại.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
