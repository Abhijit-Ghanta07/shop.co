import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./services/store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./services/providers/ThemeProvider.tsx";
import App from "./App.tsx";
import "./pwa.ts";
// style
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// new queryclient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
