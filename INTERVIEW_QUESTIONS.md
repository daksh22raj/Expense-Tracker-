# Interview Questions - ETS-MERN (Expense Tracker System)

A comprehensive list of interview questions based on this MERN stack expense tracking application. Use these to prepare for technical interviews or to evaluate candidates.

---

## 1. General MERN Stack

1. **What is the MERN stack, and why did you choose it for this project?**
   - *Expected: MongoDB, Express, React, Node.js. Discuss JSON throughout, single language (JavaScript), rich ecosystem.*

2. **Explain the request flow when a user adds an expense. Trace the path from frontend to database.**
   - *Expected: React form → Axios POST → Express route → auth middleware → Expense model → MongoDB.*

3. **What is the difference between serving the React app from Express vs. running it separately in development?**
   - *Expected: Production uses static build; dev uses CRA dev server with proxy for hot reload.*

4. **Why is the catch-all route (`app.get("*", ...)`) placed after the API routes in `server.js`?**
   - *Expected: Route order matters. API routes must match first; catch-all serves SPA for client-side routing.*

---

## 2. Backend - Node.js & Express

5. **What does `express.json()` and `express.urlencoded({ extended: true })` do? Why are both needed?**
   - *Expected: Parse JSON body and form-urlencoded data. Different content-types from clients.*

6. **Explain the purpose of CORS in this application. What would happen if you disabled it?**
   - *Expected: Allows frontend (different origin) to call backend. Without it, browser blocks cross-origin requests.*

7. **Why does the server call `process.exit(1)` on MongoDB connection failure?**
   - *Expected: Fail fast—app cannot function without DB. Prevents serving broken state.*

8. **What is the `unhandledRejection` handler for? Give an example of when it would trigger.**
   - *Expected: Catches unhandled Promise rejections. E.g., async route without try-catch throwing.*

9. **How does `router.use(auth)` differ from applying `auth` to individual routes?**
   - *Expected: Applies middleware to all routes in that router. DRY—protects entire resource.*

---

## 3. Authentication & Security

10. **Explain the JWT authentication flow in this app (login to protected request).**
    - *Expected: Login returns token → stored in localStorage → sent as `Authorization: Bearer <token>` → middleware verifies.*

11. **Why is the password hashed with bcrypt before saving? What would happen if you stored plain text?**
    - *Expected: Security—hashes are one-way. Plain text exposes passwords if DB is compromised.*

12. **What is the purpose of `userSchema.pre('save', ...)` in the User model?**
    - *Expected: Mongoose middleware—hashes password only when it's modified before saving.*

13. **Why does the auth middleware use `User.findById(decoded.userId).select('-password')`?**
    - *Expected: Exclude password from response. Never send hashed password to client.*

14. **How does the app handle expired vs. invalid JWT tokens differently?**
    - *Expected: Different error messages (TokenExpiredError vs JsonWebTokenError) for better UX.*

15. **What are the security risks of storing JWT in localStorage? What alternatives exist?**
    - *Expected: XSS can steal token. Alternatives: httpOnly cookies, session storage, short-lived tokens + refresh.*

16. **Why do we return "Invalid credentials" for both wrong email and wrong password on login?**
    - *Expected: Security—don't reveal whether email exists. Prevents user enumeration.*

---

## 4. Database & Mongoose

17. **Explain the relationship between User, Income, and Expense models. How is data isolation achieved?**
    - *Expected: Income/Expense have `userId` ref. All queries filter by `req.user._id`—multi-tenant isolation.*

18. **What is the purpose of `expenseSchema.index({ userId: 1, date: -1 })`?**
    - *Expected: Compound index for efficient queries filtering by user and sorting by date descending.*

19. **Why does the Expense model use `enum` for category? What are the trade-offs?**
    - *Expected: Validation at DB level. Trade-off: adding categories requires schema change.*

20. **What does the `validate` block on the amount field do? Why not just use `min` and `max`?**
    - *Expected: Custom validator for 0–10M range with custom error message. min/max work too; this adds clarity.*

21. **Explain the Expense `/stats` route aggregation pipeline. What does each stage do?**
    - *Expected: $match filters by user/date → $group sums, counts, averages, groups by category.*

22. **Why use `findOne({ _id, userId })` instead of just `findById(id)` when deleting an expense?**
    - *Expected: Authorization—ensures user can only delete their own expenses. Prevents IDOR.*

---

## 5. Frontend - React

23. **What is the purpose of AuthContext? Why use Context instead of prop drilling?**
    - *Expected: Global auth state. Avoid passing user/login/logout through every component.*

24. **Explain the `useAuth` hook. What happens if it's used outside AuthProvider?**
    - *Expected: Returns auth context. Throws error—ensures proper provider hierarchy.*

25. **How does the PrivateRoute component protect routes? What happens when loading vs. unauthenticated?**
    - *Expected: Checks user from AuthContext. Loading → spinner; no user → Navigate to /login.*

26. **Why set `axios.defaults.headers.common['Authorization']` in AuthContext?**
    - *Expected: Attach token to all requests automatically. Single place to manage auth header.*

27. **What happens in `fetchUser` when the token is invalid or expired?**
    - *Expected: API returns 401 → catch block removes token, clears header, sets loading false.*

28. **How does the Charts component transform raw income/expense arrays into chart data?**
    - *Expected: getMonthlyData aggregates by month; getCategoryData groups expenses by category.*

29. **Why does the API config use `getApiBaseUrl()` with environment detection?**
    - *Expected: Dev uses localhost; production uses deployed backend URL. Handles GitHub Pages.*

---

## 6. API Design & Validation

30. **Why validate input on both frontend and backend?**
    - *Expected: Frontend for UX; backend for security—never trust client. Defense in depth.*

31. **How does the auth route handle duplicate email registration (MongoDB error code 11000)?**
    - *Expected: Catches MongoServerError 11000 (unique index violation), returns user-friendly message.*

32. **What is the purpose of the `/api/health` endpoint?**
    - *Expected: Deployment health checks—load balancers, orchestrators ping this to verify server is up.*

33. **Explain the expense export feature. What format and headers are used?**
    - *Expected: XLSX via xlsx library. Content-Disposition for download. Maps DB fields to Excel columns.*

---

## 7. Architecture & Design

34. **How would you add pagination to the expense list? What changes in the API and frontend?**
    - *Expected: API: skip/limit or cursor; frontend: load more or infinite scroll. Discuss trade-offs.*

35. **If you had to add real-time updates (e.g., when another device adds an expense), how would you implement it?**
    - *Expected: WebSockets (Socket.io), Server-Sent Events, or polling. Discuss complexity.*

36. **Why is the expense route's PUT handler checking `userId` when finding the expense?**
    - *Expected: Authorization—users can only edit their own data. Prevents horizontal privilege escalation.*

37. **How would you add rate limiting to prevent brute-force login attempts?**
    - *Expected: express-rate-limit middleware, or Redis for distributed rate limiting.*

---

## 8. Deployment & DevOps

38. **What environment variables are required for production? Why not hardcode them?**
    - *Expected: MONGODB_URI, JWT_SECRET, PORT. Security, different configs per environment.*

39. **Why does the frontend need `REACT_APP_API_URL`? When is it baked into the build?**
    - *Expected: CRA injects env vars at build time. Must rebuild to change—no runtime config.*

40. **What is the purpose of the `.nojekyll` file mentioned in the README?**
    - *Expected: GitHub Pages uses Jekyll by default. .nojekyll disables it for SPA deployment.*

41. **Explain the build process: what does `npm run build` produce, and where does Express serve it from?**
    - *Expected: CRA produces optimized static files in frontend/build. Express serves via express.static.*

---

## 9. Code-Specific Questions

42. **In the User model, why use `this.isModified('password')` in the pre-save hook?**
    - *Expected: Only hash when password is new or changed. Avoids re-hashing on every user update.*

43. **What does `router.get('*', ...)` do in the context of React Router?**
    - *Expected: Catch-all for SPA—serves index.html for all non-API routes so client-side routing works.*

44. **In the expense route, why use `parseFloat(amount)` and check `isNaN()`?**
    - *Expected: req.body sends strings. Parse to number; validate to prevent invalid data.*

45. **Why does the AuthProvider's useEffect have an empty dependency array `[]`?**
    - *Expected: Run only on mount—check token once when app loads. Token check doesn't need deps.*

---

## 10. Behavioral & Scenario-Based

46. **A user reports they're logged out randomly. What could cause this? How would you debug?**
    - *Expected: Token expiry (7d), invalid token, fetchUser 401. Check Network tab, token in localStorage.*

47. **How would you add a "Forgot Password" feature to this app?**
    - *Expected: Reset token in DB, send email with link, new route to verify token and set password.*

48. **If MongoDB goes down, what happens to existing users? What would you add for resilience?**
    - *Expected: Connection fails, process exits. Add retry logic, connection pooling, health checks.*

49. **How would you implement role-based access (e.g., admin vs. regular user)?**
    - *Expected: Add role to User model, middleware to check role, protect admin routes.*

50. **Describe how you would write tests for the expense creation API.**
    - *Expected: Jest + Supertest. Mock User/Expense, auth middleware. Test validation, auth, success case.*

---

## Quick Reference: Key Files

| Topic | File |
|-------|------|
| Server setup | `backend/server.js` |
| Auth middleware | `backend/middleware/auth.js` |
| User model | `backend/models/User.js` |
| Expense model | `backend/models/Expense.js` |
| Auth routes | `backend/routes/auth.js` |
| Expense routes | `backend/routes/expense.js` |
| Auth context | `frontend/src/context/AuthContext.js` |
| API config | `frontend/src/config/api.js` |
| Routing | `frontend/src/App.js` |
| Charts | `frontend/src/components/Dashboard/Charts.js` |

---

*Good luck with your interview!*
