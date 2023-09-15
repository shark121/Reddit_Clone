"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const CustomNextUIProvider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default CustomNextUIProvider;
