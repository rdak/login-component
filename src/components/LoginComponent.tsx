import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import ModalContent from "./ModalContent";
import { AuthResponse } from "@/types/auth";
import DrawerContent from "./DrawerContent";
import { LoginComponentProps } from "./loginComponent.types";

const LoginComponent: React.FC<LoginComponentProps> = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (isMobile) {
        return <DrawerContent {...props} />;
    }

    return <ModalContent {...props} />;
};

export default LoginComponent;
