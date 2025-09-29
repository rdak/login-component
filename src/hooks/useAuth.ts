import { useState, useCallback } from 'react';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';
import { LoginCredentials, ValidationErrors } from '../types/auth';

// Validation schema
const credentialsSchema = z.object({
  username: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const useAuth = (authService: AuthService) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [error, setError] = useState<ValidationErrors | null>(null);

  const validateCredentials = (credentials: LoginCredentials): ValidationErrors | null => {
    try {
      credentialsSchema.parse(credentials);
      return null;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.errors.reduce((acc: ValidationErrors, curr) => {
          const path = curr.path[0] as keyof ValidationErrors;
          if (!acc[path]) {
            acc[path] = [];
          }
          acc[path]!.push(curr.message);
          return acc;
        }, {});
      }
      return { general: ['An unexpected error occurred'] };
    }
  };

  const handleAuthResponse = useCallback(async (
    credentials: LoginCredentials,
    authMethod: (creds: LoginCredentials) => Promise<any>
  ) => {
    setError(null);

    const validationErrors = validateCredentials(credentials);
    if (validationErrors) {
      setError(validationErrors);
      return;
    }

    try {
      await authMethod(credentials);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      if (err instanceof Error) {
        setError({ general: [err.message] });
      } else {
        setError({ general: ['An unexpected error occurred'] });
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    await handleAuthResponse(credentials, (creds) => authService.login(creds));
  }, [handleAuthResponse]);

  const register = useCallback(async (credentials: LoginCredentials) => {
    await handleAuthResponse(credentials, (creds) => authService.register(creds));
  }, [handleAuthResponse]);

  const logout = useCallback(() => {
    authService.clearTokens();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return {
    isAuthenticated,
    error,
    login,
    register,
    logout,
  };
};
