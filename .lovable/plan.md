

## Plan: Restore Password Protection

The `RequirePassword` and `Login` components already exist in the codebase. Need to wire them back into `App.tsx`.

### Changes

**`src/App.tsx`**:
1. Import `RequirePassword` and lazy-load `Login`
2. Add `/login` route
3. Wrap all protected routes with `<RequirePassword>`

All pages except `/login` will require the password. Password is already hardcoded as `"tektonika"` in `Login.tsx`.

