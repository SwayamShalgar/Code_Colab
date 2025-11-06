# Theme System Testing Guide

## Overview
The dark/light mode system is now fully implemented with the following features:
- ✅ Theme persistence using localStorage
- ✅ System preference detection
- ✅ Smooth transitions between themes
- ✅ FOUC (Flash of Unstyled Content) prevention
- ✅ Accessible theme toggle buttons

## Theme Toggle Locations

### 1. **HomePage (Login/Join Page)**
- **Location**: Top-right corner
- **Icon**: Sun (light mode) / Moon (dark mode)
- **Access**: Visible immediately on page load

### 2. **EditorPage - Settings Panel**
- **Location**: Sidebar → Settings (gear icon)
- **Icon**: Sun (light mode) / Moon (dark mode)
- **Access**: Click the settings icon in the left sidebar

## Testing Checklist

### ✅ Basic Functionality
1. [ ] Start the development server:
   ```bash
   cd client
   npm run dev
   ```

2. [ ] Open the application in your browser (usually `http://localhost:5173`)

### ✅ HomePage Theme Toggle
3. [ ] Verify theme toggle button appears in top-right corner
4. [ ] Click the toggle button
5. [ ] Verify smooth transition between light and dark modes
6. [ ] Check that all elements (background, text, buttons, cards) change colors
7. [ ] Verify no white/dark flash during theme switch

### ✅ Theme Persistence
8. [ ] Toggle to dark mode
9. [ ] Refresh the page (F5 or Ctrl+R)
10. [ ] Verify the page loads in dark mode (no flash)
11. [ ] Toggle to light mode
12. [ ] Refresh again
13. [ ] Verify the page loads in light mode

### ✅ EditorPage Theme Toggle
14. [ ] Join a room to access the editor
15. [ ] Click the Settings icon (gear) in the left sidebar
16. [ ] Verify theme toggle button appears at the top of settings
17. [ ] Toggle between light and dark modes
18. [ ] Verify all editor components respond:
    - Sidebar
    - Code editor area
    - File explorer
    - Chat panel
    - Settings panel

### ✅ System Preference Detection
19. [ ] Open browser DevTools (F12)
20. [ ] Open the Console tab
21. [ ] Run this command to simulate system dark mode:
    ```javascript
    localStorage.setItem('code-sync-theme', 'system');
    window.location.reload();
    ```
22. [ ] Change your OS theme (Windows: Settings → Personalization → Colors → Choose your mode)
23. [ ] Refresh the browser
24. [ ] Verify the app follows your OS theme

### ✅ Cross-Component Consistency
25. [ ] Toggle theme on HomePage
26. [ ] Join a room
27. [ ] Verify EditorPage loads with the same theme
28. [ ] Toggle theme in EditorPage settings
29. [ ] Leave the room and return to HomePage
30. [ ] Verify HomePage shows the new theme

### ✅ Visual Quality Checks
31. [ ] In **light mode**, verify:
    - Background is light (white/neutral-50)
    - Text is dark and readable
    - Buttons have proper contrast
    - Cards have subtle shadows
    - Borders are visible but subtle

32. [ ] In **dark mode**, verify:
    - Background is dark (neutral-900/950)
    - Text is light and readable
    - Buttons maintain good contrast
    - Cards have proper elevation
    - No harsh white elements

### ✅ Accessibility
33. [ ] Navigate to theme toggle using Tab key
34. [ ] Press Enter or Space to toggle theme
35. [ ] Verify screen reader announces theme change (if available)
36. [ ] Check that all text meets WCAG contrast requirements in both modes

### ✅ Performance
37. [ ] Toggle theme rapidly 10 times
38. [ ] Verify smooth transitions without lag
39. [ ] Check browser console for errors
40. [ ] Verify no memory leaks (DevTools → Memory)

## Common Issues & Solutions

### Issue: Theme doesn't persist after refresh
**Solution**: Check browser console for localStorage errors. Ensure cookies/storage are enabled.

### Issue: Flash of wrong theme on load
**Solution**: Verify the inline script in `client/index.html` is present before the React root div.

### Issue: Some components don't change theme
**Solution**: Check that components use Tailwind's `dark:` prefix or CSS custom properties from `global.css`.

### Issue: Toggle button doesn't appear
**Solution**: 
- HomePage: Check top-right corner
- EditorPage: Open Settings panel in sidebar
- Verify ThemeToggle component is imported correctly

## Technical Details

### Theme Storage
- **Key**: `code-sync-theme`
- **Values**: `'light'`, `'dark'`, or `'system'`
- **Default**: `'system'` (follows OS preference)

### Theme Application
- Adds class to `<html>` element: `class="light"` or `class="dark"`
- Tailwind CSS uses this class to apply theme-specific styles
- CSS custom properties in `global.css` update automatically

### Files Involved
1. `client/src/context/ThemeContext.tsx` - Theme state management
2. `client/src/components/common/ThemeToggle.tsx` - Toggle button component
3. `client/index.html` - Theme initialization script
4. `client/src/App.tsx` - ThemeProvider wrapper
5. `client/src/styles/global.css` - Theme CSS variables
6. `client/tailwind.config.ts` - Dark mode configuration

## Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## Next Steps After Testing
If all tests pass:
1. ✅ Dark/light mode is fully functional
2. ✅ Theme persists across sessions
3. ✅ System preference integration works
4. ✅ All components respond to theme changes

If issues are found:
1. Note which test failed
2. Check browser console for errors
3. Verify file changes were saved
4. Clear browser cache and localStorage
5. Restart development server

## Quick Test Commands

```powershell
# Start development server
cd client
npm run dev

# Clear localStorage (in browser console)
localStorage.clear()
location.reload()

# Check current theme (in browser console)
localStorage.getItem('code-sync-theme')
document.documentElement.classList.contains('dark')
```

---

**Status**: Theme system is fully implemented and ready for testing! 🎨
