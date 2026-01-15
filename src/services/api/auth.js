import api from "./index";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return {
      success: true,
      data: {
        token: response.data.data.token,
        user: {
          name: response.data.data.user.name,
          email: response.data.data.user.email,
          id: response.data.data.user.id,
        },
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

export const registerUser = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation,
    });

    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return {
      success: true,
      data: {
        token: response.data.data.token,
        user: {
          name: response.data.data.user.name,
          email: response.data.data.user.email,
          id: response.data.data.user.id,
        },
      },
    };
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
