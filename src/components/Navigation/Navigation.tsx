import { useContext } from 'react';
import { SettingsIcon, ArrowBigLeft } from 'lucide-react';
import IconButton from '../ui/IconButton/IconButton';
import { PageContext } from '@/app/contexts/PageContext';
import './Navigation.scss';


export default function ({ className }: { className?: string }) {
  const { currentPage, changePage } = useContext(PageContext);
  return (
    <nav className={'navigation' + (className ? ' ' + className : '')}>
      {currentPage !== 'settings' && <IconButton onClick={() => changePage('settings')}> <SettingsIcon /></IconButton>}
      {currentPage !== 'translator' && <IconButton onClick={() => changePage('translator')}> <ArrowBigLeft /></IconButton>}
    </nav>
  )
}
