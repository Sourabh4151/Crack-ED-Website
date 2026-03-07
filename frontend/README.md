# CRACK-ED Website

A modern, component-based website for CRACK-ED company showcasing job-ready programs, statistics, testimonials, and career opportunities.

## Project Structure

```
WEBSITE_CRACK-ED/
├── src/
│   ├── assets/                 # Images and icons
│   │   ├── icon1.png, icon2.png, icon3.png, icon4.png
│   │   ├── au_bank.png, au_card_logo.png
│   │   ├── lenskart.png, lenskart_card_logo.png, lenskart_store.png
│   │   ├── crack-ed_logo.png, hero_section_image.png
│   │   └── boy_image.jpg
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx      # Navigation header component
│   │   │   └── Header.css      # Header styles
│   │   ├── Hero/
│   │   │   ├── Hero.jsx        # Hero section component
│   │   │   └── Hero.css        # Hero section styles
│   │   ├── Programs/
│   │   │   ├── Programs.jsx    # Programs carousel component
│   │   │   └── Programs.css    # Programs styles
│   │   ├── Stats/
│   │   │   ├── Stats.jsx        # Statistics cards component
│   │   │   └── Stats.css        # Stats styles with hover effects
│   │   ├── Testimonial/
│   │   │   ├── Testimonial.jsx  # Testimonial component
│   │   │   └── Testimonial.css  # Testimonial styles
│   │   ├── CareerForward/
│   │   │   ├── CareerForward.jsx # Career forward section with scroll animations
│   │   │   └── CareerForward.css # CareerForward styles
│   │   └── LogoCarousel/
│   │       ├── LogoCarousel.jsx  # Logo carousel component
│   │       └── LogoCarousel.css  # LogoCarousel styles
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

### Programs Component
- Interactive carousel showcasing job-ready programs
- Features Lenskart, Udaan, Piramal, Paytm and other programs
- Auto-advancing carousel with progress bar
- Program details with CTC information and duration
- Mini card navigation with circular wrapping
- Background images for each program

### Stats Component
- Four statistics cards displaying key metrics:
  - 12+ Programs
  - Avg CTC of Rs 3.2LPA
  - 5000+ Learners
  - 10+ Centers
- **Interactive Hover Effects:**
  - Cards fade out at the bottom before hover
  - On hover: Above text (value and description) opacity decreases
  - Hover text slides up from below (e.g., "BUILT TO SCALE", "CAREERS THAT PAY")
  - Cards lift with shadow effect
- Gradient background cards with icon containers
- Responsive grid layout (4 columns → 2 columns → 1 column)

### Testimonial Component
- Customer testimonial section
- Profile image and testimonial text
- Styled with modern design

### CareerForward Component
- Dynamic text animation based on scroll position
- Uses GSAP ScrollTrigger for smooth transitions
- Multiple variants that change based on viewport position
- "Take Quiz" call-to-action button
- Gradient text effects

### LogoCarousel Component
- Carousel displaying partner/company logos
- Smooth scrolling animation

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

## Features

- **Interactive Components**: Hover effects, animations, and transitions
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Modern UI/UX**: Gradient backgrounds, smooth animations, and clean layouts
- **Performance Optimized**: Built with Vite for fast development and production builds

## Customization

### Replace Images
- Update images in `src/assets/` directory
- Update the background image URL in `src/components/Hero/Hero.css` (`.hero-background`)
- Replace icon images in `src/assets/` (icon1.png, icon2.png, icon3.png, icon4.png)

### Update Colors
- Primary teal/cyan color: `#1A9EB7` (used in buttons, icons, hover text)
- Background gradients: `#595959` to `#3E3E3E` (stats cards)
- Text colors: `#FAFAFA` (white), `rgba(250, 250, 250, 0.7)` (70% opacity)
- Modify these values in the respective CSS files to match your brand

### Update Stats Content
- Edit stat values, descriptions, and hover text in `src/components/Stats/Stats.jsx`
- Modify icons by replacing files in `src/assets/`

### Add More Sections
- Create new components in `src/components/`
- Import and add them to `src/pages/Home.jsx`

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **GSAP (GreenSock Animation Platform)**: Advanced animations and scroll triggers
- **CSS3**: Modern features including:
  - Backdrop filters
  - CSS Grid and Flexbox
  - Gradients and transitions
  - Custom properties
- **Fonts**: 
  - Poppins (for body text and stats)
  - Montserrat (for headings and badges)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop