# CEERION Energy Website

A React-based website prototype for CEERION Energy, showcasing an integrated ecosystem of solar generation, battery storage, and the CEERION POWER MANAGER™ (CPM).

## 🚀 Features

- **Integrated System Overview** - Solar, storage, CPM, and EV integration
- **Product Lines**
  - **H1 Home Essentials** - Residential energy solution
  - **B3 Microgrid Campus** - Commercial/campus-scale system
- **PowerShare™ Marketplace** - Peer-to-peer mobile energy sharing (coming soon)
- **Reservation System** - Q2 2026 shipping timeline
- **Monochrome Design** - Black, charcoal, and silver color palette

## 📦 Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The site will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
ceerion-energy-website/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero section component
│   │   ├── Section.jsx      # Reusable section wrapper
│   │   └── Footer.jsx       # Site footer
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── System.jsx       # Integrated system details
│   │   ├── Products.jsx     # H1 & B3 product lines
│   │   ├── PowerShare.jsx   # PowerShare™ marketplace
│   │   ├── Company.jsx      # About CEERION
│   │   └── Contact.jsx      # Contact form
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # React entry point
│   └── styles.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design System

### Color Palette
- **Black**: `#000000` - Primary background
- **Charcoal**: `#1a1a1a` - Secondary background
- **Dark Grey**: `#2d2d2d` - Borders and accents
- **Silver**: `#a8a8a8` - Secondary text
- **Light Silver**: `#d4d4d4` - Primary text
- **White**: `#ffffff` - Highlights and CTAs

### Components
- **Hero** - Large introductory sections with CTAs
- **Section** - Content blocks with optional kickers and titles
- **Cards** - Product and feature showcases
- **Grids** - 2, 3, and 4-column responsive layouts
- **Forms** - Contact and configurator interfaces

## 🧭 Navigation

- **/** - Home (landing page)
- **/system** - Integrated System overview
- **/products** - H1 & B3 product lines with configurator
- **/powershare** - PowerShare™ marketplace details
- **/company** - About CEERION Energy
- **/contact** - Contact form

## 📋 Key Features Implemented

### Home Page
- Hero with reservation CTA
- "Own Your Power" section with CPM, EV, and resilience cards
- Integrated system overview (4-part grid)
- Product line preview (H1 & B3)
- PowerShare™ teaser
- Reservation section

### Products Page
- H1 Home Essentials details
- B3 Microgrid Campus details
- Interactive configurator placeholder
- Feature lists for each product

### System Page
- CPM capabilities
- Integration benefits
- Modern energy challenges

### PowerShare™ Page
- Marketplace concept
- Benefits for hosts and drivers

## 🚢 Deployment

This project can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure in repository settings
- **Any static host**: Upload the `dist` folder after running `npm run build`

## 📝 Notes

- The configurator is a placeholder UI - ready for backend integration
- Contact form is frontend-only - add form handler or API endpoint
- All content is based on CEERION Energy specifications
- No external dependencies beyond React and React Router for maximum control

## 🔮 Future Enhancements

- Add Playwright/Cypress tests for key user flows
- Implement actual configurator logic with pricing
- Connect contact form to email service or CRM
- Add animations and transitions
- Integrate with CMS for content management
- Add product comparison tool
- Implement reservation system with backend

## 📄 License

© 2025 CEERION. All rights reserved.

---

**Built with React + Vite**
