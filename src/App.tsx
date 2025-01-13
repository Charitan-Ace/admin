import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProjectsTable from "./components/views/projects/ProjectsView";
import AdminLoginView from "./components/views/admin-login/AdminLoginView";
import ProtectedRoute from "./lib/utils/components/protected-route/ProtectedRoute";
import MainView from "./components/views/main-view/MainView";
import DonorsTable from "./components/views/donors/DonorTable";
import CharitiesTable from "./components/views/charities/CharitiesView";
// import StatisticsDashboard from "./components/views/statistics/StatisticsView";
import UserDetailPage from "./components/views/donors-detail/UserDetails";
// import { CreateAccountForm } from "./components/views/create-account/CreateAccountForm";
import CreateAccountView from "./components/views/create-account/CreateAccountView";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin-login"
          element={
            <div className="flex items-center justify-center h-screen w-full">
              <AdminLoginView />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainView />
            </ProtectedRoute>
          }
        >
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
          <Route
            path="statistics"
            element={
              <ProtectedRoute>
                <CreateAccountView />
              </ProtectedRoute>
            }
          />
          <Route
            path="donors/:id"
            element={
              <ProtectedRoute>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
