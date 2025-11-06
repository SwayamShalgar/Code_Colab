# 🎨 Code-Sync Design System - Quick Reference

## Colors

### Primary (Blue)
```
50  #e6f7ff  bg-primary-50
100 #bae7ff  bg-primary-100
500 #1890ff  bg-primary-500 ⭐ Main
900 #002766  bg-primary-900
```

### Success (Green)
```
500 #52c41a  bg-success-500 ⭐
```

### Warning (Amber)
```
500 #faad14  bg-warning-500 ⭐
```

### Danger (Red)
```
500 #f5222d  bg-danger-500 ⭐
```

### Neutral (Gray)
```
50  #fafafa  bg-neutral-50
100 #f5f5f5  bg-neutral-100
500 #8c8c8c  bg-neutral-500
900 #1f1f1f  bg-neutral-900
950 #141414  bg-neutral-950
```

---

## Typography

### Font Families
```css
font-sans       Inter
font-display    Space Grotesk
font-mono       JetBrains Mono
```

### Font Sizes
```
text-xs   12px
text-sm   14px
text-base 16px ⭐
text-lg   18px
text-xl   20px
text-2xl  24px
```

---

## Spacing (4px grid)

```
0    0px
1    4px
2    8px
3    12px
4    16px ⭐
6    24px
8    32px
12   48px
```

---

## Border Radius

```
rounded-sm    4px
rounded-base  6px
rounded-md    8px
rounded-lg    12px ⭐
rounded-xl    16px
rounded-full  9999px
```

---

## Shadows

```
shadow-sm    Subtle
shadow-base  Standard ⭐
shadow-md    Medium
shadow-lg    Large
shadow-glow  Blue glow
```

---

## Components Quick Syntax

### Button
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```
Variants: primary | secondary | ghost | danger | success
Sizes: sm | md | lg

### Input
```tsx
<Input
  label="Username"
  error={error}
  leftIcon={<Icon />}
/>
```

### Select
```tsx
<Select
  label="Language"
  options={['js', 'py']}
  value={lang}
/>
```

### Card
```tsx
<Card variant="elevated" padding="md">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Badge
```tsx
<Badge variant="success">
  Online
</Badge>
```

### IconButton
```tsx
<IconButton
  icon={<IoClose />}
  ariaLabel="Close"
/>
```

---

## Dark Mode

### Utility Classes
```tsx
className="bg-white dark:bg-neutral-900 
           text-neutral-900 dark:text-white"
```

### Theme Context
```tsx
const { toggleTheme, resolvedTheme } = useTheme()
```

---

## Common Patterns

### Form Field
```tsx
<Input
  label="Email"
  type="email"
  error={errors.email}
  leftIcon={<IoMailOutline />}
/>
```

### Action Buttons
```tsx
<div className="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Status Badge
```tsx
<Badge variant="success" dot>
  Active
</Badge>
```

---

## Accessibility

### Required Props
- IconButton: `ariaLabel`
- Images: `alt`
- Inputs: `label` or `aria-label`

### Focus States
All interactive elements have visible focus rings:
```
focus:ring-2 focus:ring-primary-500
```

---

## Animations

### Durations
```
duration-150  Fast
duration-200  Base ⭐
duration-300  Slow
```

### Built-in Animations
```
animate-fade-in
animate-slide-up
animate-scale-in
animate-spin
```

---

## Layout Utilities

### Flexbox
```
flex items-center justify-between gap-4
```

### Grid
```
grid grid-cols-2 gap-4
```

### Spacing
```
space-y-4  Vertical spacing
space-x-4  Horizontal spacing
```

---

## Responsive Design

### Breakpoints
```
sm:   640px   Tablet
md:   768px   Desktop
lg:   1024px  Large
xl:   1280px  Extra Large
```

### Usage
```tsx
className="flex-col md:flex-row"
```

---

## Import Shortcuts

```tsx
// UI Components
import { Button, Input, Card } from '@/components/ui'

// Theme
import { useTheme } from '@/context/ThemeContext'
import ThemeToggle from '@/components/common/ThemeToggle'

// Design Tokens
import { designTokens } from '@/styles/design-tokens'
```

---

## Common Class Combinations

### Primary Button
```
bg-primary-500 hover:bg-primary-600 text-white
rounded-lg px-4 py-2.5 shadow-sm
```

### Card
```
bg-white dark:bg-neutral-900 
border border-neutral-200 dark:border-neutral-800
rounded-xl p-6 shadow-sm
```

### Input
```
border border-neutral-300 dark:border-neutral-700
bg-white dark:bg-neutral-900
rounded-lg px-4 py-2.5
focus:ring-2 focus:ring-primary-500
```

---

## Tips

✅ Use semantic variants (primary, success, danger)
✅ Always provide ARIA labels for icon buttons
✅ Use loading states for async actions
✅ Leverage dark mode classes
✅ Follow 4px spacing grid
✅ Use consistent border radius
✅ Apply focus states to all interactive elements

---

*Quick Reference v1.0.0 - Code-Sync Design System*
