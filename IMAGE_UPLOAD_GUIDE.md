# Image Upload Feature Implementation

## Overview
Added lightweight image upload functionality to the admin dashboard, allowing direct image uploads that are stored locally in the public folder for persistence across builds and deployments.

## Features Added

### 1. Image Upload API (`app/api/upload/route.ts`)
- Accepts multipart form data with image files
- Validates file type (must be image)
- Validates file size (max 5MB)
- Stores files in `/public/uploads/{category}/` directory
- Returns local path for immediate use
- Categories: `hero`, `projects`

### 2. Image Upload Component (`components/image-upload.tsx`)
- Reusable upload button with visual feedback
- Shows upload status (loading, success, error)
- Displays image preview
- Indicates whether image is locally uploaded or external URL
- Integrates seamlessly with existing form fields

### 3. Admin Dashboard Updates
- **Hero Section**: Upload profile picture with fallback URL input
- **Projects Section**: Upload project thumbnails with fallback URL input
- Both sections maintain compatibility with external URLs

## How to Use

1. Go to `/admin` (requires password: `Sianai4life@123`)
2. Navigate to desired section (Hero or Projects)
3. Click "Choose Image" button to upload
4. Image is automatically saved to `/public/uploads/{category}/`
5. Path is updated in the form and saved to storage
6. Changes reflect instantly on live portfolio

## File Structure
```
public/
├── uploads/
│   ├── hero/          (Profile images)
│   └── projects/      (Project thumbnails)
└── other files...
```

## Benefits
- **Lightweight**: No heavy CMS system
- **Persistent**: Images stored locally in public folder
- **Instant**: Changes appear immediately on live site
- **Flexible**: Supports both uploaded and external URL images
- **Deployable**: Works seamlessly with Vercel deployments

## Technical Details
- Uses Next.js 16 API routes for upload
- Files stored with timestamp + random hash for uniqueness
- 5MB file size limit enforced server-side
- Image type validation (MIME type check)
- Supports JPG, PNG, GIF, WebP, and other image formats

## Notes
- Upload directory is created automatically
- Files are served via Next.js static file serving
- Compatible with all image formats that browsers support
- No additional dependencies required
