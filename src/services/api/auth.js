import api from "./index";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/register", { name, email, password });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: false };
  }
};
