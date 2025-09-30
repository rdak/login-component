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
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <Box sx={{ position: "relative" }}>
                <AuthForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
            </Box>
        </Drawer>
    );
};

export default DrawerContent;
