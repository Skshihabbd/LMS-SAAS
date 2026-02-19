export const USER_ROLE = {
  ADMIN: "ADMIN",
  MENTOR: "MENTOR",
  STUDENT: "STUDENT",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
