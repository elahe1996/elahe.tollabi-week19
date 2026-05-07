import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";
import icon from "../icons/Union.png";
import { register } from "../services/authServices";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارد");
      return;
    }
    try {
      await register(username, password);
      alert("ثبت نام موفق! لطفا وارد شوید");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "حطا در ثبت نام");
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
        {error &&  <p className={styles.error}>{error}</p>}
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
            <input
              placeholder="تکرار رمز عبور"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            ثبت نام
          </button>
        </form>
        <p className={styles.link}>
          <Link to="/login"> حساب کاربری دارید؟</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
