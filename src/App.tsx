import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/Router";
import { ModalProvider } from "./contexts/modalContext";
import { UserProvider } from "./contexts/userContext";

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
          <UserProvider>
            <ModalProvider>
              <Router />
            </ModalProvider>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
