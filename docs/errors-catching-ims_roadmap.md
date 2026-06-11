# Error Handling Strategy for Next.js Product Management Application

This document outlines the three-tier strategy for robust error management, ensuring reliability and a seamless user experience in our product management application.

## 1. Server-Level: Resilient Server Actions
The foundation of error handling is ensuring that server actions communicate failures predictably. We utilize a standardized `TActionResponse` protocol.

### Implementation Steps:
* **Wrapper Utility:** Create a `safeAction` higher-order function to encapsulate `try-catch` logic, preventing unhandled exceptions from crashing the request thread.
* **Structured Responses:** Every action must return a consistent object structure containing `success`, `message`, and optional `errors` (field-level).
* **Logging:** Log critical server-side errors (database connection failures, unauthorized access) to a central system (e.g., Sentry) before returning a sanitized message to the client.

## 2. Validation-Level: Zod-to-Form Integration
Validation errors represent the bridge between raw input and strict data requirements. We leverage Zod’s schema power combined with React Hook Form’s `setError` API.

### Implementation Steps:
* **Schema Definition:** Maintain separate `input` and `output` types using `z.infer` to differentiate between raw user data and processed database records.
* **Mapping Utility:** Create a helper function to transform `ZodError` output into a key-value object map compatible with `react-hook-form`'s `setError`.
* **Graceful Propagation:** If `safeParse` fails, prevent the database execution entirely and return the flattened errors immediately.

## 3. Client-Level: UX and Error Boundaries
The client tier is responsible for shielding the user from technical failures and providing actionable feedback.

### Implementation Steps:
* **Boundary Protection:** Wrap the `AddProductForm` component in a Next.js `error.tsx` boundary. This ensures that if the component fails to mount, the rest of the application remains functional.
* **Toast Notifications:** Use `sonner` for non-blocking feedback regarding success or transient server errors (e.g., "SKU already exists").
* **Reactive Feedback:** Ensure fields highlight correctly using `aria-invalid` and brand-specific error states (destructive red) when `setError` is triggered.

---

### Summary of Error Flow


| Tier | Responsibility | Primary Tool |
| :--- | :--- | :--- |
| **Server** | Catch unexpected system failures | `try/catch` & Sentry |
| **Validation** | Catch domain-specific input errors | Zod `safeParse` |
| **Client** | Display feedback & prevent app crash | `sonner` & Error Boundaries |

---
*Note: Following these stages ensures a "fail-safe" architecture where database integrity is preserved, and the user is never left wondering why an action did not succeed.*