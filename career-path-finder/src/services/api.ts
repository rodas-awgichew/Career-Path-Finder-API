
import type { AuthTokens, UserProfile, Recommendation } from '../types';

// This is a mock API service. It simulates network requests and responses.
// In a real application, you would replace this with actual `fetch` or `axios` calls.

const MOCK_DB = {
  recommendations: [
    { id: 1, career_path: { id: 1, name: 'Frontend Developer', description: 'Builds user interfaces for websites and web applications.' }, match_score: 95 },
    { id: 2, career_path: { id: 2, name: 'UX/UI Designer', description: 'Designs user-friendly and visually appealing digital products.' }, match_score: 92 },
    { id: 3, career_path: { id: 3, name: 'Data Scientist', description: 'Analyzes complex data to extract meaningful insights.' }, match_score: 88 },
    { id: 4, career_path: { id: 4, name: 'Product Manager', description: 'Guides the success of a product and leads the cross-functional team.' }, match_score: 85 },
    { id: 5, career_path: { id: 5, name: 'Cloud Solutions Architect', description: 'Designs and deploys cloud-based solutions.' }, match_score: 78 },
    { id: 6, career_path: { id: 6, name: 'DevOps Engineer', description: 'Works with developers and IT staff to oversee code releases.' }, match_score: 75 },
  ],
  profile: {
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    interests: ['Web Development', 'Design Systems', 'User Experience']
  }
};

const apiService = {
  login: async (credentials: any): Promise<AuthTokens> => {
    console.log('Logging in with:', credentials);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          access: 'mock_access_token_string',
          refresh: 'mock_refresh_token_string'
        });
      }, 1000);
    });
  },

  register: async (userInfo: any): Promise<void> => {
    console.log('Registering user:', userInfo);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  },

  getProfile: async (): Promise<UserProfile> => {
    console.log('Fetching profile...');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCK_DB.profile);
      }, 800);
    });
  },

  updateProfile: async (profile: UserProfile): Promise<UserProfile> => {
    console.log('Updating profile:', profile);
    return new Promise(resolve => {
      setTimeout(() => {
        MOCK_DB.profile = profile;
        resolve(MOCK_DB.profile);
      }, 1200);
    });
  },
  
  getRecommendations: async (): Promise<Recommendation[]> => {
    console.log('Fetching recommendations...');
    return new Promise(resolve => {
      setTimeout(() => {
        const sorted = [...MOCK_DB.recommendations].sort((a, b) => b.match_score - a.match_score);
        resolve(sorted);
      }, 1500);
    });
  },

  generateRecommendations: async (): Promise<{ status: string }> => {
    console.log('Triggering recommendation generation...');
     return new Promise(resolve => {
      setTimeout(() => {
        // Simulate generating new scores
        MOCK_DB.recommendations = MOCK_DB.recommendations.map(rec => ({
          ...rec,
          match_score: Math.min(100, Math.floor(rec.match_score * (Math.random() * 0.2 + 0.95)))
        }));
        resolve({ status: 'Processing started' });
      }, 2000);
    });
  }
};

export default apiService;
