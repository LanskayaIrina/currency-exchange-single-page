import React from "react";
import { MainNavigation } from "./MainNavigation";

import "./Layout.scss";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <MainNavigation />
      <main className="main">{children}</main>
    </div>
  );
};
