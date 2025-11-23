# 📋 BepHue Restaurant - Development TODO List

Last Updated: 2025-11-22

---

## 🔥 High Priority (Must Have)

### Phase 1: Backend Setup & Content ⏰ Est: 1-2 hours

- [ ] **Set up Strapi CMS**

  - [x] Start backend server (`npm run dev:backend`)
  - [x] Create admin account at http://localhost:1337/admin
  - [ ] Configure all content types (see details below)
  - [ ] Set API permissions for public access

- [ ] **Create Strapi Content Types** (Content-Type Builder)

  **Step 1: Menu Item Collection** 🍜
  - [ ] Create collection type `menu-item`
  - [ ] Add field: `name` (Text, Short text, Required)
  - [ ] Add field: `description` (Rich text, Required)
  - [ ] Add field: `price` (Number, Decimal, Required)
  - [ ] Add field: `category` (Enumeration, Required) - Values: `appetizer`, `main`, `dessert`, `drink`
  - [ ] Add field: `image` (Media, Single media, Required)
  - [ ] Add field: `featured` (Boolean, default: false)
  - [ ] Save & restart

  **Step 2: Gallery Image Collection** 🖼️
  - [ ] Create collection type `gallery-image`
  - [ ] Add field: `title` (Text, Short text, Required)
  - [ ] Add field: `image` (Media, Single media, Required)
  - [ ] Add field: `category` (Enumeration, Required) - Values: `food`, `restaurant`, `event`
  - [ ] Add field: `order` (Number, Integer, default: 0)
  - [ ] Save & restart

  **Step 3: Reservation Collection** 📅
  - [ ] Create collection type `reservation`
  - [ ] Add field: `name` (Text, Short text, Required)
  - [ ] Add field: `email` (Email, Required)
  - [ ] Add field: `phone` (Text, Short text, Required)
  - [ ] Add field: `date` (Date, Required)
  - [ ] Add field: `time` (Text, Short text, Required)
  - [ ] Add field: `guests` (Number, Integer, Required)
  - [ ] Add field: `notes` (Text, Long text)
  - [ ] Add field: `status` (Enumeration, Required) - Values: `pending`, `confirmed`, `cancelled` (default: `pending`)
  - [ ] Save & restart

  **Step 4: Contact Submission Collection** 📞
  - [ ] Create collection type `contact-submission`
  - [ ] Add field: `name` (Text, Short text, Required)
  - [ ] Add field: `email` (Email, Required)
  - [ ] Add field: `phone` (Text, Short text)
  - [ ] Add field: `message` (Rich text, Required)
  - [ ] Save & restart

  **Step 5: Restaurant Info Single Type** ℹ️
  - [ ] Create single type `restaurant-info`
  - [ ] Add field: `name` (Text, Short text, Required)
  - [ ] Add field: `description` (Rich text, Required)
  - [ ] Add field: `phone` (Text, Short text, Required)
  - [ ] Add field: `email` (Email, Required)
  - [ ] Add field: `address` (Text, Long text, Required)
  - [ ] Add field: `openingHours` (JSON)
  - [ ] Add field: `socialMedia` (JSON)
  - [ ] Save & restart

- [ ] **Configure API Permissions** (Settings → Roles → Public)

  - [ ] Menu-item: Enable `find`, `findOne`
  - [ ] Gallery-image: Enable `find`, `findOne`
  - [ ] Reservation: Enable `create`
  - [ ] Contact-submission: Enable `create`
  - [ ] Restaurant-info: Enable `find`
  - [ ] Upload: Enable `upload`
  - [ ] Click Save

- [ ] **Add Sample Content** (Content Manager)

  **Menu Items** (Add 10 items minimum):
  - [ ] Bánh bèo - Steamed rice cakes - 45,000đ - appetizer
  - [ ] Nem lụi - Grilled pork skewers - 55,000đ - appetizer
  - [ ] Bún bò Huế - Spicy beef noodle soup - 65,000đ - main (featured)
  - [ ] Cơm hến - Clam rice - 50,000đ - main
  - [ ] Bánh khoái - Crispy pancake - 60,000đ - main (featured)
  - [ ] Bún thịt nướng - Grilled pork vermicelli - 55,000đ - main
  - [ ] Chè Huế - Mixed sweet soup - 35,000đ - dessert
  - [ ] Bánh ít lá gai - Glutinous rice dumplings - 40,000đ - dessert
  - [ ] Trà Huế - Traditional Hue tea - 25,000đ - drink
  - [ ] Nước mía - Sugarcane juice - 20,000đ - drink

  **Gallery Images** (Upload 8-10 images):
  - [ ] Upload food images (5-6 items) - category: food
  - [ ] Upload restaurant interior images (2-3 items) - category: restaurant
  - [ ] Upload event images (1-2 items) - category: event
  - [ ] Set order numbers (1, 2, 3, etc.)

  **Restaurant Info**:
  - [ ] Name: "BepHue"
  - [ ] Description: "Authentic Hue cuisine in the heart of Ho Chi Minh City..."
  - [ ] Phone: "+84 28 1234 5678"
  - [ ] Email: "contact@bephue.vn"
  - [ ] Address: "123 Nguyen Hue Street, District 1, HCMC"
  - [ ] Opening Hours (JSON): Add business hours for each day
  - [ ] Social Media (JSON): Add Facebook, Instagram, Zalo links

- [ ] **Test API Endpoints**
  - [ ] Test: http://localhost:1337/api/menu-items?populate=*
  - [ ] Test: http://localhost:1337/api/gallery-images?populate=*
  - [ ] Test: http://localhost:1337/api/restaurant-info?populate=*
  - [ ] Verify all JSON responses return data correctly

### Phase 2: Core Pages ⏰ Est: 3-4 hours

- [ ] **Menu Page** (`/menu`) 🍜 CRITICAL

  - [ ] Create menu page layout
  - [ ] Fetch menu items from Strapi API
  - [ ] Display items by category (tabs or sections)
  - [ ] Add category filtering
  - [ ] Show dish images, names, descriptions, prices
  - [ ] Make responsive (mobile/tablet/desktop)
  - [ ] Add "Featured" section at top

- [ ] **Gallery Page** (`/gallery`) 🖼️

  - [ ] Create gallery grid layout
  - [ ] Fetch images from Strapi
  - [ ] Add category filter (food, restaurant, event)
  - [ ] Implement image lightbox/modal
  - [ ] Add lazy loading
  - [ ] Make responsive grid

- [ ] **About Page** (`/about`) 📖

  - [ ] Restaurant story section
  - [ ] Chef/team introduction
  - [ ] Values/mission statement
  - [ ] Timeline or history
  - [ ] Images and design

- [ ] **Contact Page** (`/contact`) 📞

  - [ ] Contact form (name, email, phone, message)
  - [ ] Form validation (React Hook Form + Zod)
  - [ ] Submit to Strapi API
  - [ ] Success/error messages
  - [ ] Contact information display
  - [ ] Google Maps embed (optional)
  - [ ] Opening hours

- [ ] **Reservation Page** (`/reservation`) 📅
  - [ ] Reservation form (name, email, phone, date, time, guests, notes)
  - [ ] Form validation
  - [ ] Date/time picker
  - [ ] Guest number selector
  - [ ] Submit to Strapi API
  - [ ] Confirmation message

---

## 🎯 Medium Priority (Should Have)

### Phase 3: UI/UX Enhancements ⏰ Est: 2-3 hours

- [ ] **Create Reusable UI Components**

  - [ ] Button component (primary, secondary, outline variants)
  - [ ] Card component (menu card, gallery card)
  - [ ] Input component (text, email, tel, textarea)
  - [ ] Modal/Dialog component
  - [ ] Loading spinner component
  - [ ] Toast/notification component

- [ ] **Improve Home Page**

  - [ ] Add "Menu Preview" section (featured dishes)
  - [ ] Add "Gallery Preview" section (image grid)
  - [ ] Add "Call to Action" section (reservation CTA)
  - [ ] Add testimonials/reviews section
  - [ ] Add location/contact preview

- [ ] **Navigation & UX**
  - [ ] Add active link highlighting in navigation
  - [ ] Smooth scroll to sections
  - [ ] Page transitions (Framer Motion)
  - [ ] Loading states for all data fetching
  - [ ] Error boundaries
  - [ ] 404 page

### Phase 4: Forms & Interactivity ⏰ Est: 2 hours

- [ ] **Form Handling**

  - [ ] Implement all form validations
  - [ ] Add loading states during submission
  - [ ] Success/error toast notifications
  - [ ] Form reset after successful submission
  - [ ] Email confirmation (optional - requires email service)

- [ ] **Menu Features**

  - [ ] Search functionality
  - [ ] Sort options (price, name, popularity)
  - [ ] "Add to favorites" (client-side only)
  - [ ] Print menu option

- [ ] **Gallery Features**
  - [ ] Lightbox navigation (prev/next)
  - [ ] Zoom in/out
  - [ ] Share images (optional)
  - [ ] Download option (optional)

---

## 🌟 Low Priority (Nice to Have)

### Phase 5: Advanced Features ⏰ Est: 3-4 hours

- [ ] **Multi-language Support** 🌐

  - [ ] Vietnamese (default)
  - [ ] English translation
  - [ ] Language switcher in header
  - [ ] i18n library setup (next-intl or react-i18next)

- [ ] **SEO Optimization** 🔍

  - [ ] Add metadata to all pages
  - [ ] Open Graph tags
  - [ ] Twitter Card tags
  - [ ] Sitemap generation
  - [ ] robots.txt
  - [ ] Schema.org markup (Restaurant, Menu)

- [ ] **Performance Optimization** ⚡

  - [ ] Image optimization (already using Next.js Image)
  - [ ] Lazy loading components
  - [ ] Code splitting
  - [ ] Bundle size analysis
  - [ ] Lighthouse audit (aim for 90+ score)

- [ ] **Analytics & Tracking** 📊

  - [ ] Google Analytics 4
  - [ ] Facebook Pixel (optional)
  - [ ] Event tracking (form submissions, clicks)

- [ ] **Additional Features**
  - [ ] Newsletter signup form
  - [ ] Social media feed integration
  - [ ] Online ordering integration (third-party)
  - [ ] Table availability check
  - [ ] Admin dashboard for reservations

---

## 🐳 Deployment & DevOps

### Phase 6: Testing & Deployment ⏰ Est: 2-3 hours

- [ ] **Testing**

  - [ ] Test Docker build locally
  - [ ] Test all pages work
  - [ ] Test forms submit correctly
  - [ ] Test responsive design on all devices
  - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] Test API error handling

- [ ] **Production Preparation**

  - [ ] Replace placeholder images with real photos
  - [ ] Update all Vietnamese content
  - [ ] Generate secure secrets for production
  - [ ] Set up production database (PostgreSQL)
  - [ ] Configure production environment variables
  - [ ] Set up SSL certificates

- [ ] **Deploy Backend (Strapi)**

  - [ ] Choose hosting (Railway, DigitalOcean, AWS, etc.)
  - [ ] Deploy Strapi to production
  - [ ] Configure database
  - [ ] Upload media to cloud storage (AWS S3, Cloudinary)
  - [ ] Test API in production

- [ ] **Deploy Frontend (Next.js)**

  - [ ] Choose hosting (Vercel recommended, or Railway, AWS)
  - [ ] Deploy frontend to production
  - [ ] Configure environment variables
  - [ ] Connect to production Strapi API
  - [ ] Test website in production

- [ ] **Domain & DNS**

  - [ ] Purchase domain name (e.g., bephue.vn)
  - [ ] Configure DNS records
  - [ ] Set up SSL/HTTPS
  - [ ] Test domain works

- [ ] **Monitoring & Maintenance**
  - [ ] Set up uptime monitoring
  - [ ] Set up error tracking (Sentry, LogRocket)
  - [ ] Database backups
  - [ ] Regular security updates

---

## 🔧 Technical Debt & Improvements

### Code Quality ⏰ Est: 1-2 hours

- [ ] **Type Safety**

  - [ ] Review all TypeScript types
  - [ ] Add missing type definitions
  - [ ] Fix any `any` types
  - [ ] Enable strict mode in tsconfig

- [ ] **Code Organization**

  - [ ] Create constants file (categories, time slots, etc.)
  - [ ] Extract repeated logic into utilities
  - [ ] Create custom hooks for data fetching
  - [ ] Add JSDoc comments for complex functions

- [ ] **Testing** (Optional but recommended)

  - [ ] Set up Jest + React Testing Library
  - [ ] Unit tests for utilities
  - [ ] Component tests for forms
  - [ ] E2E tests with Playwright/Cypress

- [ ] **Documentation**
  - [ ] Add inline code comments
  - [ ] Document component props
  - [ ] Update README with setup steps
  - [ ] Create deployment guide
  - [ ] Add API documentation

---

## 📝 Content Creation

### Marketing & Assets ⏰ Est: varies (can be ongoing)

- [ ] **Photography**

  - [ ] Professional food photography (15-20 dishes)
  - [ ] Restaurant interior shots (5-10 images)
  - [ ] Team/chef photos
  - [ ] Event photos

- [ ] **Copywriting**

  - [ ] Restaurant story/about text
  - [ ] Menu item descriptions (compelling, appetizing)
  - [ ] SEO-optimized page content
  - [ ] Social media content

- [ ] **Design Assets**
  - [ ] Logo (if not already created)
  - [ ] Favicon
  - [ ] Social media images
  - [ ] Email templates

---

## 🎓 Learning & Research

### Optional Enhancements (Research needed)

- [ ] Online payment integration (Stripe, PayPal, MoMo)
- [ ] QR code menu for dine-in
- [ ] Loyalty program
- [ ] Customer reviews/ratings system
- [ ] Inventory management (advanced)
- [ ] Staff management portal

---

## ✅ Completed Tasks

- [x] Initialize Next.js frontend
- [x] Initialize Strapi backend
- [x] Set up monorepo structure
- [x] Configure Tailwind CSS with BepHue colors
- [x] Create TypeScript types
- [x] Set up API utilities
- [x] Create Header component
- [x] Create Footer component
- [x] Create Hero section
- [x] Create Features section
- [x] Create home page
- [x] Set up Docker configuration
- [x] Create Dockerfiles (frontend + backend)
- [x] Create docker-compose.yml
- [x] Create nginx configuration
- [x] Create .dockerignore files
- [x] Create .env.example
- [x] Write SETUP.md guide
- [x] Write DOCKER-DEPLOYMENT.md guide
- [x] Create project documentation

---

## 📊 Progress Tracking

**Overall Completion:** ~25% ✅✅⬜⬜

| Phase                           | Status  | Progress        |
| ------------------------------- | ------- | --------------- |
| Phase 1: Setup & Infrastructure | ✅ Done | 100%            |
| Phase 2: Backend & Content      | ⬜ Todo | 0%              |
| Phase 3: Core Pages             | ⬜ Todo | 20% (Home done) |
| Phase 4: UI/UX Enhancements     | ⬜ Todo | 0%              |
| Phase 5: Forms & Interactivity  | ⬜ Todo | 0%              |
| Phase 6: Advanced Features      | ⬜ Todo | 0%              |
| Phase 7: Testing & Deployment   | ⬜ Todo | 0%              |

---

## 🚀 Recommended Next Actions

**Start Here (in order):**

1. ✅ **Set up Strapi CMS** (Phase 1) - 30 minutes

   - Start backend, create admin, build content types

2. ✅ **Add sample data** (Phase 1) - 30 minutes

   - Add 10 menu items, 5 gallery images, restaurant info

3. ✅ **Build Menu page** (Phase 2) - 1 hour

   - Most critical feature for restaurant website

4. ✅ **Build Gallery page** (Phase 2) - 1 hour

   - Visual showcase

5. ✅ **Build Contact/Reservation forms** (Phase 2) - 1.5 hours
   - User interaction

**Then continue with:** Phase 3 (UI improvements) → Phase 4 (forms) → Phase 5 (features) → Phase 6 (deployment)

---

## 📞 Notes

- **Estimated Total Time:** 15-20 hours for core features
- **Timeline:** 2-3 weeks (working part-time)
- **Priority:** Focus on Phases 1-3 first for MVP
- **Deployment:** Can deploy after Phase 3 is complete

---

**Last Updated:** 2025-11-23
**Current Focus:** Phase 1 - Backend Setup (Content Types & Sample Data)
**Current Status:** ✅ Backend server running, ✅ Admin account created
**Next Milestone:** Complete all content types → Add sample data → Test APIs → Build Menu page
