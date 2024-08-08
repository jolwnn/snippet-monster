import "./App.css";
import Dashboard from "./components/organisms/Dashboard";

function App() {
  return (
    <>
      <header className="flex items-start">
        {/* App Icon and Name */}
        <img
          src={"public/icon-dark.png"}
          alt="App Icon"
          className="w-8 h-8 mr-2"
        />
        <span className="text-xl font-bold text-gray-800">Snippet Monster</span>
      </header>
      <Dashboard />
    </>
  );
}

export default App;
