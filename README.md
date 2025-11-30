# 🍜 BepHue Restaurant Website

A modern, full-stack restaurant website for BepHue, featuring a Next.js frontend with TypeScript and Tailwind CSS, powered by Strapi CMS backend.

## 🎯 Project Overview

BepHue is a restaurant website showcasing authentic Hue cuisine. The site includes:

- Beautiful image-heavy landing page
- Dynamic menu system
- Photo gallery
- Contact & reservation forms
- Multi-language support (Vietnamese/English)
- Admin CMS for easy content management

**Reference Design:** Inspired by https://sushimasa.vn/

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm (comes with Node.js)
- Git

### Installation Steps

1. **Clone or download this project structure**

2. **Navigate to project directory:**

```bash
cd bephue-restaurant
```

3. **Install all dependencies (frontend + backend):**

```bash
npm run install:all
```

4. **Start development servers:**

```bash
npm run dev
```

This will start both:

- Frontend at http://localhost:3000
- Backend at http://localhost:1338

### First Time Setup

#### Strapi Admin Setup

1. Visit http://localhost:1338/admin
2. Create your admin account (first user)
3. Configure your content types (see below)

#### Frontend Environment

The `.env.local` file is already created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:1338
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Project Structure

```
bephue-restaurant/
├── frontend/                    # Next.js Frontend
│   ├── app/                    # App Router
│   │   ├── page.tsx           # Home page
│   │   ├── menu/              # Menu pages
│   │   ├── about/             # About page
│   │   ├── gallery/           # Gallery page
│   │   ├── contact/           # Contact page
│   │   └── reservation/       # Reservation page
│   ├── components/
│   │   ├── layout/            # Header, Footer, Layout
│   │   ├── sections/          # Hero, Features, etc.
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── api/               # API utilities (Strapi connection)
│   │   └── utils/             # Helper functions
│   ├── public/
│   │   └── images/            # Static images
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles
│
├── backend/                    # Strapi CMS
│   ├── src/
│   │   ├── api/               # Content type APIs
│   │   └── extensions/        # Strapi extensions
│   ├── config/                # Strapi configuration
│   └── public/                # Uploaded media files
│
├── package.json               # Root package with scripts
└── README.md                  # This file
```

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Next.js 14/15**   | React framework with App Router |
| **TypeScript**      | Type safety                     |
| **Tailwind CSS**    | Utility-first CSS framework     |
| **Framer Motion**   | Smooth animations               |
| **React Hook Form** | Form handling                   |
| **Zod**             | Schema validation               |

### Backend

| Technology     | Purpose                |
| -------------- | ---------------------- |
| **Strapi**     | Headless CMS           |
| **SQLite**     | Database (development) |
| **PostgreSQL** | Database (production)  |

## 📝 NPM Scripts

### Root Level (run from `bephue-restaurant/`)

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:frontend     # Start only frontend (port 3000)
npm run dev:backend      # Start only backend (port 1338)

# Installation
npm run install:all      # Install all dependencies

# Production Build
npm run build:frontend   # Build frontend for production
npm run build:backend    # Build backend for production

# Start Production
npm run start:frontend   # Start frontend production server
npm run start:backend    # Start backend production server
```

### Frontend Only (from `frontend/`)

```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
```

### Backend Only (from `backend/`)

```bash
npm run develop     # Development with auto-reload
npm run start       # Production server
npm run build       # Build admin panel
npm run strapi      # Strapi CLI commands
```

## 🎨 Setting Up Content in Strapi

### 1. Menu Items Collection

**Collection Name:** `menu-item`

Fields:

- `name` (Text) - Dish name
- `description` (Rich Text) - Dish description
- `price` (Number) - Price
- `category` (Enumeration) - appetizer, main, dessert, drink
- `image` (Media) - Dish photo
- `featured` (Boolean) - Show on homepage

### 2. Gallery Images Collection

**Collection Name:** `gallery-image`

Fields:

- `title` (Text) - Image title
- `image` (Media) - Photo
- `category` (Enumeration) - food, restaurant, event
- `order` (Number) - Display order

### 3. Reservations Collection

**Collection Name:** `reservation`

Fields:

- `name` (Text) - Customer name
- `email` (Email) - Customer email
- `phone` (Text) - Phone number
- `date` (Date) - Reservation date
- `time` (Time) - Reservation time
- `guests` (Number) - Number of guests
- `notes` (Text) - Special requests
- `status` (Enumeration) - pending, confirmed, cancelled

### 4. Contact Submissions Collection

**Collection Name:** `contact-submission`

Fields:

- `name` (Text)
- `email` (Email)
- `phone` (Text)
- `message` (Rich Text)
- `createdAt` (Auto-generated)

### 5. Restaurant Info (Single Type)

**Single Type Name:** `restaurant-info`

Fields:

- `name` (Text) - Restaurant name
- `description` (Rich Text) - About text
- `phone` (Text) - Contact number
- `email` (Email) - Contact email
- `address` (Text) - Physical address
- `openingHours` (JSON) - Business hours
- `socialMedia` (JSON) - Social links

## 🔧 Development Workflow

### Adding a New Page

1. Create page in `frontend/app/[page-name]/page.tsx`
2. Add navigation link in `components/layout/Header.tsx`
3. Create any necessary components in `components/`

### Adding a New Content Type in Strapi

1. Go to http://localhost:1338/admin
2. Navigate to Content-Type Builder
3. Create Collection Type or Single Type
4. Add fields
5. Save and restart backend
6. Set permissions in Settings > Roles > Public

### Working with Images

**Upload to Strapi:**

1. Go to Media Library in Strapi admin
2. Upload images
3. Use in content types

**Static Images:**
Place in `frontend/public/images/` and reference as `/images/filename.jpg`

## 🎨 Customization Guide

### Colors (Tailwind)

Edit `frontend/tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#DC2626", // Red-600 (BepHue brand)
        secondary: "#1F2937", // Gray-800
      },
    },
  },
};
```

### Fonts

Edit `frontend/app/layout.tsx`:

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
```

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project on https://vercel.com
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Strapi URL
   - `NEXT_PUBLIC_SITE_URL`: Your domain
4. Deploy!

### Backend (Railway)

1. Push code to GitHub
2. Create new project on https://railway.app
3. Connect GitHub repo, select `backend` folder
4. Add PostgreSQL database
5. Set environment variables (auto-configured)
6. Deploy!

**Alternative:** Render, Heroku, or DigitalOcean

## 🔒 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:1338
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)

Auto-generated by Strapi, includes:

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `DATABASE_*` (for production)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 1338
npx kill-port 1338
```

### Strapi Admin Won't Load

```bash
cd backend
npm run build
npm run develop
```

### Images Not Showing

1. Check Strapi Media Library
2. Verify permissions in Strapi Settings > Roles > Public
3. Check `NEXT_PUBLIC_API_URL` in `.env.local`

### TypeScript Errors

```bash
cd frontend
npm run build  # This will show all type errors
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 💬 Support

For questions or issues, contact:

- Email: dev@bephue.vn
- Phone: +84 123 456 789

---

**Built with ❤️ for BepHue Restaurant**
