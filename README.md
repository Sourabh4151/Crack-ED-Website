# CRACK-ED Website

A modern, component-based website for CRACK-ED company.

## Project Structure

```
WEBSITE_CRACK-ED/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx      # Navigation header component
│   │   │   └── Header.css      # Header styles
│   │   └── Hero/
│   │       ├── Hero.jsx        # Hero section component
│   │       └── Hero.css        # Hero section styles
│   ├── pages/
│   │   ├── Home.jsx            # Home page component
│   │   └── Home.css            # Home page styles
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Components

### Header Component
- Fixed navigation bar with logo
- Menu items: About Us, Programs (with dropdown), Resources, Badhta India Dekho, Careers
- Responsive design with hover effects

### Hero Component
- Large headline: "UPSKILL TODAY, CRACK THE WORLD TOMORROW"
- Sub-headline with value proposition
- "Enquire Now" call-to-action button
- Background image with overlay
- Professional image placeholder

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Customization

### Replace Images
- Update the background image URL in `src/components/Hero/Hero.css` (`.hero-background`)
- Replace the professional image placeholder in `src/components/Hero/Hero.css` (`.hero-image-placeholder::before`)

### Update Colors
- Primary teal color: `#00d4ff` and `#00a8cc`
- Modify these values in the CSS files to match your brand

### Add More Sections
- Create new components in `src/components/`
- Import and add them to `src/pages/Home.jsx`

## Technologies Used

- React 18
- Vite
- CSS3 (with modern features like backdrop-filter, gradients)
- Inter font family

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop