import type { AuthTokens, UserProfile, Recommendation } from '../types';


// services/api.ts
const API_BASE = "http://127.0.0.1:8000/api";  

 

const apiService = {
  register: async (userInfo: any): Promise<void> => {
    const res = await fetch(`${API_BASE}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (!res.ok) {
  const errorData = await res.json();
  console.error("Registration error details:", errorData);
  throw new Error("Registration failed");
}

  }, 
  login: async (credentials: { username: string; password: string }): Promise<AuthTokens> => {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials), 
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
},


  

  getProfile: async (): Promise<UserProfile> => {
    const res = await fetch(`${API_BASE}/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  },

  updateProfile: async (profile: any) => {
    const payload = {
      skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills,
      interests: Array.isArray(profile.interests) ? profile.interests.join(', ') : profile.interests,
      education_level: profile.education_level,
    };

    const res = await fetch(`${API_BASE}/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  },



  getRecommendations: async (): Promise<Recommendation[]> => {
    const res = await fetch(`${API_BASE}/recommendations/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Get recommendations error:", errorData);
      throw new Error("Failed to fetch recommendations");
    }
    return res.json();
  },

  generateRecommendations: async (): Promise<void> => {
    const res = await fetch(`${API_BASE}/recommendations/generate/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Generate recommendations error:", errorData);
      throw new Error("Failed to generate recommendations");
    }
  },


  refreshToken: async (): Promise<string> => {
  const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
  });
  if (!res.ok) throw new Error("Token refresh failed");
  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
},


};



export default apiService;

