import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css"
import icon from "../icons/Union.png"


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ورود با: ${username} / ${password}`);
  };
  return (
    <div className={styles.container}>
      <div>
        <h3>بوت کمپ بوتواستارت</h3>
      </div>
      <div className={styles.card}>
        <img className={styles.icon} src={icon} alt="boto" />
        <h2 className={styles.title}>فرم ورود</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
           
            <input
            placeholder="نام کاربری"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            
            <input
            placeholder="رمز ورود"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            ورود
          </button>
        </form>
        <p className={styles.link}>
          <Link to="/register">ایجاد حساب کاربری!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
