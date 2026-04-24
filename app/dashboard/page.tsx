"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-text">
          Welcome! You have successfully logged in.
        </p>
        <div className="logout-btn">
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}