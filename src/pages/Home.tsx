import SearchBar from "@/components/atoms/SearchBar";
import UserIcon from "@/components/atoms/UserIcon";
import Dashboard from "@/components/organisms/Dashboard";
import NavBar from "@/components/organisms/NavBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalProvider } from "@/providers/GlobalContext";
import { ThemeProvider } from "@/providers/ThemeContext";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <div className="p-0 grid min-h-screen min-w-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
          <div className="hidden border-r md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <span className="flex gap-2 items-center justify-center">
                  <img
                    src={"/snippetmonster.svg"}
                    alt="App Icon"
                    className="size-10"
                  />
                  <span className="text-md lg:text-xl font-bold text-gray-800">
                    Snippet Monster
                  </span>
                </span>
              </div>
              <div className="flex-1">
                <NavBar />
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-violet-50/80">
            <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetTitle className="hidden">
                  <span className="sr-only">Navigation menu</span>
                </SheetTitle>
                <SheetContent
                  side="left"
                  className="flex flex-col items-start justify-start px-4 w-5/6"
                >
                  <NavBar />
                </SheetContent>
              </Sheet>
              <div className="w-full grid grid-cols-12 gap-1 md:gap-3">
                <span className="col-span-11">
                  <SearchBar />
                </span>
                <UserIcon />
              </div>
            </header>
            <Dashboard />
          </div>
        </div>
      </ThemeProvider>
    </GlobalProvider>
  );
}
