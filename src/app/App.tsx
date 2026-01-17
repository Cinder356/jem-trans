import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css';
import useLoadColors from './hooks/useLoadColors';
import AppBar from '@/components/AppBar/AppBar';
import Outlet from '@/components/Outlet/Outlet';
import { PageProvider } from './contexts/PageContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { LlmServiceProvider } from './contexts/LlmServiceContext';

import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  useLoadColors();

  useEffect(() => {
    document.documentElement.classList.add("gtk-theme");
    // document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <LlmServiceProvider>
          <PageProvider>
            <AppBar />
            <main>
              <Outlet />
            </main>
          </PageProvider>
        </LlmServiceProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
