import React, { useState, useEffect } from "react";
import Habitform from "./Habitform";
import Habititem from "./Habititem";
import { getHabits, getStreak, getSuccessRate } from "../services/Apicall";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await getHabits();
      const habitData = res?.data || [];

      const habitsWithStats = await Promise.all(
        habitData.map(async (habit) => {
          try {
            const streakRes = await getStreak(habit.id);
            const successRes = await getSuccessRate(habit.id);
            return {
              ...habit,
              maxStreak: streakRes?.data?.max_streak || 0,
              successRate: successRes?.data?.success_rate || 0,
            };
          } catch {
            return { ...habit, maxStreak: 0, successRate: 0 };
          }
        })
      );

      console.log("Fetched habits:", habitsWithStats); // sanity check
      setHabits(habitsWithStats);
    } catch (err) {
      console.error("Error fetching habits:", err);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <Habitform onHabitAdded={fetchHabits} />

      <hr />

      {loading ? (
        <p>Loading habits...</p>
      ) : habits.length === 0 ? (
        <p>No habits yet. Add a new habit above!</p>
      ) : (
        <div className="row">
          {habits.map((habit) => (
            <Habititem key={habit.id} habit={habit} refreshHabits={fetchHabits} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
