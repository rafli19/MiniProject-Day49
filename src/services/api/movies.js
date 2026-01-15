import api from "./index";

export const getMovies = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/movies?${queryString}` : "/movies";

    const response = await api.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Get movies error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch movies",
    };
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Get movie error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch movie",
    };
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await api.post("/movies", movieData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Create movie error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create movie",
    };
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await api.put(`/movies/${id}`, movieData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Update movie error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update movie",
    };
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await api.delete(`/movies/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Delete movie error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete movie",
    };
  }
};
