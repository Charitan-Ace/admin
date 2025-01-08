import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProjectsTable from "./components/views/projects/ProjectsView";
import AdminLoginView from "./components/views/admin-login/AdminLoginView";
import ProtectedRoute from "./lib/utils/components/protected-route/ProtectedRoute";
import MainView from "./components/views/main-view/MainView";
import DonorsTable from "./components/views/donors/DonorTable";
import CharitiesTable from "./components/views/charities/CharitiesView";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={
          <AdminLoginView />
        } />
        <Route path="/" element={<MainView />}>
          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <ProjectsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="donors"
            element={
              <ProtectedRoute>
                <DonorsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="charities"
            element={
              <ProtectedRoute>
                <CharitiesTable />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
