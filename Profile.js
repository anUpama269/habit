import React, { useEffect, useState } from "react";
import { getHabits } from "../services/Apicall";

function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    joined: "",
  });

  const [stats, setStats] = useState({
    totalHabits: 0,
    totalCheckins: 0,
    longestStreak: 0,
    avgSuccessRate: 0,
  });

  const fetchProfileStats = async () => {
    try {
      const res = await getHabits();
      const habits = res.data || [];

      const totalHabits = habits.length;
      const totalCheckins = habits.reduce(
        (acc, habit) => acc + (habit.checkins?.length || 0),
        0
      );

      const longestStreak = habits.reduce(
        (max, habit) => Math.max(max, habit.maxStreak || 0),
        0
      );

      const avgSuccessRate =
        habits.length > 0
          ? (
              habits.reduce((sum, habit) => sum + (habit.successRate || 0), 0) /
              habits.length
            ).toFixed(2)
          : 0;

      setStats({ totalHabits, totalCheckins, longestStreak, avgSuccessRate });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
    } catch (err) {
      console.error("Error fetching profile stats:", err);
      setStats({ totalHabits: 0, totalCheckins: 0, longestStreak: 0, avgSuccessRate: 0 });
    }
  };

  useEffect(() => {
    fetchProfileStats();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Profile</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">User Info</h5>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Joined: {user.joined}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Habit Summary</h5>
          <p>Total Habits: {stats.totalHabits}</p>
          <p>Total Check-ins: {stats.totalCheckins}</p>
          <p>Longest Streak: {stats.longestStreak}</p>
          <p>Average Success Rate: {stats.avgSuccessRate}%</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
