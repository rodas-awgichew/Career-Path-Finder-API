
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserProfile {
  id: number;
  user: User;              
  skills: string[];
  interests: string[];
  education_level: string; 
  updated_at: string;      
}
export interface Recommendation {
  id: number;
  career_path: number;
  career_path_detail: {
    id: number;
    title: string;
    description: string;
    required_skills: string;
    category: string;
    min_salary: number;
    max_salary: number;
    difficulty_level: string;
    created_at: string;
  };
  match_score: number;
}
