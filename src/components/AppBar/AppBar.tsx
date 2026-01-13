import { APP_BAR_ACTIONS_ID } from "./consts";
import Navigation from "../Navigation/Navigation";
import './AppBar.scss';

export default function () {
  return (
    <header className="app-bar">
      <Navigation />
      <div className="w-full h-full" id={APP_BAR_ACTIONS_ID} />
    </header>
  )
}
