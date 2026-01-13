import { useContext } from 'react';
import { SettingsContext } from '@/app/contexts/SettingsContext';


export default () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
