import * as React from "react";

export interface ThemeType {
  darkMode: boolean;
  editorTheme: "atelierCaveLight";
}

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: { darkMode: false, editorTheme: "atelierCaveLight" },
  setTheme: () => {},
});

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [theme, setTheme] = React.useState<ThemeType>({
    darkMode: false,
    editorTheme: "atelierCaveLight",
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
