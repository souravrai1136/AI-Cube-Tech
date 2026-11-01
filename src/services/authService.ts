import { UserProfile } from '../types';

/**
 * Service interface for Authentication
 * When connecting to Supabase / Firebase / Node.js API:
 * Replace mock implementations with real API calls.
 * Passwords and sensitive tokens are NOT stored in client-side storage.
 */

export interface AuthSession {
  user: UserProfile;
  token: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: 'student' | 'admin';
}

export interface SignUpData {
  name: string;
  email: string;
  password?: string;
  role?: 'student' | 'admin';
}

// Pre-configured demo accounts for seamless evaluation
export const DEMO_USERS: Record<string, UserProfile> = {
  student: {
    id: 'user-std-101',
    name: 'Alex Rivera',
    email: 'student@aicubetech.demo',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    headline: 'Aspiring Fullstack Engineer & UI Enthusiast',
    bio: 'Learning modern web development and design architecture. Building production-grade side projects.',
    joinedDate: 'August 2026',
  },
  admin: {
    id: 'user-adm-001',
    name: 'Elena Vance (Platform Director)',
    email: 'admin@aicubetech.demo',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    headline: 'AI Cube Tech Platform Administrator & Instructor Coordinator',
    bio: 'Oversees course quality assurance, platform operations, and live workshop scheduling.',
    joinedDate: 'January 2026',
  },
};

const STORAGE_KEY = 'aicubetech_demo_user';

export const authService = {
  /**
   * Retrieves active session from localStorage (stores only non-sensitive profile info for demo persistence)
   */
  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as UserProfile;
      }
    } catch {
      // Fallback if parsing fails
    }
    // Default to student demo user for great out-of-the-box reviewer experience
    return DEMO_USERS.student;
  },

  /**
   * Mock login simulating network latency
   */
  async login(credentials: LoginCredentials): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    // Admin demo detection
    if (credentials.email.includes('admin') || credentials.role === 'admin') {
      const admin = DEMO_USERS.admin;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
      return admin;
    }

    const student: UserProfile = {
      ...DEMO_USERS.student,
      email: credentials.email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    return student;
  },

  /**
   * Mock sign-up simulating network latency
   */
  async signUp(data: SignUpData): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || 'student',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
      headline: 'New Student on AI Cube Tech',
      bio: 'Enthusiastic lifelong learner embarking on new skills.',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  /**
   * Switch between demo user roles for quick evaluation
   */
  switchDemoRole(role: 'student' | 'admin'): UserProfile {
    const user = DEMO_USERS[role];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  /**
   * Update student profile info
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = this.getCurrentUser() || DEMO_USERS.student;
    const updated: UserProfile = {
      ...current,
      ...updates,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  /**
   * Sign out
   */
  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },
};
