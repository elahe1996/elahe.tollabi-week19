// src/components/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      if (storedUsername) setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>مدیریت محصولات</div>
      <div className={styles.userInfo}>
        {isLoggedIn ? (
          <>
            <span className={styles.welcome}>خوش آمدید، {username || "کاربر"}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              خروج
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} className={styles.loginBtn}>
            ورود
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;