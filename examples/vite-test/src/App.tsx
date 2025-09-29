import { useCallback, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Container,
    Typography,
    AppBar,
    Toolbar,
} from "@mui/material";
import { LoginComponent } from "@login-component/index";
import { AuthResponse } from "@login-component/types/auth";

// Create theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = useCallback((data: AuthResponse) => {
        console.log(data);
        // try {
        //     setIsAuthenticated(testResult);
        //     setLastApiResponse(
        //         testResult
        //             ? "Authentication successful!"
        //             : "Authentication test failed",
        //     );
        // } catch (error) {
        //     setLastApiResponse("Error testing authentication");
        //     setIsAuthenticated(false);
        // }
    }, []);

    const onClose = useCallback(() => {
        setIsLoginOpen(false);
    }, []);

    const onClick = useCallback(() => {
        setIsLoginOpen(true);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Login Component Demo
                        </Typography>
                        {isAuthenticated ? (
                            "Welcome user"
                        ) : (
                            <Button color="inherit" onClick={onClick}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>

                <Container maxWidth="sm">
                    <Box sx={{ mt: 4, textAlign: "center" }}>
                        <Typography variant="h4" gutterBottom>
                            Authentication Demo
                        </Typography>

                        <Box sx={{ my: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Status
                            </Typography>
                            <Typography
                                variant="body1"
                                color={
                                    isAuthenticated
                                        ? "success.main"
                                        : "text.secondary"
                                }
                                sx={{ mb: 2 }}
                            >
                                {isAuthenticated
                                    ? "Authenticated"
                                    : "Not authenticated"}
                            </Typography>
                        </Box>

                        <LoginComponent
                            isOpen={isLoginOpen}
                            onClose={onClose}
                            onAuthSuccess={handleLoginSuccess}
                        />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
