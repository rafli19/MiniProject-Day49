import api from "./index";

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Get categories error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch categories",
    };
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Get category error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch category",
    };
  }
};
