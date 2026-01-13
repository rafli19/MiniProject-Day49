import axios from "axios";

const API_URL = "https://reqres.in/api";

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Login gagal",
    };
  }
};

// Register
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Register gagal",
    };
  }
};

// Get List Users (Pagination)
export const getUsers = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};

// Get Single User
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};
