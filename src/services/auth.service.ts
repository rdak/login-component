import axios, { AxiosInstance } from "axios";
import { AuthResponse, LoginCredentials } from "../types/auth";

const BASE_URL = "https://task.tickadoo.com/api/task";

export class AuthService {
    private api: AxiosInstance;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private refreshPromise: Promise<AuthResponse> | null = null;

    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await this.api.post<AuthResponse>(
            "/login",
            credentials,
        );
        this.setTokens(response.data);
        return response.data;
    }

    public async register(
        credentials: LoginCredentials,
    ): Promise<AuthResponse> {
        const response = await this.api.post<AuthResponse>(
            "/register",
            credentials,
        );
        this.setTokens(response.data);
        return response.data;
    }

    private async refreshAccessToken(): Promise<AuthResponse> {
        // If there's already a refresh in progress, return that promise
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        if (!this.refreshToken) {
            throw new Error("No refresh token available");
        }

        // Create new refresh promise
        this.refreshPromise = this.api
            .post<AuthResponse>("/refresh", { refreshToken: this.refreshToken })
            .then((response) => {
                this.setTokens(response.data);
                return response.data;
            })
            .finally(() => {
                this.refreshPromise = null;
            });

        return this.refreshPromise;
    }

    public async testAuth(): Promise<boolean> {
        try {
            await this.api.get("/test", {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    private setTokens(tokens: AuthResponse): void {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;

        // Update axios default headers
        this.api.defaults.headers.common["Authorization"] =
            `Bearer ${this.accessToken}`;
    }

    public clearTokens(): void {
        this.accessToken = null;
        this.refreshToken = null;
        delete this.api.defaults.headers.common["Authorization"];
    }

    public isAuthenticated(): boolean {
        return !!this.accessToken;
    }
}

export const createAuthService = () => {
    return new AuthService();
};
