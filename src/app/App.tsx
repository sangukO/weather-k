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

function App() {
  return (
    // 전역으로 동작
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </QueryClientProvider>
  );
}

export default App;
