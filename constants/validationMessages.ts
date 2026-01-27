export const VALIDATION_MESSAGES = {
  login: {
    usernameRequired: "Epic sadface: Username is required",
    passwordRequired: "Epic sadface: Password is required",
    lockedUser: "Epic sadface: Sorry, this user has been locked out.",
    invalidCredentials:
      "Epic sadface: Username and password do not match any user in this service",
  },
} as const;
