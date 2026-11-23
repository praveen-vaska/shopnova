# ShopNova – Premium Multi-Category E-Commerce Marketplace

ShopNova is a production-grade, responsive e-commerce web platform engineered with **Next.js 14 (App Router)**, **React 18**, **Tailwind CSS**, and **Lucide Icons**. Designed to reflect commercial retail standards, ShopNova delivers an editorial shopping experience across 8 product categories, complemented by a multi-step checkout workflow and a SaaS-style administrative control center.

---

## 🎨 Visual Identity & Design System

The visual design is strictly crafted according to the reference design system specifications:

| Token | Hex Value | Application |
|---|---|---|
| **Primary** | `#171717` | Deep Charcoal – Headers, primary CTA buttons, badges |
| **Secondary** | `#F7F5F0` | Warm Ivory – Hero section, promotional backgrounds |
| **Accent** | `#C6A477` | Muted Champagne Gold – Highlighting, badges, secondary actions |
| **Accent Hover** | `#B39164` | Rich Amber Gold – Interactive states |
| **Surface** | `#F3F1ED` | Warm Gray – Card backgrounds, inputs, secondary panels |
| **Text Primary**| `#202020` | High-contrast editorial body text |
| **Text Muted**  | `#777777` | Secondary labels, timestamps, metadata |
| **Borders**     | `#E9E6E0` | Subtle clean card borders and dividers |
| **Success**     | `#23865B` | Green – Stock availability, verified badges, order confirmations |
| **Error**       | `#D94A4A` | Crimson – Discount tags, removal feedback, out of stock |

### Typography
- **Headings**: `Manrope` (Bold 800, Semibold 600, Medium 500)
- **Body**: `Inter` (Regular 400, Medium 500)

---

## 🚀 Completed Pages & Modules

### 1. Customer Storefront
1. **Homepage (`/`)**:
   - Announcement bar with discount promo code (`WELCOME10`) and dismiss action.
   - Sticky navigation bar with responsive search trigger, category dropdowns, wishlist counter, and cart badge.
   - Editorial Hero section with staggered typography, value propositions, and floating product showcase cards.
   - Category Showcase covering 6 primary divisions with hover zoom effects.
   - Trending Products grid with category filter tabs ("All", "Fashion", "Electronics", "Home", "Beauty").
   - Promotional Banner ("Something New. Something You.") with editorial imagery.
   - Brand Story Atelier section ("Shopping Should Feel Special").
   - Customer Reviews carousel featuring verified buyer testimonials and 5-star ratings.
   - Comprehensive footer with customer service, policies, and newsletter subscription.

2. **Product Catalog / Discovery (`/shop`)**:
   - Breadcrumb navigation and dynamic category headings.
   - Multi-facet sidebar filters: Categories, Brands (NovaStyle, LuxeCraft, SoundWave, etc.), Price Range slider, Customer Rating (4★+, 3★+), and In-Stock toggle.
   - Sorting options: Featured, Newest Arrivals, Price (Low to High, High to Low), Highest Rated, and Best Selling.
   - Quick Search within filtered products.
   - Active filter chips with one-click individual dismissal and "Clear All" functionality.
   - Layout switcher (3-column vs 4-column desktop display).
   - Mobile filter drawer.

3. **Product Details Page (`/product/[id]`)**:
   - Multi-angle product photo gallery with thumbnail switching and zoom.
   - Dynamic pricing with automatic discount calculation.
   - Color selection swatches with active checkmarks.
   - Size selection buttons and quantity adjuster.
   - Pincode delivery estimator validating 6-digit Indian PIN codes with simulated delivery dates.
   - Tabbed panels: Features & Highlights, Technical Specifications, Customer Reviews (with submission form), and Shipping & Returns.
   - Related products carousel.

4. **Slide-in Cart Drawer & Full Cart Page (`/cart`)**:
   - Slide-in quick drawer accessible from any page.
   - Dynamic free-shipping progress meter (threshold ₹999).
   - Real-time quantity adjustment and item removal.
   - Promo coupon validation engine (`WELCOME10`, `NOVA20`, `FREESHIP`).
   - Order price breakdown: Subtotal, Discount, Shipping, Total.

5. **Wishlist Page (`/wishlist`)**:
   - Saved items grid with immediate LocalStorage persistence.
   - "Move to Bag" and "Move All to Bag" bulk operations.
   - Clean empty state illustration.

6. **Multi-Step Checkout (`/checkout`)**:
   - Step 1: Delivery Address with required field validation.
   - Step 2: Delivery Speed (Standard Free vs Priority Air Express).
   - Step 3: Payment Options (UPI apps, Credit/Debit card simulation, Cash on Delivery).
   - Step 4: Final Order Review with item preview and grand total calculation.

7. **Order Success Confirmation (`/order-success/[id]`)**:
   - Confetti burst animation upon arrival.
   - Unique generated Order ID (e.g., `SN-89241`).
   - Itemized invoice summary, delivery address, and estimated arrival date.
   - Direct link to Order Tracking.

8. **Order Tracking Page (`/track-order`)**:
   - 6-step visual progress bar: Order Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered.
   - Live order lookup by Order ID.

9. **Customer Account Portal (`/account`)**:
   - Overview metrics: Total orders placed, wishlist count, saved addresses.
   - Order history with tracking links.
   - Saved address manager with "Add New Address" modal.
   - Editable personal profile.

10. **Authentication (`/auth`)**:
    - Sign In and Register views.
    - Password visibility toggle.
    - 1-Click Quick Demo Profiles for instant testing as a customer or store administrator.

---

### 2. Commercial Admin Dashboard (`/admin`)
- **Dashboard Overview**:
  - 4 Key KPI metrics: Total Revenue (₹12,48,320), Total Orders (1,248), Products (50), and Customers (10,482).
  - Monthly Revenue trajectory area chart.
  - Category sales distribution breakdown.
  - Low-stock inventory alert cards.
- **Product Management**:
  - Searchable, filterable catalog table.
  - "Add Product" modal with image preview and pricing controls.
  - Inline "Edit Product" and "Delete Product" capabilities.
- **Inventory Control**:
  - Live stock level adjuster with instant increment/decrement (`-1`, `+5`).
  - Low-stock and Out-of-Stock indicators.
- **Order Management**:
  - Full order directory with status filtering.
  - Order status switcher (Confirmed, Packed, Shipped, Out for Delivery, Delivered) which immediately updates customer tracking!
- **Customer CRM**:
  - Directory of registered customers with lifetime spend and order history.
- **Promotions & Coupons**:
  - Active and inactive voucher management, usage limits, and creation form.
- **Promotional Banners**:
  - Carousel banner manager with target links and status toggles.
- **Analytics & Conversion**:
  - Conversion rate (3.82%), Average Order Value (₹2,840), and Return Rate (1.4%).

---

## 🛠️ Project Structure

```
shopnova/
├── package.json               # Next.js, React, Tailwind, Lucide dependencies
├── next.config.js             # Image remote patterns for Unsplash
├── tailwind.config.js         # Design tokens, palette & fonts
├── postcss.config.js          # Tailwind & Autoprefixer configuration
├── jsconfig.json              # Path aliases (@/* -> ./src/*)
├── src/
│   ├── app/
│   │   ├── globals.css        # Global CSS, variables & custom cursor styles
│   │   ├── layout.jsx         # Root layout with ShopProvider & global UI
│   │   ├── page.jsx           # Homepage
│   │   ├── shop/page.jsx      # Product discovery & filter catalog
│   │   ├── product/[id]/      # Dynamic product detail page
│   │   ├── cart/page.jsx      # Full shopping cart page
│   │   ├── checkout/page.jsx  # Multi-step checkout flow
│   │   ├── wishlist/page.jsx  # Wishlist manager
│   │   ├── track-order/       # Order tracking timeline
│   │   ├── order-success/[id] # Order confirmation with confetti
│   │   ├── account/page.jsx   # Customer account dashboard
│   │   ├── auth/page.jsx      # Authentication & demo logins
│   │   └── admin/page.jsx     # Commercial administrative control center
│   ├── components/
│   │   ├── layout/            # AnnouncementBar, Navbar, Footer, MobileBottomNav
│   │   ├── ui/                # ProductCard, CustomCursor, SearchModal, QuickViewModal, ToastContainer
│   │   ├── home/              # HeroSection, CategoryShowcase, TrendingSection, PromoBanner, TestimonialsSection
│   │   └── cart/              # CartDrawer
│   ├── context/
│   │   └── ShopContext.jsx    # Central state: Cart, Wishlist, Orders, Products, Coupons, Auth
│   ├── data/
│   │   ├── products.js        # 50 products across 8 categories in INR ₹
│   │   ├── categories.js      # 8 marketplace categories
│   │   ├── orders.js          # 20 orders with tracking timelines
│   │   ├── coupons.js         # 8 promo coupons
│   │   ├── users.js           # Customers & admin profiles
│   │   ├── banners.js         # Promotional banners
│   │   └── reviews.js         # Verified customer reviews
│   └── utils/
│       └── format.js          # Currency (INR ₹) & date formatters
└── README.md
```

---

## 💻 Installation & Local Execution

### Prerequisites
- Node.js version 18.x or higher
- npm, yarn, or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Storefront: http://localhost:3000
# Admin Dashboard: http://localhost:3000/admin
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 💡 Backend Integration Recommendations

When ready to connect ShopNova to a production backend API:
1. **API Endpoints**: Replace mock data functions in `src/context/ShopContext.jsx` with calls to RESTful or GraphQL endpoints (`/api/products`, `/api/orders`, `/api/cart`, `/api/auth`).
2. **Authentication**: Integrate NextAuth.js or Firebase Authentication for production OAuth (Google, Apple, Phone OTP).
3. **Payment Gateways**: Connect Razorpay / Stripe Webhooks in `/checkout` to capture live payments.
4. **Database**: Store the catalog in PostgreSQL (Prisma ORM) or MongoDB.
