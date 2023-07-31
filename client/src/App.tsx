// App.tsx

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import OnBoardingPage from "./pages/OnBoardingPage";
import { UserProfilePage } from "./pages/UserProfile"
import { FriendsPage } from "./pages/FriendsPage";
import { FriendRequestsPage } from "./pages/FriendRequestsPage";
import { AllFriendsPage } from "./pages/AllFriendsPage";
import { UserContext } from "./components/UserContext";
import { GroupProfilePage } from "./pages/GroupProfile";
import { GroupProfileMembers } from "./pages/GroupMembers";
import { GroupsPage } from "./pages/GroupsPage";
import { GroupInvitesPage } from "./pages/GroupInvitesPage";
import { AllGroupsPage } from "./pages/AllGroupsPage";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ username, userId, setUsername, setUserId }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/onboarding"
              element={
                <PrivateRoute>
                  <OnBoardingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends/*"
              element={
                <PrivateRoute>
                  <FriendsPage />
                </PrivateRoute>
              }
            >
              <Route
                path=""
                element={<AllFriendsPage />}
              />
              <Route
                path="requests"
                element={<FriendRequestsPage />}
              />
            </Route>
            <Route
              path="/groups/*"
              element={
                <PrivateRoute>
                  <GroupsPage />
                </PrivateRoute>
              }
            >
              <Route
                path=""
                element={<AllGroupsPage />}
              />
              <Route
                path="invites"
                element={<GroupInvitesPage />}
              />
            </Route>
            <Route
              path="/u/:username"
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/g/:groupId/*"
              element={
                <PrivateRoute>
                  <GroupProfilePage />
                </PrivateRoute>
              }
            >
              {/* <Route
                path=""
                element={<AllGroupsPage />}
              /> */}
              <Route
                path="members"
                element={<GroupProfileMembers />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
