import { VFC, memo } from "react";
import { Route, Routes } from "react-router-dom";

import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Home } from "../components/pages/Home";
import { UserManagement } from "../components/pages/UserManagement";
import { Page404 } from "../components/pages/Page404";

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      <Route
        path="/home"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <HeaderLayout>
            <UserManagement />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
