// src/api.js
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
  // Убираем возможное дублирование /api
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const response = await fetch(`${API_BASE_URL}/${cleanPath}`, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Ошибка при выполнении запроса");
  }
  return response.json();
}
