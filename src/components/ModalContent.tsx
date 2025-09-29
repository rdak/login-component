import React from "react";
import { Box, Card, Modal } from "@mui/material";

import AuthForm from "./AuthForm";
import { LoginComponentProps } from "./loginComponent.types";

const ModalContent: React.FC<LoginComponentProps> = ({
    isOpen,
    onClose,
    onAuthSuccess,
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="auth-modal"
            aria-describedby="authentication-form"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    position: "relative",
                    m: 2,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <AuthForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
                </Box>
            </Card>
        </Modal>
    );
};

export default ModalContent;
