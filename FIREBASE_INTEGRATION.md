# Firebase Firestore Integration Guide

## Overview
Your portfolio is now integrated with Firebase Firestore for real-time data synchronization. All portfolio content (profile, projects, testimonials, experience) is automatically synced across devices and users.

## Architecture

### Client-Side Only
- No server backend required
- All data operations happen in the browser using Firebase SDK
- Offline persistence enabled with IndexedDB

### Data Flow
1. **On Load**: Content loads from Firestore, with localStorage as fallback
2. **Real-Time Sync**: Subscribe to document changes, updates reflect instantly
3. **On Edit**: Dashboard saves changes to Firestore and localStorage backup
4. **All Users**: See updates immediately via real-time subscription

## Key Files

### Configuration
- **`lib/firebase.ts`**: Firebase app initialization and Firestore setup
- **`lib/firestore-utils.ts`**: Utility functions for Firestore operations

### Context Updates
- **`context/content-context.tsx`**: Updated to use Firestore instead of localStorage

## How It Works

### Initialization
```typescript
// Loads content from Firestore on app startup
// If Firestore is empty, falls back to localStorage
// Subscribes to real-time updates automatically
```

### Saving Changes
```typescript
// When you edit content in the admin dashboard:
// 1. Update is saved to Firestore
// 2. localStorage is updated as backup
// 3. Real-time subscribers are notified
// 4. All users see the update immediately
```

### Real-Time Sync
```typescript
// The app subscribes to changes on a single document:
// Collection: "portfolio"
// Document: "portfolio-data"
// 
// When any user edits content:
// 1. Document is updated in Firestore
// 2. All subscribed clients receive update
// 3. UI re-renders with new data
```

## Firebase Console Structure

### Collections
```
portfolio/
├── portfolio-data (document)
    ├── hero (object)
    ├── about (object)
    ├── expertise (array)
    ├── software (array)
    ├── experience (array)
    ├── projects (array)
    ├── reviews (array)
    └── terms (object)
```

## Features

### ✅ Implemented
- Real-time data synchronization
- Offline persistence (IndexedDB)
- localStorage fallback for compatibility
- Automatic syncing on app startup
- Real-time updates across all tabs/browsers
- Error handling with fallback mechanisms

### 🔒 Security
- Firestore Security Rules required (see below)
- Public API keys are acceptable (rules protect data)
- Images stored locally in `/public` folder

## Firestore Security Rules

Add these rules to your Firestore to control access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads
    match /portfolio/{document=**} {
      allow read: if true;
      // Restrict writes to authenticated admin or specific IP
      allow write: if request.auth != null;
    }
  }
}
```

For now, you can use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING**: The above allows anyone to write. Implement proper authentication in production.

## Usage in Components

### Access Content
```typescript
import { useContent } from '@/context/content-context'

function MyComponent() {
  const { content, isSynced, error } = useContent()
  
  return (
    <>
      {error && <p>Error: {error}</p>}
      {!isSynced && <p>Syncing...</p>}
      <h1>{content.hero.name}</h1>
    </>
  )
}
```

### Update Content
```typescript
const { updateContent } = useContent()

const newContent = { ...content, hero: { ...content.hero, name: "New Name" } }
updateContent(newContent)
// Automatically saves to Firestore
```

## Migration from localStorage

Your existing localStorage data is preserved. On first load:
1. App checks Firestore for data
2. If Firestore is empty, uses localStorage
3. Subsequent saves go to both Firestore and localStorage

To migrate existing data to Firestore:
```typescript
// In browser console (admin dashboard)
const { content } = useContent()
const { updateContent } = useContent()
updateContent(content) // This saves to Firestore
```

## Troubleshooting

### Data Not Syncing
1. Check browser console for Firebase errors
2. Verify Firestore rules allow read/write
3. Check network tab - ensure requests to Firestore go through
4. Refresh page to force reload

### Slow Performance
1. Check Firestore quota usage in Firebase Console
2. Real-time listener count is usually low impact
3. Use browser DevTools to profile performance

### Offline Issues
1. IndexedDB persistence is automatic
2. Changes sync when connection restored
3. localStorage acts as additional backup

## Firebase Project Details

**Project ID**: `leon-portfolio-267d3`
**Database**: Firestore
**Region**: Default (US)
**Authentication**: None (public access for now - add rules before production)

## Next Steps (Optional Enhancements)

1. **Add Authentication**: Restrict admin dashboard edits to authenticated users
2. **Add Firebase Storage**: Store images in Firebase Storage instead of public folder
3. **Version History**: Track content changes with timestamps
4. **Automatic Backups**: Export Firestore data regularly
5. **Image Optimization**: Use Firebase Storage with image transformations

## Support

For Firebase documentation: https://firebase.google.com/docs
For Firestore guide: https://firebase.google.com/docs/firestore
