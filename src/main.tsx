import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import App from "./app/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// tanstack query
// 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 캐싱 시간 설정
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
