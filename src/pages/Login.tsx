import { supabase } from "@/config/db";
import { useAuth } from "@/hooks/useAuth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="p-0 min-h-screen min-w-screen w-full">
      <header className="flex items-center justify-start h-14 border-b px-4 lg:h-[60px] lg:px-6">
        <span className="flex gap-2 items-center justify-center">
          <img
            src={"/snippetmonster.svg"}
            alt="App Icon"
            className="size-6 sm:size-10"
          />
          <span className="text-lg sm:text-xl font-bold text-gray-800">
            Snippet Monster
          </span>
        </span>
      </header>
      <div className="flex flex-col items-center justify-center w-full mt-10 sm:mt-12 gap-2 px-8">
        <span className="text-xl lg:text-2xl font-bold text-gray-800">
          Welcome 👋
        </span>
        <span className="text-sm lg:text-md italic text-muted-foreground">
          Transform Your Code into Organized Inspiration Today
        </span>
        <span className="max-w-md min-w-48 sm:min-w-96">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#6366f1",
                    brandAccent: "#6366f1",
                  },
                },
              },
            }}
            theme="light"
            providers={["github"]}
          />
        </span>
      </div>
    </div>
  );
}
