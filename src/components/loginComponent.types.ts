import { AuthResponse } from "@/types/auth";

export interface LoginComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess?: (data: AuthResponse) => void;
}
