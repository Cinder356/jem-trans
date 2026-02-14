import { useEffect } from 'react';
import './styles/index.css';
import useLoadColors from './hooks/useLoadColors';
import useNeuralSetup from './hooks/useNeuralSetup';
import AppBar from '@/components/AppBar/AppBar';
import Outlet from '@/components/Outlet/Outlet';
import { PageProvider } from './contexts/PageContext';

function App() {
  useLoadColors();
  useNeuralSetup();

  useEffect(() => {
    document.documentElement.classList.add("gtk-theme");
    // document.documentElement.classList.add("dark");
  }, []);

  return (
    <PageProvider>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </PageProvider>
  );
}

export default App;
