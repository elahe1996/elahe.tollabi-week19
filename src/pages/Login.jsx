import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import icon from "../icons/Union.png"
import { login } from "../services/authServices";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      // alert("ورود موفق!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "نام کاربری یا زمز عبور اشتباه است");
      
    }

  };
  return (
    <div className={styles.container}>
      <div>
        <h3>بوت کمپ بوتواستارت</h3>
      </div>
      <div className={styles.card}>
        <img className={styles.icon} src={icon} alt="boto" />
        <h2 className={styles.title}>فرم ورود</h2>
        {error && <p className={styles.error}>{error}</p>}
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
            placeholder="رمز عبور"
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
