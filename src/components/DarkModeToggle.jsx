import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Toggle from "react-styled-toggle";


const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const CheckIfDark = () => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem("colorScheme", "Dark")
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem("colorScheme")
    }
  }

  // const systemPrefersDark = useMediaQuery(
  //   {
  //     query: '(prefers-color-scheme: dark)',
  //   },
  //   undefined,
  //   (isSystemDark: bool) => setIsDark(isSystemDark)
  // );

  useEffect(() => {
    CheckIfDark()
  }, [CheckIfDark]); 

  return (
    <Toggle
      className="dark-mode-toggle"
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

export default withRouter(DarkModeToggle)