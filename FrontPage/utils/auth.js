export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("token");
    }
    return false;
};