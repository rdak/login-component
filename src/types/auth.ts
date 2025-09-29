export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ValidationErrors {
    username?: string[];
    password?: string[];
    general?: string[];
}

export type AuthMode = "login" | "signup";
