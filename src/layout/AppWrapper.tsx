import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";

interface IAppWrapper {
  children: React.ReactNode;
}
export default function AppWrapper({ children }: IAppWrapper) {
  
  return (
    <div>
      <SnackbarProvider />
      <BrowserRouter>{children}</BrowserRouter>
    </div>
  );
}