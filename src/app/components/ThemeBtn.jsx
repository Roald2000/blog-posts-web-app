import React, { useEffect, useState } from "react";

import * as Icon from "react-icons/fa6";

export default function ThemeBtn() {
  const [theme, setTheme] = useState("dark");

  const toggle = () => {
    if (theme === "light") {
      setTheme("dark");
      sessionStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      sessionStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const localTheme = sessionStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <button onClick={() => toggle()} type="button" className="btn btn-circle">
      {theme === "dark" ? <Icon.FaSun size={24} /> : <Icon.FaMoon size={24} />}
    </button>
  );
}
