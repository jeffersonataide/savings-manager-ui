import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/Router";
import { ModalProvider } from "./contexts/modalContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ModalProvider>
            <Router />
          </ModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
