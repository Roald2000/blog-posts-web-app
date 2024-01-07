import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./app/components/AppContext";
import { auth, localData } from "./app/util";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import AppNavigation from "./pages/components/AppNavigation";
import Protected from "./routes/Protected";
import Public from "./routes/Public";

export default function App() {
  const [contextValue, setContextValue] = useState(null);

  function loadContextValue() {
    const condition = auth.get();
    const user = localData.get("user");
    setContextValue({ condition, user });
  }

  useEffect(() => {
    loadContextValue();
    return () => {
      setContextValue(null);
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...contextValue }}>
        <AppNavigation />
        <main className="container mx-auto p-4 mt-10">
          <Routes>
            <Route element={<Protected />}>
              <Route path="/" element={<Posts />} />
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route element={<Public />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
