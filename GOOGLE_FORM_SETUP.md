# Google Form Integration

## Overview
All application/nomination buttons now open a Google Form in a new tab.

## Updated Buttons

### 1. Header Navigation - "Nominate Now"
- **Location**: Top navigation bar (desktop and mobile)
- **File**: `src/components/Header.tsx`
- **Action**: Opens Google Form in new tab

### 2. Homepage Hero - "Apply for Funding"
- **Location**: Hero section (main CTA)
- **File**: `src/app/page.tsx`
- **Action**: Opens Google Form in new tab

### 3. Homepage Investment Focus - "Submit Your Pitch"
- **Location**: Investment Focus section (bottom CTA)
- **File**: `src/app/page.tsx`
- **Action**: Opens Google Form in new tab

## Configuration

### Environment Variable
Add your Google Form URL to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-url-here
```

### How to Update
1. Open `.env.local` file
2. Replace `https://forms.google.com/your-form-url-here` with your actual Google Form URL
3. Restart the dev server: `npm run dev`

## Technical Details

- All buttons use `target="_blank"` to open in new tab
- All buttons include `rel="noopener noreferrer"` for security
- Fallback URL is `https://forms.google.com/` if env variable is not set
- Changed from `<Link>` to `<a>` tags for external navigation

## Testing

After adding your Google Form URL:
1. Click "Nominate Now" in header → Should open Google Form
2. Click "Apply for Funding" in hero → Should open Google Form
3. Click "Submit Your Pitch" in focus section → Should open Google Form

All three should open the same Google Form in a new browser tab.
