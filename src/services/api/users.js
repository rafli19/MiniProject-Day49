import api from "./index";

export const getUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Get users error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch users",
    };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Get user by ID error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch user details",
    };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Create user error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create user",
    };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Update user error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update user",
    };
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete user",
    };
  }
};
