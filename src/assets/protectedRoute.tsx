import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({ children }: {children: React.ReactNode }) {
    const { user } = useAuth();

    if (user != null) {
        return children;
    } else {
        return <Navigate to="/" />
    }
}