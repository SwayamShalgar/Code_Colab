# Code-Sync Design System Migration Guide

## Overview
This guide helps developers understand the new design system and how to use the updated components in Code-Sync.

---

## 📦 Installation & Setup

### 1. No Additional Dependencies Required
All new UI components use existing dependencies. The redesign leverages:
- Tailwind CSS (already installed)
- classnames (already installed)
- React 18+ (already installed)

### 2. Import Paths
All new reusable components are available from:
```typescript
import { Button, Input, Select, Card, Badge, IconButton } from '@/components/ui'
```

---

## 🎨 Using the New Design System

### Theme System

#### Using Theme Context
```typescript
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
    
    // Current theme: 'light' | 'dark' | 'system'
    console.log(theme)
    
    // Actual rendered theme: 'light' | 'dark'
    console.log(resolvedTheme)
    
    // Change theme
    setTheme('dark') // or 'light' or 'system'
    
    // Toggle between light and dark
    toggleTheme()
}
```

#### Theme Toggle Component
```typescript
import ThemeToggle from '@/components/common/ThemeToggle'

<ThemeToggle />
```

---

## 🧩 Component Usage

### Button Component

```typescript
import { Button } from '@/components/ui'
import { IoSaveOutline } from 'react-icons/io5'

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
    Save Changes
</Button>

// Button with icon
<Button 
    variant="secondary" 
    leftIcon={<IoSaveOutline />}
>
    Save
</Button>

// Loading state
<Button 
    variant="primary" 
    isLoading={isSubmitting}
    disabled={isSubmitting}
>
    Submit
</Button>

// Full width button
<Button variant="primary" isFullWidth>
    Continue
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `isFullWidth`: boolean
- `leftIcon`, `rightIcon`: ReactNode

---

### Input Component

```typescript
import { Input } from '@/components/ui'
import { IoPersonOutline } from 'react-icons/io5'

// Basic input with label
<Input
    label="Username"
    placeholder="Enter username"
    value={username}
    onChange={handleChange}
/>

// Input with icon and error
<Input
    label="Email"
    type="email"
    leftIcon={<IoMailOutline />}
    error={errors.email}
    value={email}
    onChange={handleChange}
/>

// Input with helper text
<Input
    label="Password"
    type="password"
    helperText="Must be at least 8 characters"
    value={password}
    onChange={handleChange}
/>
```

**Props:**
- `label`: string
- `error`: string (shows error message)
- `helperText`: string (shows helper text)
- `leftIcon`, `rightIcon`: ReactNode
- `inputSize`: 'sm' | 'md' | 'lg'
- `isFullWidth`: boolean

---

### Select Component

```typescript
import { Select } from '@/components/ui'

// With string options
<Select
    label="Language"
    options={['javascript', 'python', 'java']}
    value={language}
    onChange={handleChange}
/>

// With option objects
<Select
    label="Country"
    options={[
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' }
    ]}
    value={country}
    onChange={handleChange}
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `options`: string[] | SelectOption[]
- `selectSize`: 'sm' | 'md' | 'lg'

---

### Card Component

```typescript
import { Card } from '@/components/ui'

// Basic card
<Card variant="default" padding="md">
    <p>Card content</p>
</Card>

// Card with sections
<Card variant="elevated">
    <Card.Header>
        <h2>Card Title</h2>
    </Card.Header>
    <Card.Body>
        <p>Card content goes here</p>
    </Card.Body>
    <Card.Footer>
        <Button>Action</Button>
    </Card.Footer>
</Card>

// Hoverable card
<Card variant="default" hoverable>
    <p>Hover me!</p>
</Card>

// Glass morphism effect
<Card variant="glass">
    <p>Glass effect card</p>
</Card>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated' | 'glass'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean

---

### Badge Component

```typescript
import { Badge } from '@/components/ui'

// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>

// With dot indicator
<Badge variant="primary" dot>Online</Badge>

// Removable badge
<Badge 
    variant="secondary" 
    removable 
    onRemove={handleRemove}
>
    Tag
</Badge>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean
- `removable`: boolean
- `onRemove`: () => void

---

### IconButton Component

```typescript
import { IconButton } from '@/components/ui'
import { IoSettingsOutline } from 'react-icons/io5'

<IconButton
    variant="default"
    size="md"
    icon={<IoSettingsOutline size={20} />}
    ariaLabel="Settings"
    onClick={handleClick}
/>

// Active state
<IconButton
    variant="primary"
    icon={<IoHomeOutline size={20} />}
    isActive={isActive}
    ariaLabel="Home"
/>
```

**Props:**
- `variant`: 'default' | 'primary' | 'ghost' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: ReactNode (required)
- `isActive`: boolean
- `ariaLabel`: string (required for accessibility)

---

## 🎨 Using Design Tokens

### In Tailwind Classes
```typescript
// Colors
<div className="bg-primary-500 text-white">Primary</div>
<div className="bg-success-100 text-success-700">Success</div>

// Spacing
<div className="p-4 gap-3">Content</div>

// Border Radius
<div className="rounded-lg">Rounded</div>

// Shadows
<div className="shadow-md hover:shadow-lg">Elevated</div>
```

### Dark Mode Classes
```typescript
// Automatically switches based on theme
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
    Content
</div>
```

### Utility Classes
```typescript
// From global.css
<h1 className="view-title">Section Title</h1>
<h2 className="section-title">Subsection</h2>

<Button className="btn-primary">Primary Button</Button>
<input className="input-field" />
<div className="card">Card Content</div>
```

---

## 🎯 Common Patterns

### Form with Validation
```typescript
function MyForm() {
    const [values, setValues] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' })

    return (
        <Card variant="elevated" padding="lg">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <Button 
                        type="submit" 
                        variant="primary" 
                        isFullWidth
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}
```

### Settings Panel
```typescript
function SettingsPanel() {
    return (
        <div className="space-y-4">
            <Card variant="default" padding="md">
                <h2 className="section-title">Display</h2>
                <div className="space-y-3">
                    <Select
                        label="Theme"
                        options={['light', 'dark', 'system']}
                        value={theme}
                        onChange={handleThemeChange}
                    />
                    <Select
                        label="Language"
                        options={languages}
                        value={language}
                        onChange={handleLanguageChange}
                    />
                </div>
            </Card>
        </div>
    )
}
```

### User List
```typescript
function UserList({ users }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {users.map(user => (
                <Card key={user.id} variant="default" hoverable>
                    <div className="flex items-center gap-3">
                        <Avatar name={user.name} />
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <Badge variant={user.online ? 'success' : 'neutral'}>
                                {user.online ? 'Online' : 'Offline'}
                            </Badge>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
```

---

## 🔄 Migration Examples

### Before (Old Design)
```typescript
<button className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black">
    Join
</button>
```

### After (New Design)
```typescript
<Button variant="primary" size="lg" isFullWidth>
    Join
</Button>
```

---

### Before (Old Design)
```typescript
<input
    type="text"
    placeholder="Username"
    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3"
    value={username}
    onChange={handleChange}
/>
```

### After (New Design)
```typescript
<Input
    label="Username"
    placeholder="Enter username"
    value={username}
    onChange={handleChange}
    leftIcon={<IoPersonOutline size={20} />}
/>
```

---

## 🎨 Color System Reference

### Primary Colors
- `primary-50` to `primary-900`: Blue shades
- Default: `primary-500` (#1890ff)

### Semantic Colors
- **Success**: `success-500` (#52c41a) - Green
- **Warning**: `warning-500` (#faad14) - Amber
- **Danger/Error**: `danger-500` (#f5222d) - Red
- **Info**: `info-500` (#1890ff) - Blue

### Neutral Colors
- `neutral-50` to `neutral-950`: Grays
- Use for backgrounds, text, and borders

---

## ♿ Accessibility Features

All new components include:
- **ARIA labels**: Proper labeling for screen readers
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Visible focus states
- **Error announcements**: Screen reader announcements for errors
- **Color contrast**: WCAG AA compliant contrast ratios

---

## 🚀 Best Practices

1. **Always use semantic variants**
   ```typescript
   // Good
   <Button variant="danger">Delete</Button>
   
   // Avoid
   <Button className="bg-red-500">Delete</Button>
   ```

2. **Provide ARIA labels for icon-only buttons**
   ```typescript
   <IconButton 
       icon={<IoClose />} 
       ariaLabel="Close dialog"  // Required!
   />
   ```

3. **Use proper error handling**
   ```typescript
   <Input
       label="Email"
       error={errors.email}  // Show validation errors
       value={email}
   />
   ```

4. **Leverage dark mode classes**
   ```typescript
   <div className="bg-white dark:bg-neutral-900">
       {/* Content adapts to theme */}
   </div>
   ```

5. **Use loading states**
   ```typescript
   <Button isLoading={isSubmitting} disabled={isSubmitting}>
       Submit
   </Button>
   ```

---

## 🐛 Troubleshooting

### Dark mode not working?
Ensure ThemeProvider wraps your app:
```typescript
// In App.tsx
<ThemeProvider>
    <YourApp />
</ThemeProvider>
```

### Styles not applying?
Check that Tailwind is properly configured and the path is correct in `tailwind.config.ts`:
```typescript
content: ["./src/**/*.{jsx,tsx}", "./*.html"]
```

### TypeScript errors?
Make sure you're importing types:
```typescript
import { Button, type ButtonProps } from '@/components/ui'
```

---

## 📚 Additional Resources

- **Design Tokens**: `src/styles/design-tokens.ts`
- **Global Styles**: `src/styles/global.css`
- **Tailwind Config**: `tailwind.config.ts`
- **Component Examples**: See individual component files in `src/components/ui/`

---

## 🎉 Summary

The new design system provides:
- ✅ Consistent, modern UI components
- ✅ Full dark mode support
- ✅ Accessibility built-in
- ✅ TypeScript types
- ✅ Easy to use and extend

Happy coding! 🚀
