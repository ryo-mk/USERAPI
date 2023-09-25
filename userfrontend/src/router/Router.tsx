import { VFC, memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Search } from "../components/pages/Search";
import { UserManagement } from "../components/pages/UserManagement";
import { Page404 } from "../components/pages/Page404";
import { Header } from "../components/Header";

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header>
            <Search />
          </Header>
        }
      />
      <Route
        path="/search"
        element={
          <Header>
            <Search />
          </Header>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <Header>
            <UserManagement />
          </Header>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
