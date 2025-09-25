import React,{useState,useEffect} from 'react'
import { getHabits,getStreak,getSuccessRate } from '../services/Apicall'

function Analytics() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getHabits();
      const habitsData = res.data;

      // Fetch streaks and success rate for each habit
      const habitsWithStats = await Promise.all(
        habitsData.map(async (habit) => {
          const streakRes = await getStreak(habit.id);
          const rateRes = await getSuccessRate(habit.id);
          return {
            ...habit,
            maxStreak: streakRes.data.max_streak,
            successRate: rateRes.data.success_rate,
          };
        })
      );

      setHabits(habitsWithStats);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading analytics...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Analytics</h2>
      {habits.length === 0 ? (
        <p>No habits found. Add some habits first!</p>
      ) : (
        <div className="row">
          {habits.map((habit) => (
            <div className="col-md-4 mb-3" key={habit.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{habit.name}</h5>
                  <p className="card-text">
                    Category: {habit.category} <br />
                    Frequency: {habit.frequency} <br />
                    Max Streak: {habit.maxStreak} <br />
                    Success Rate: {habit.successRate}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Analytics