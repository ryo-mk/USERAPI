import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Information } from "../components/pages/Information";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { HowToUse } from "../components/pages/HowToUse";
import { Register } from "../components/pages/Register";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HeaderLayout>
            <Information />
          </HeaderLayout>
        }
      />
      <Route
        path="/Information"
        element={
          <HeaderLayout>
            <Information />
          </HeaderLayout>
        }
      />
      <Route
        path="/register"
        element={
          <HeaderLayout>
            <Register />
          </HeaderLayout>
        }
      />
      <Route
        path="/howtouse"
        element={
          <HeaderLayout>
            <HowToUse />
          </HeaderLayout>
        }
      />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
