import { ThemeContext } from "@/providers/ThemeContext";
import React from "react";

export function useTheme() {
  return React.useContext(ThemeContext);
}
