# DashboardNavbar - Visual Architecture

## 🎨 Component Layout

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                  DashboardNavbar                                      │
│                         (Glass Morphism: blur depth based on scroll)                 │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [📍 Dashboard > Courts]    [🔍 Search or Ctrl+K]    [⚙️]  [🔔]  [📄]  [👤 John ▼]  │
│                                                                                        │
│  ◄─────────── LEFT SECTION ──────────────►  ◄──────── RIGHT SECTION ────────────►   │
│   flex: 1 (grows)                           shrink: 0 (fixed width)                  │
│                                                                                        │
│   [hidden on mobile]      [responsive]      [sticky icons]                           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Left Section: Navigation

### Breadcrumbs (Hidden on Mobile)
```
Dashboard > Courts > Court ID
   ▲          ▲       ▲
   └─ Link    └─ Link └─ Current (not clickable)
```

**Styling**:
- Segment separator: `text-text-muted`
- Links: `text-text-secondary` → hover → `text-text-primary underline`
- Current page: `text-text-primary font-medium`

---

### Search Bar (Command Palette)
```
┌─ 🔍 Search or press Ctrl+K ────────────────────────────┐
│                                             [⌘K] Badge │
└────────────────────────────────────────────────────────┘

Focus state:
┌─ 🔍 Search or press Ctrl+K ────────────────────────────┐  ← Border: primary color
│                                                          │  ← Background: elevated
└────────────────────────────────────────────────────────┘  ← Shadow: subtle
```

**Dimensions**:
- Width: `w-64` (fixed)
- Padding: `px-4 py-2.5`
- Icon width: `w-4 h-4`

---

## 🎯 Right Section: Actions

### Settings Button
```
   [⚙️]
    │
    └─ On hover: rotate 90°, background: border-light
    └─ 0.3s smooth rotation transition
```

### Notifications
```
   [🔔]  ← With badge (red dot in top-right)
    │
    └─ On click: dropdown opens
    │
    └── Notification List (max-height: 384px, scrollable)
    │   ├─ 🔴 New Booking
    │   │  Court A has a new booking request
    │   │  5m ago
    │   │
    │   ├─ ✓ System Update
    │   │  Dashboard updated successfully
    │   │  30m ago
    │   │
    │   └─ [View all notifications]
```

**Features**:
- Badge background: `error` (red)
- Badge position: `absolute top-1 right-1`
- Badge animation: `animate-pulse`
- Dropdown width: `w-80`
- Max height: `max-h-96` (scrollable)

---

### Divider
```
│  Vertical separator line
├─ Width: `w-px`
├─ Height: `h-6`
├─ Color: `bg-border-light`
└─ Margin: `mx-2`
```

---

### User Avatar & Dropdown
```
   ┌─────────────────────────┐
   │          👤             │  ← Gradient circle (primary → primary-hover)
   │     [INITIALS]      📍  │  ← Initials in center, role dot (top-right)
   │ john_doe            │   │  ← User email (hidden on mobile)
   │ Admin              │   │  ← Role badge (color based on role)
   │         ▼           │   │  ← Chevron (rotates 180° when open)
   └─────────────────────────┘
           On click ▼

   ┌──────────────────────────────┐
   │   john@example.com      ⚫   │  ← User info header
   │   Admin                      │
   ├──────────────────────────────┤
   │ ⚙️  Settings                 │  ← Clickable menu items
   │ 👤 Profile                  │     (redirect on click + close dropdown)
   │ 🔐 Admin Panel              │     (visible only for admin role)
   ├──────────────────────────────┤
   │ [Exit icon] Sign out         │  ← Red button (error color)
   └──────────────────────────────┘
           On click ▼
        → signOut() + logout
```

**Dropdown Menu**:
- Position: `absolute right-0 mt-2`
- Width: `w-64`
- Z-index: `z-50`
- Close behavior: Click outside or click menu item

---

## 🌊 Glass Morphism Effect

### At Top of Page
```
┌─────────────────────────────────────────┐
│  Navbar (transparent, subtle blur)      │  bg: surface/40
│  backdrop-filter: blur(8px)             │  blur: sm
└─────────────────────────────────────────┘
  Content below
```

### After Scrolling
```
┌─────────────────────────────────────────┐
│  Navbar (opaque, enhanced blur)         │  bg: surface/80
│  backdrop-filter: blur(16px)            │  blur: md
│  box-shadow: smooth shadow              │  shadow: lg
└─────────────────────────────────────────┘
  Content below
```

---

## 🎨 Color State Mapping

### Notification Button
```
Default:        Hover:              Open:
text: secondary text: primary       text: primary
bg: transparent bg: border-light    bg: primary/10
                                    border: primary
```

### Avatar Button
```
Default:        Hover:              Open:
bg: transparent bg: border-light    bg: primary/10
text: secondary text: primary       text: primary
```

### Menu Items
```
Default:                            Hover:
bg: surface                         bg: border-light/50
border-b: border-light             
                                    (unread items have bg: primary/5)
```

---

## 📐 Spacing & Grid (8px system)

| Property | Value | Notes |
|----------|-------|-------|
| Navbar height | `h-16` | 64px (8 × 8) |
| Padding horizontal | `px-6` | 24px (3 × 8) |
| Gap between sections | `gap-8` | 32px (4 × 8) |
| Gap between icons | `gap-2` | 8px (1 × 8) |
| Icon size | `w-5 h-5` | 20px × 20px |
| Avatar size | `w-9 h-9` | 36px × 36px |
| Button padding | `p-2.5` | 10px (1.25 × 8) |
| Dropdown width | `w-80` | 320px (40 × 8) |

---

## 🎬 Transition Timing

```
All transitions:  duration-200  (0.2s)
Rotation:         duration-300  (0.3s)  — Settings icon hover
Dropdown animate: duration-100  — Open/close fade in/out
```

---

## 📱 Mobile Responsive Breakpoints

```
Mobile (< 640px)
┌────────────────────────────────────┐
│ 🔍 Search    ⚙️  🔔  👤 ▼          │  ← Breadcrumbs hidden
└────────────────────────────────────┘    Navbar more compact

Tablet (640px - 1024px)
┌───────────────────────────────────────────┐
│ [Breadcrumbs]  🔍 Search  ⚙️ 🔔  john ▼  │  ← User name visible
└───────────────────────────────────────────┘

Desktop (> 1024px)
┌─────────────────────────────────────────────────────────┐
│📍 Dashboard > Courts  🔍 Search  ⚙️ 🔔  john (Admin) ▼  │
└─────────────────────────────────────────────────────────┘ (Same as design)
```

---

## ♿ Accessibility Tree

```
<header role="banner">              ← Main landmark
  <div>
    <nav aria-label="Breadcrumb">   ← Navigation landmark
      <a href="...">Dashboard</a>
      <a href="...">Courts</a>
      <span>Court ID</span>         ← Current (not in taborder)
    </nav>
    
    <input 
      type="search" 
      aria-label="Search across dashboard"
      placeholder="Search or press Ctrl+K"
    />
    
    <button 
      aria-label="Settings"
      aria-controls="settings-menu"
    >⚙️</button>
    
    <button 
      aria-label="Notifications"
      aria-pressed="false"
      aria-controls="notification-dropdown"
    >🔔</button>
    
    <button 
      aria-label="User menu"
      aria-expanded="false"
      aria-controls="user-dropdown"
    >👤</button>
  </div>
</header>
```

---

## 🧪 Interactive States

### Hover + Focus States
```
┌─ Button ────────────────┐
│ Default: Transparent    │
│ Hover:   bg-border-light│  ← Subtle background fade
│ Focus:   ring-2 primary │  ← Keyboard focus ring
│ Active:  bg-primary/20  │  ← While dropdown open
└─────────────────────────┘
```

### Search Bar Focus
```
┌─────────────────────────────────┐
│ Default:                        │
│ Border: border-light            │
│ Background: surface             │
│                                 │
├─ FOCUS:                         │
│ Border: border-primary          │ ← Color change
│ Background: surface-elevated    │ ← Elevated background
│ Shadow: shadow-lg               │ ← Added shadow (lift effect)
└─────────────────────────────────┘
```

---

## 🔄 Component Communication Flow

```
Parent: DashboardShell
    │
    └─► DashboardNavbar (client component)
        │
        ├─► NavbarBreadcrumbs
        │   └─ usePathname() from Next.js
        │
        ├─► SearchCommandPalette
        │   ├─ useState (isFocused)
        │   └─ (Ready for: command palette integration)
        │
        ├─► NavbarNotification
        │   └─ useState (isOpen)
        │       ├─ Sample data (future: API)
        │       └─ formatTime utility
        │
        ├─► Settings Button
        │   └─ Navigation link (future)
        │
        └─► NavbarAvatar
            ├─ useAuth() hook
            │  ├─ user: User
            │  ├─ role: string
            │  └─ signOut: () => Promise<void>
            │
            ├─ useState (isOpen)
            ├─ useRef (dropdownRef)
            ├─ useEffect (click-outside detection)
            └─ Dynamic role-based menu items
```

---

## 📊 Component Complexity

| Component | Lines | Complexity | State | Effects |
|-----------|-------|-----------|-------|---------|
| DashboardNavbar | ~85 | Medium | 1 | 1 (scroll) |
| SearchCommandPalette | ~65 | Low | 1 | 0 |
| NavbarNotification | ~120 | Medium | 1 | 0 |
| NavbarAvatar | ~180 | Medium-High | 1 | 1 (click-outside) |
| NavbarBreadcrumbs | ~50 | Low | 0 | 0 |
| **TOTAL** | **~500** | **Low-Medium** | **4** | **2** |

---

## 🚀 Quick Start

```tsx
// Already integrated in DashboardShell
<DashboardShell>
  <div>Dashboard content here</div>
</DashboardShell>

// The navbar appears automatically at the top
// No additional setup needed!
```

All components use:
- ✅ Tailwind CSS (no external CSS files)
- ✅ React hooks only (no Redux, Context)
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile-first)
- ✅ Accessibility (ARIA labels, semantic HTML)
- ✅ Modern SaaS styling (glass morphism, smooth transitions)
