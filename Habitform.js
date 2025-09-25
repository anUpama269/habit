import React, { useState } from "react";
import { addHabit } from "../services/Apicall";

function Habitform({ onHabitAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("health");
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { name, category, frequency, start_date: startDate };

    try {
      await addHabit(payload);
      // reset form
      setName("");
      setCategory("health");
      setFrequency("daily");
      setStartDate("");

      if (onHabitAdded) onHabitAdded();
    } catch (err) {
      console.error("Error adding habit:", err);
      setError(
        err.response?.data?.detail || JSON.stringify(err.response?.data) || "Failed to add habit."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Add New Habit</h5>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Habit Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="health">Health</option>
              <option value="work">Work</option>
              <option value="learning">Learning</option>
              <option value="productivity">Productivity</option>
              <option value="mental_health">Mental Health</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Frequency</label>
            <select
              className="form-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Habit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Habitform;
