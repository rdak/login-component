import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Typography, Box } from '@mui/material';
import { LoginComponent, createAuthService } from '../src';

// Create an instance of the auth service
const authService = createAuthService('https://task.tickadoo.com/api/task');

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState('Not authenticated');

  const handleLoginSuccess = async () => {
    const isAuthenticated = await authService.testAuth();
    setAuthStatus(isAuthenticated ? 'Successfully authenticated!' : 'Authentication failed');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login Component Demo
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsLoginOpen(true)}
            sx={{ mb: 2 }}
          >
            Open Login
          </Button>

          <Typography variant="body1" color="textSecondary">
            Authentication Status: {authStatus}
          </Typography>

          <LoginComponent
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            authService={authService}
            onSuccess={handleLoginSuccess}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
