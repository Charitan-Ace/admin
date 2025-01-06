import { Outlet } from "react-router";
import HeaderView from "../header/HeaderView";

const MainView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderView />

      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainView;
