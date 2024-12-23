import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import TodoApp from "./features/todo/TodoApp";

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <TodoApp />
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default App;
