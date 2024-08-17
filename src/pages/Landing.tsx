import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="p-0 min-h-screen min-w-screen w-full bg-gradient-to-br from-slate-50 to-violet-200">
      <header className="flex items-center justify-between h-14 px-4 lg:h-[60px] lg:px-20 lg:py-10">
        <span className="flex gap-2 items-center justify-center">
          <img
            src={"/snippetmonster.svg"}
            alt="App Icon"
            className="size-6 sm:size-10"
          />
          <span className="text-md sm:text-xl font-bold text-gray-800">
            Snippet Monster
          </span>
        </span>
        <Button
          onClick={() => navigate("/auth")}
          className="rounded-full py-0.5 bg-gradient-to-br from-indigo-400 to-violet-600"
        >
          Log In
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 lg:px-20">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 items-center">
                <div className="space-y-2 flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    <span className="text-indigo-700/80">
                      Snippet Monster —
                    </span>{" "}
                    Your Code, Perfectly Curated
                  </h1>
                  <p className="max-w-[430px] text-muted-foreground md:text-lg">
                    Unlock your productivity with our powerful code snippet
                    manager. Save time, cut repitition, and focus on building
                    great software.
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/auth")}
                  className="md:w-[400px] bg-gradient-to-br from-indigo-400 to-violet-600"
                >
                  Try Snippet Monster Today
                </Button>
              </div>
              <img
                src="/preview.png"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
