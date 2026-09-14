// Shared form options and result shape. Lives outside the "use server" files, which may only export async functions.

export const ROLES = ["Hardware Engineer", "Embedded Developer", "Student", "Hobbyist", "Other"] as const;
export const PLATFORMS = ["Windows", "macOS", "Linux"] as const;
export const TOPICS = ["General question", "Technical support", "Enterprise plans", "Billing"] as const;

export type Platform = (typeof PLATFORMS)[number];

/** Returned by form Server Actions. `fields` refills inputs after a failed submit. */
export type FormState = { ok: boolean; message: string; fields?: Record<string, string> } | null;

/** Adapts FormData to the `{ get }` shape used by readPlan. */
export function stringParams(fd: FormData) {
  return {
    get: (key: string) => {
      const value = fd.get(key);
      return typeof value === "string" ? value : null;
    },
  };
}
