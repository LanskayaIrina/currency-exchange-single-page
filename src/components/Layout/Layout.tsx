import React from "react";

import { Header } from "./Header";

import "./Layout.scss";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};
