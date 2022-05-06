import React from 'react';
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import PrivateRoute from "./services/utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { MainLayout } from "./layouts/MainLayout";
import PostPage from "./pages/PostPage";
import { PageNotFound } from "./pages/NotFoundPage";

function App() {

  return (
    <React.Fragment>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/profile' element={<ProfilePage/>} />
              <Route path="/profile/settings" element={<p>Settings</p>} />
              <Route path="profile/p/:postId" element={<PostPage />} />
              <Route index element={<NewsFeedPage/>} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          </Route>
        </Routes>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
