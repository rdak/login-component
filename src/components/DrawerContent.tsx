import React from "react";
import { Box, Drawer } from "@mui/material";

import AuthForm from "./AuthForm";
import { LoginComponentProps } from "./loginComponent.types";

const DrawerContent: React.FC<LoginComponentProps> = ({
    isOpen,
    onClose,
    onAuthSuccess,
}) => {
    return (
        <Drawer
            anchor="bottom"
            open={isOpen}
            onClose={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Authentication Form"
            sx={{
                "& .MuiDrawer-paper": {
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "90vh",
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                <AuthForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
            </Box>
        </Drawer>
    );
};

export default DrawerContent;
