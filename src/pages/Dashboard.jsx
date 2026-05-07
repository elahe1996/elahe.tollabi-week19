
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return <h1>به داشبورد خوش آمدید! (محصولات به زودی)</h1>;
}

export default Dashboard;