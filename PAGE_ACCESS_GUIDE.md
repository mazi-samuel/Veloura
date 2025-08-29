# 🔗 Veloura Website - Page Access Guide

## 🚀 How to Start Your Website

### Step 1: Start the Development Server
```bash
# Navigate to your project directory
cd "C:\Users\HP\Documents\Veloura\Veloura"

# Start the server
npm run dev
```

### Step 2: Access Your Website
Once the server starts, you'll see a message like:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

## 📱 Your Website Pages & Links

### 🏠 **Main Pages**
| Page | URL | Description |
|------|-----|-------------|
| **Homepage** | `http://localhost:3000/` | Main landing page with hero, product categories, and features |
| **Collections** | `http://localhost:3000/collections` | All product collections with filtering |
| **Shop** | `http://localhost:3000/shop` | Main shopping page |
| **About** | `http://localhost:3000/about` | Brand story and company info |
| **Quiz** | `http://localhost:3000/quiz` | Shade finder quiz |
| **Society** | `http://localhost:3000/society` | Membership and loyalty program |

### 💄 **Product Collections** (New!)
| Collection | URL | Product Type |
|------------|-----|--------------|
| **Velvet Radiance** | `http://localhost:3000/collections/velvet-radiance` | Liquid Lipsticks (Exclusive) |
| **Glossy Luxe** | `http://localhost:3000/collections/glossy-luxe` | Lip Glosses |
| **Precision Liners** | `http://localhost:3000/collections/precision-liners` | Lip Liners |
| **Repair & Therapy** | `http://localhost:3000/collections/repair-therapy` | Lip Treatments |
| **Curated Sets** | `http://localhost:3000/collections/curated-sets` | Complete Lip Sets |
| **Signature Collection** | `http://localhost:3000/collections/signature` | Classic Lipsticks |
| **Limited Edition** | `http://localhost:3000/collections/limited-edition` | Exclusive Releases |

### 🛒 **Shopping Features**
| Feature | URL | Description |
|---------|-----|-------------|
| **Collections with Filters** | `http://localhost:3000/collections?filter=lip-gloss` | Filtered by product type |
| **Featured Collections** | `http://localhost:3000/collections?filter=featured` | Only featured items |
| **Newest Products** | `http://localhost:3000/collections?filter=newest` | Latest releases |
| **Bestsellers** | `http://localhost:3000/collections?filter=bestseller` | Top-selling products |

### 👤 **User Pages**
| Page | URL | Description |
|------|-----|-------------|
| **Register** | `http://localhost:3000/register` | Create new account |
| **Login** | `http://localhost:3000/login` | User login |
| **Cart** | `http://localhost:3000/cart` | Shopping cart |
| **Checkout** | `http://localhost:3000/checkout` | Purchase process |

## 🎯 **Quick Access Links**

### To See Your New Product Range:
1. **Homepage**: `http://localhost:3000/` 
   - See the new "Luxury Lip Collection" section
   - View all 5 product categories

2. **Collections Page**: `http://localhost:3000/collections`
   - Use the filter buttons to see different product types
   - Try: "Lip Glosses", "Lip Liners", "Treatments", "Gift Sets"

3. **Specific Collections**:
   - **Velvet Radiance**: `http://localhost:3000/collections/velvet-radiance`
   - **Glossy Luxe**: `http://localhost:3000/collections/glossy-luxe`

## 🔧 **If Server Won't Start**

### Check These:
1. **Correct Directory**: Make sure you're in `C:\Users\HP\Documents\Veloura\Veloura`
2. **Dependencies**: Run `npm install` first
3. **Port Issues**: Try `npm run dev -- --port 3001` for different port

### Alternative Method:
```bash
# If npm run dev doesn't work, try:
npx next dev

# Or try different port:
npx next dev -p 3001
```

## 📞 **Quick Test**

Once your server is running:

1. **Visit**: `http://localhost:3000/`
2. **Look for**: "Luxury Lip Collection" section on homepage
3. **Click**: "Collections" in navigation
4. **Try**: Filter buttons like "Lip Glosses" or "Treatments"
5. **Explore**: Individual collection pages

## 🌐 **Navigation Menu**

Your website has these main navigation links:
- **Home** → Homepage
- **Collections** → All product collections  
- **Shop** → Shopping page
- **About** → Brand information
- **Quiz** → Shade finder
- **Society** → Membership program

---

**💡 Tip**: Bookmark `http://localhost:3000/collections` - this is where you can see all your new luxury lip products with the filtering system!
