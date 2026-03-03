# Maison Elara — Premium Interior Design Studio

## Current State
New project. No existing backend or frontend code.

## Requested Changes (Diff)

### Add
- Full multi-page interior design studio website with 6 pages: Home, Portfolio, Services, Products, About, Contact
- Sticky navigation bar with logo, page links, and light/dark mode toggle
- Home page: full-screen hero, featured projects section, smooth fade/slide animations
- Portfolio page: grid gallery with project cards (image + category + title + short description), lightbox/detail modal on click
- Services page: modular service cards with icons, package descriptions, optional price ranges
- Products page: clean product cards with images and short descriptions for décor, furniture, lighting
- About page: brand story, mission/philosophy, founder and team section
- Contact page: contact form (name, email, message), business info (email, phone, address, hours)
- Light/dark mode toggle persisted in localStorage
- Fully responsive layout (mobile, tablet, desktop)
- Smooth page transitions and animations

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Select no additional Caffeine components (pure frontend showcase site)
2. Generate Motoko backend with data models for projects, services, products, team members, and contact form submissions
3. Generate high-quality AI images: hero banner, featured projects, portfolio gallery, team portraits, product shots
4. Build React frontend with:
   - App router with 6 page components
   - Shared Nav component (sticky, dark mode toggle)
   - Home: HeroSection, FeaturedProjects
   - Portfolio: ProjectGrid, ProjectLightbox/Modal
   - Services: ServiceCards with icons
   - Products: ProductGrid
   - About: BrandStory, TeamSection
   - Contact: ContactForm, BusinessInfo
   - Tailwind + OKLCH design tokens for white/black/beige/gold palette
   - framer-motion or CSS transitions for animations
   - localStorage dark mode persistence
