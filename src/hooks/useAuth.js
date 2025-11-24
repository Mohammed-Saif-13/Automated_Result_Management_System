import { useAuthStore } from "@/stores/useAuthStore";
import { ROLES } from "@/constants/roles";

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, getRole, getUserId } =
    useAuthStore();

  const isAdmin = () => getRole() === ROLES.ADMIN;
  const isStudent = () => getRole() === ROLES.STUDENT;
  const isParent = () => getRole() === ROLES.PARENT;

  const hasRole = (role) => getRole() === role;

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    getRole,
    getUserId,
    isAdmin,
    isStudent,
    isParent,
    hasRole,
  };
};
