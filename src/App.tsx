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
        <UserProvider>
          <ModalProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ModalProvider>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}
