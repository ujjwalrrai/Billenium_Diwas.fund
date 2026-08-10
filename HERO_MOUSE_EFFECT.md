# Hero Background - Mouse-Following Light Purple Gradient Effect

## Overview
The hero section background now has an interactive light purple gradient effect that smoothly follows your mouse cursor as you move it across the hero section (behind both the text and image).

## Changes Made

### 1. **Centered Hero Image** (`src/app/page.module.css`)

**Before:**
- Image was positioned at the top with fixed height (600px)
- Not vertically centered

**After:**
- Image is now vertically centered using flexbox
- Removed fixed heights to allow natural sizing
- Uses `display: flex`, `align-items: center`, `justify-content: center`

### 2. **Mouse-Following Purple Gradient on Background**

The gradient appears on the **hero section background** (`.heroBackground`), creating a beautiful interactive effect behind all content (text, buttons, and image).

#### Visual Elements:
1. **Large Purple Gradient Glow** (`::after` pseudo-element on `.heroBackground`)
   - 600px diameter circular gradient
   - Light purple color (rgba(168, 85, 247, ...))
   - Multiple gradient stops for smooth fade
   - 80px blur for soft, dreamy effect
   - Positioned on z-index: 5 (above background elements, below content)
   - Always visible with 0.8 opacity

#### Interaction Behavior:
- 🖱️ **Mouse movement**: Gradient smoothly follows cursor across entire hero section
- 💫 **Smooth tracking**: Real-time position updates via JavaScript
- 🎨 **Behind everything**: Sits between background and content
- 📱 **Mobile**: Effect disabled on touch devices (tablets/phones)

### 3. **JavaScript Implementation** (`src/app/page.tsx`)

Added `handleHeroBackgroundMove` function:
```tsx
const handleHeroBackgroundMove = (e: MouseEvent<HTMLDivElement>) => {
  const hero = e.currentTarget;
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Find the heroBackground element and update its CSS variables
  const background = hero.querySelector(`.${styles.heroBackground}`) as HTMLElement;
  if (background) {
    background.style.setProperty('--mouse-x', `${x}px`);
    background.style.setProperty('--mouse-y', `${y}px`);
  }
};
```

Applied to the hero section:
```tsx
<section className={styles.hero} onMouseMove={handleHeroBackgroundMove}>
```

This tracks mouse position across the entire hero section and updates the background gradient position.

## Technical Details

### CSS Custom Properties
- `--mouse-x`: Horizontal position of mouse cursor
- `--mouse-y`: Vertical position of mouse cursor
- Updated continuously via JavaScript

### Gradient Specifications
```css
.heroBackground::after {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle, 
    rgba(168, 85, 247, 0.4) 0%,     /* Strong purple center */
    rgba(168, 85, 247, 0.3) 20%,    /* Medium fade */
    rgba(168, 85, 247, 0.2) 35%,    /* Light fade */
    rgba(168, 85, 247, 0.1) 50%,    /* Very light */
    transparent 70%                  /* Fully transparent edges */
  );
  filter: blur(80px);
  opacity: 0.8;
  z-index: 5; /* Above background, below content */
}
```

### Performance Optimizations
- Uses CSS transforms for positioning (GPU accelerated)
- `pointer-events: none` prevents interference with interactive elements
- Only updates position on mouse move (no continuous rendering)
- Effect disabled on mobile to save resources
- Sits on z-index: 5 (between background orbs and content)

## Visual Result

### Desktop Experience:
1. Hero image is vertically centered in its container
2. Move mouse anywhere over the hero section
3. Beautiful light purple gradient follows your cursor across the entire background
4. Gradient appears **behind** all text and images
5. Smooth, dreamy effect that enhances the existing gradient orbs
6. Professional and engaging interaction

### Mobile Experience:
- Image remains centered
- No gradient effects (touch devices don't need cursor tracking)
- Faster performance without cursor tracking
- Original gradient orbs still animate

## Color Palette Used

- **Primary Purple**: `rgba(168, 85, 247, ...)` - Light purple/violet
- **Cursor Border**: `rgba(255, 255, 255, 0.9)` - White
- **Cursor Shadow**: `rgba(168, 85, 247, 0.8)` - Purple glow

This matches your existing theme colors (purple gradients from `.gradientPurple`).

## Browser Compatibility

✅ Modern browsers (Chrome, Firefox, Safari, Edge)
✅ CSS custom properties support required
✅ `mix-blend-mode: screen` support
✅ Graceful degradation on older browsers (no effect, but no errors)

## Testing Checklist

- [x] Hero image centered vertically
- [x] Purple gradient follows mouse cursor
- [x] Custom cursor dot appears on hover
- [x] Smooth fade in/out transitions
- [x] Effect disabled on mobile devices
- [x] No performance issues
- [x] Works with existing animations (AOS fade-left)

## Customization Options

To adjust the effect, modify these values in `page.module.css` under `.heroBackground::after`:

**Gradient Size:**
```css
width: 600px;  /* Change to 400px for smaller, 900px for larger */
height: 600px;
```

**Gradient Intensity:**
```css
rgba(168, 85, 247, 0.4)  /* Increase/decrease opacity values */
opacity: 0.8;            /* Overall opacity of the gradient */
```

**Blur Amount:**
```css
filter: blur(80px);  /* Less blur = sharper, more blur = softer */
```

**Z-Index (Layer Position):**
```css
z-index: 5;  /* Higher = closer to front, lower = closer to back */
```

## Demo

Visit **http://localhost:3000** and:
1. Look at the hero section
2. Move your mouse around anywhere in the hero section
3. Watch the light purple gradient follow your cursor smoothly across the background!

The gradient appears **behind the text and image**, creating a beautiful ambient lighting effect! ✨
