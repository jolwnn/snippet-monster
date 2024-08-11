import { GlobalContext } from "@/providers/GlobalContext";
import React from "react";

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}
