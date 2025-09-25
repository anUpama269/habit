import React, { useState } from "react";
import { addCheckin } from "../services/Apicall";

function Habititem({ habit, refreshHabits }) {
  const [loading, setLoading] = useState(false);

  const handleCheckin = async () => {
    setLoading(true);
    try {
      await addCheckin(habit.id, { status: true });
      if (refreshHabits) refreshHabits();
    } catch (err) {
      console.error("Check-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{habit.name}</h5>
          <p className="card-text">
            Category: {habit.category} <br />
            Frequency: {habit.frequency} <br />
            Max Streak: {habit.maxStreak || 0} <br />
            Success Rate: {habit.successRate || 0}%
          </p>
          <button className="btn btn-success" onClick={handleCheckin} disabled={loading}>
            {loading ? "Checking in..." : "Check-in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Habititem;
