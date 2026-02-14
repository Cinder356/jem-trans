import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SettingsProvider } from '@/app/contexts/SettingsContext';
import { UserMetaProvider } from '@/app/contexts/UserMetaContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <UserMetaProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserMetaProvider>
    </SettingsProvider>
  </QueryClientProvider>
);
