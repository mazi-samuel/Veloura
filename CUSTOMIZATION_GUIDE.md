# 🎨 Veloura Customization Guide (Beginner-Friendly)

## 📝 How to Edit Text Content

### Collections Page Text
**File:** `src/app/collections/page.tsx`
**Look for:** Lines 10-80 (the `collections` array)

**Example - Changing a collection:**
```typescript
{
  id: 'my-collection',           // Keep this simple, no spaces
  name: 'Your Collection Name',  // This shows on the website
  description: 'Your description here',
  image: '/collections/your-image.jpg',
  products: 5,                   // Number of products
  featured: true,                // true = shows first, false = normal
  season: 'Spring 2024',         // Any text you want
  tags: ['new', 'bestseller'],   // Categories for filtering
  launchDate: '2024-08-29',      // Date format: YYYY-MM-DD
}
```

### Home Page Text
**File:** `src/app/page.tsx`
**Look for:** Text inside quotes like:
- `"Welcome to Veloura"` → Your custom title
- `"Discover your perfect shade"` → Your custom subtitle

### About Page Text
**File:** `src/app/about/page.tsx`
**Look for:** Similar text patterns in quotes

## 🖼️ How to Change Images

### Step 1: Prepare Your Images
- **Format:** JPG or PNG
- **Size:** 800x600 pixels or larger
- **Names:** Use simple names like `red-lipstick.jpg` (no spaces, use dashes)

### Step 2: Add Images to Folders
```
public/
  collections/          ← Collection cover images
    spring-collection.jpg
    summer-vibes.jpg
  products/            ← Individual product images
    red-lipstick.jpg
    pink-gloss.jpg
```

### Step 3: Update Image Paths
Change the `image:` line to match your filename:
```typescript
// Before:
image: '/collections/velvet-radiance.jpg',

// After:
image: '/collections/spring-collection.jpg',
```

## 🚀 Quick Changes You Can Make Right Now

### 1. Change Collection Name
In `src/app/collections/page.tsx`, find:
```typescript
name: 'Velvet Radiance',
```
Change to:
```typescript
name: 'Your Collection Name',
```

### 2. Change Collection Description
Find:
```typescript
description: 'Where velvet meets radiance...',
```
Change to:
```typescript
description: 'Your custom description here',
```

### 3. Change Season/Category
Find:
```typescript
season: 'Exclusive',
```
Change to:
```typescript
season: 'Spring 2024',
```

## ⚠️ Important Rules

1. **Keep quotes:** Always keep text in quotes `"like this"`
2. **Keep commas:** Don't forget commas after each line `,`
3. **No spaces in IDs:** Use `my-collection` not `my collection`
4. **Case matters:** `Featured` is different from `featured`
5. **Save file:** Always save after making changes

## 🔧 Testing Your Changes

1. Save the file
2. The website will automatically update (if dev server is running)
3. Refresh your browser to see changes
4. If something breaks, undo your last change

## 📞 When You Need Help

If you see errors, check:
1. Did you keep all the quotes?
2. Did you keep all the commas?
3. Are your image files in the right folders?
4. Did you spell the filename exactly right?

Remember: You can always undo changes by pressing Ctrl+Z!
