import React, { useState, useCallback } from "react";
import {
    Box,
    Tab,
    Tabs,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import {
    LoginCredentials,
    ValidationErrors,
    AuthMode,
    AuthResponse,
} from "../types/auth";
import { createAuthService } from "../services/auth.service";

const authService = createAuthService();

interface AuthFormProps {
    onClose: () => void;
    onAuthSuccess?: (data: AuthResponse) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose, onAuthSuccess }) => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ValidationErrors | null>(null);
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: "",
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
            setIsLoading(true);

            try {
                let response;
                if (mode === "login") {
                    response = await authService.login(credentials);
                } else {
                    response = await authService.register(credentials);
                }
                onAuthSuccess?.(response);
                onClose();
            } catch (err) {
                if (err instanceof Error) {
                    setError({ general: [err.message] });
                } else {
                    setError({ general: ["An unexpected error occurred"] });
                }
            } finally {
                setIsLoading(false);
            }
        },
        [credentials, mode, onClose, onAuthSuccess],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setCredentials((prev) => ({ ...prev, [name]: value }));
        },
        [],
    );

    const handleModeChange = useCallback(
        (_: React.SyntheticEvent, newMode: AuthMode) => {
            setMode(newMode);
            setError(null);
            setCredentials({ username: "", password: "" });
        },
        [],
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={mode}
                onChange={handleModeChange}
                variant="fullWidth"
                aria-label="authentication mode"
            >
                <Tab
                    label="Sign In"
                    value="login"
                    id="auth-tab-0"
                    aria-controls="auth-tabpanel-0"
                />
                <Tab
                    label="Register"
                    value="signup"
                    id="auth-tab-1"
                    aria-controls="auth-tabpanel-1"
                />
            </Tabs>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                }}
            >
                {error?.general && (
                    <Alert severity="error">
                        {error.general.map((err, i) => (
                            <div key={i}>{err}</div>
                        ))}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    type="email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    error={!!error?.username}
                    helperText={error?.username?.[0]}
                    fullWidth
                    required
                    autoComplete="email"
                    slotProps={{
                        htmlInput: {
                            "aria-label": "Password",
                        },
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    error={!!error?.password}
                    helperText={error?.password?.[0]}
                    fullWidth
                    required
                    autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                    }
                    slotProps={{
                        htmlInput: {
                            "aria-label": "Password",
                            minLength: 8,
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : mode === "login" ? (
                        "Sign In"
                    ) : (
                        "Register"
                    )}
                </Button>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 1 }}
                >
                    {mode === "login"
                        ? "Don't have an account? Use the Register tab above."
                        : "Already have an account? Use the Sign In tab above."}
                </Typography>
            </Box>
        </Box>
    );
};

export default AuthForm;
