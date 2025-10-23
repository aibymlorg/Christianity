export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  churchId?: string;
  preferences?: {
    primaryModule?: string;
    interests?: string[];
  };
  progress?: {
    culture?: any;
    christianity?: any;
    bibleKnow?: any;
    churchAdmin?: any;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ModuleMessage {
  type: 'AUTH' | 'PROGRESS' | 'NAVIGATION' | 'ERROR';
  payload: any;
  timestamp: number;
  moduleId: string;
}
