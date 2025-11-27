const MOCK_DELAY = 800;

const mockUsers = [
  {
    uid: "admin-001",
    email: "admin@test.com",
    password: "123456",
    name: "Admin User",
    role: "admin",
    emailVerified: true,
  },
  {
    uid: "student-001",
    email: "student@test.com",
    password: "123456",
    name: "Test Student",
    role: "student",
    emailVerified: true,
  },
  {
    uid: "parent-001",
    email: "parent@test.com",
    password: "123456",
    name: "Test Parent",
    role: "parent",
    emailVerified: true,
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const authService = {
  signInWithEmail: async (email, password, role) => {
    try {
      await delay(MOCK_DELAY);

      if (!validateEmail(email)) {
        return {
          success: false,
          error: "Invalid email address",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }

      const existingUser = mockUsers.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (existingUser) {
        return {
          success: true,
          user: {
            uid: existingUser.uid,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            emailVerified: existingUser.emailVerified,
          },
          token: "mock-token-" + Date.now(),
        };
      }

      return {
        success: false,
        error: "Invalid email or password",
      };
    } catch (error) {
      return {
        success: false,
        error: "Login failed. Please try again.",
      };
    }
  },

  registerWithEmail: async (email, password, displayName, role) => {
    try {
      await delay(MOCK_DELAY);

      if (!validateEmail(email)) {
        return {
          success: false,
          error: "Invalid email address",
        };
      }

      const existingUser = mockUsers.find((u) => u.email === email);

      if (existingUser) {
        return {
          success: false,
          error: "Email already registered",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }

      const newUser = {
        uid: "user-" + Date.now(),
        email: email,
        password: password,
        name: displayName,
        role: role,
        emailVerified: true,
      };

      mockUsers.push(newUser);

      return {
        success: true,
        user: {
          uid: newUser.uid,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          emailVerified: true,
        },
        token: "mock-token-" + Date.now(),
      };
    } catch (error) {
      return {
        success: false,
        error: "Registration failed",
      };
    }
  },

  resetPassword: async (email) => {
    try {
      await delay(MOCK_DELAY);

      if (!validateEmail(email)) {
        return {
          success: false,
          error: "Invalid email address",
        };
      }

      console.log("Mock: Password reset email sent to:", email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Failed to send reset email",
      };
    }
  },

  logout: async () => {
    try {
      await delay(500);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Logout failed",
      };
    }
  },
};
