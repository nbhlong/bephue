# BepHue Restaurant - Setup Guide

This guide will walk you through setting up and running the BepHue restaurant website.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify installations:

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

## 🚀 Quick Start

### 1. Install Dependencies

From the project root directory:

```bash
npm run install:all
```

This will install dependencies for:

- Root package (monorepo scripts)
- Frontend (Next.js)
- Backend (Strapi)

### 2. Start Development Servers

**Start both frontend and backend together:**

```bash
npm run dev
```

**OR start them separately:**

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

### 3. Access the Applications

- **Frontend:** http://localhost:3000
- **Backend Admin:** http://localhost:1337/admin

## 🔧 First-Time Backend Setup

### Create Strapi Admin Account

1. Visit http://localhost:1337/admin
2. Fill in the admin registration form:
   - First Name
   - Last Name
   - Email
   - Password (minimum 8 characters)
3. Click "Let's start"

### Configure Content Types

After creating your admin account, you need to set up the content types for the CMS.

#### 1. Menu Items Collection

1. Go to **Content-Type Builder** → **Create new collection type**
2. Display name: `menu-item`
3. Add fields:
   - `name` (Text - Short text)
   - `description` (Rich text)
   - `price` (Number - Decimal)
   - `category` (Enumeration: appetizer, main, dessert, drink)
   - `image` (Media - Single media)
   - `featured` (Boolean)
4. **Save** and **Restart** server when prompted

#### 2. Gallery Images Collection

1. Create new collection type: `gallery-image`
2. Add fields:
   - `title` (Text)
   - `image` (Media - Single media)
   - `category` (Enumeration: food, restaurant, event)
   - `order` (Number - Integer)
3. **Save** and **Restart**

#### 3. Reservations Collection

1. Create new collection type: `reservation`
2. Add fields:
   - `name` (Text)
   - `email` (Email)
   - `phone` (Text)
   - `date` (Date)
   - `time` (Time)
   - `guests` (Number - Integer)
   - `notes` (Text - Long text)
   - `status` (Enumeration: pending, confirmed, cancelled)
3. **Save** and **Restart**

#### 4. Contact Submissions Collection

1. Create new collection type: `contact-submission`
2. Add fields:
   - `name` (Text)
   - `email` (Email)
   - `phone` (Text)
   - `message` (Rich text)
3. **Save** and **Restart**

#### 5. Restaurant Info (Single Type)

1. Go to **Content-Type Builder** → **Create new single type**
2. Display name: `restaurant-info`
3. Add fields:
   - `name` (Text)
   - `description` (Rich text)
   - `phone` (Text)
   - `email` (Email)
   - `address` (Text - Long text)
   - `openingHours` (JSON)
   - `socialMedia` (JSON)
4. **Save** and **Restart**

### Set API Permissions

After creating content types, you must set permissions to allow the frontend to access them:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. For each content type (menu-item, gallery-image, reservation, contact-submission, restaurant-info):
   - Check **find** (read all)
   - Check **findOne** (read one)
   - For reservations and contact-submissions, also check **create** (submit forms)
3. **Save**

## 📝 Adding Sample Content

### Add Menu Items

1. Go to **Content Manager** → **Menu items** → **Create new entry**
2. Fill in:
   - Name: "Bún bò Huế"
   - Description: "Traditional spicy beef noodle soup"
   - Price: 85000
   - Category: main
   - Upload an image
   - Featured: Yes
3. **Save** and **Publish**

Repeat for more menu items.

### Add Gallery Images

1. Go to **Content Manager** → **Gallery images** → **Create new entry**
2. Fill in title, upload image, select category, set order
3. **Save** and **Publish**

### Add Restaurant Info

1. Go to **Content Manager** → **Restaurant info**
2. Fill in all fields
3. For JSON fields, use this format:

**openingHours:**

```json
{
  "monday": { "open": "10:00", "close": "22:00" },
  "tuesday": { "open": "10:00", "close": "22:00" },
  "wednesday": { "open": "10:00", "close": "22:00" },
  "thursday": { "open": "10:00", "close": "22:00" },
  "friday": { "open": "10:00", "close": "22:00" },
  "saturday": { "open": "09:00", "close": "23:00" },
  "sunday": { "open": "09:00", "close": "23:00" }
}
```

**socialMedia:**

```json
{
  "facebook": "https://facebook.com/bephue",
  "instagram": "https://instagram.com/bephue",
  "youtube": "https://youtube.com/@bephue"
}
```

4. **Save** and **Publish**

## 🎨 Customizing the Frontend

### Update Images

The site currently uses Unsplash placeholder images. To use your own:

1. Add images to `frontend/public/images/`
2. Update image URLs in:
   - `frontend/components/sections/Hero.tsx`
   - `frontend/components/sections/Features.tsx`
3. Or upload to Strapi Media Library and fetch via API

### Update Colors

Edit `frontend/app/globals.css`:

```css
@theme inline {
  --color-primary: #dc2626; /* Change this */
  --color-primary-hover: #ef4444; /* And this */
  --color-secondary: #1f2937;
}
```

### Update Content

- **Navigation:** `frontend/components/layout/Header.tsx`
- **Footer:** `frontend/components/layout/Footer.tsx`
- **Hero text:** `frontend/components/sections/Hero.tsx`
- **Features:** `frontend/components/sections/Features.tsx`

## 🛠️ Development Commands

### Root Level

```bash
npm run dev              # Start both servers
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend
```

### Frontend Only

```bash
cd frontend
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run linter
```

### Backend Only

```bash
cd backend
npm run develop   # Development with auto-reload
npm run start     # Production server
npm run build     # Build admin panel
```

## 🐛 Troubleshooting

### Port Already in Use

If ports 3000 or 1337 are in use:

**Windows:**

```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 1337
npx kill-port 1337
```

**Mac/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:1337 | xargs kill -9
```

### Strapi Won't Start

```bash
cd backend
npm run build
npm run develop
```

### Frontend Build Errors

```bash
cd frontend
rm -rf .next
npm install
npm run dev
```

### Images Not Loading

1. Check `frontend/next.config.ts` - ensure image domains are allowed
2. For Unsplash images, no configuration needed
3. For Strapi images, ensure backend is running
4. Check browser console for errors

## 📚 Next Steps

1. ✅ Complete Strapi content type setup
2. ✅ Add sample menu items
3. ✅ Upload gallery images
4. ✅ Configure restaurant info
5. ✅ Test the website at http://localhost:3000
6. 🔲 Create additional pages (Menu, About, Gallery, Contact, Reservation)
7. 🔲 Implement form submissions
8. 🔲 Add Vietnamese/English language toggle
9. 🔲 Optimize images
10. 🔲 Deploy to production

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🆘 Need Help?

- Check `README.md` for project overview
- Check `CLAUDE.md` for development context
- Review component code in `frontend/components/`
- Check Strapi logs in terminal for backend issues
- Check browser console for frontend errors

---

**Happy coding! 🍜**
