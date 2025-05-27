import { useAuth } from "../context/AuthContext";
export async function apiFetch(url, options = {}, token) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
