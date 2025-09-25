import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/";

export async function userRegister(data) {
  console.log("Register:", data);
  return await axios.post(`${BASE_URL}/users/`, data);
}

export async function userLogin(data) {
  // Convert JSON object to form data
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  try {
    const response = await axios.post(`${BASE_URL}login/`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
}

export async function userLogout() {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.get(`${BASE_URL}/logout/`, { headers: h });
}


export async function getHabits() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.get(`${BASE_URL}habits/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Axios getHabits error:", err.response?.data || err.message);
    throw err;
  }
}

export async function getHabitDetail(id) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.get(`${BASE_URL}habits/${id}/`, { headers: h });
}

export async function addHabit(payload) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  console.log("Sending habit payload:", payload); // DEBUG

  try {
    const res = await axios.post(`${BASE_URL}habits/`, payload, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log("Habit added response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios addHabit error:", err.response?.data || err.message);
    throw err;
  }
}


export async function updateHabit(id, data) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.put(`${BASE_URL}habits/${id}/`, data, { headers: h });
}

export async function deleteHabit(id) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.delete(`${BASE_URL}habits/${id}/`, { headers: h });
}


export async function getCheckins(habitId) {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Token ${token}` };
  return await axios.get(`${BASE_URL}checkins/?habit=${habitId}`, { headers });
}

// Add a check-in for a habit
export async function addCheckin(habitId, data) {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Token ${token}` };

  // Include the habit ID in the payload
  const payload = { ...data, habit: habitId };

  return await axios.post(`${BASE_URL}checkins/`, payload, { headers });
}

export async function updateCheckin(id, data) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.put(`${BASE_URL}checkin/${id}/`, data, { headers: h });
}

export async function deleteCheckin(id) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.delete(`${BASE_URL}checkin/${id}/`, { headers: h });
}


export async function getStreak(habitId) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.get(`${BASE_URL}streaks/${habitId}`, { headers: h });
}

export async function getSuccessRate(habitId) {
  let token = localStorage.getItem("token");
  let h = { Authorization: `Token ${token}` };
  return await axios.get(`${BASE_URL}success_rate/${habitId}`, { headers: h });
}