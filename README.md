# Professional B.Tech CSE Portfolio Website

A premium, high-performance, and visually stunning single-page portfolio website tailored for a B.Tech Computer Science & Engineering student. 

## Features
- **Modern Glassmorphism Aesthetic**: Beautiful gradients, backdrop blurs, and glow effects.
- **Light/Dark Theme Switch**: Complete dual color palettes with persistent local storage.
- **Responsive Layout**: Designed mobile-first, ensuring pixel-perfect display from mobile to 4K displays.
- **Dynamic Interactivity**: Custom typewriter typing effect, live category project filtering, and interactive timeline.
- **Micro-Animations**: Scroll-reveal animations using modern `IntersectionObserver` API.
- **Interactive Form Validation**: Client-side validation with dynamic status messages and simulated asynchronous network submission loaders.
- **SEO & Performance Optimized**: Optimized title/meta tags, single `<h1>` tag structure, and zero heavy external fonts/icons dependencies (relying on lightweight inline SVGs).

## File Structure
- `index.html` - Core layout, SEO configuration, content, and inline SVGs.
- `style.css` - Custom design token variables, dark/light themes, animations, styling, responsive rules.
- `script.js` - Client-side state behavior (typewriter, filter cards, scroll triggers, form submissions).
- `package.json` - Integration for modern Vite bundlers/dev servers.

## Getting Started

### 1. Simple Double-Click (No setup required)
You can open `index.html` directly in any web browser to view the portfolio.

### 2. Live Development Server (Recommended)
If you have [Node.js](https://nodejs.org/) installed:
1. Open your terminal in this directory.
2. Install the lightweight development dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local address (e.g., `http://localhost:5173`) in your browser.

## Customization Guide
- **Personal Information**: Open [index.html](file:///c:/Users/SRUTHI/Desktop/portfolio/index.html) and search for the name `"Aarav Sharma"`. Replace it and the biographical text with your details.
- **Academic Scores**: Edit the CGPA score or school percentages in the `#about` section in the HTML file.
- **Profile Image**: The hero section currently features a clean vector graphic. To use a real picture of yourself, place your photo inside the directory (e.g. `profile.jpg`), and replace the `<svg class="hero-art-avatar" ...>...</svg>` block inside `index.html` with a standard image tag:
  ```html
  <img src="profile.jpg" alt="Your Name" class="hero-art-avatar">
  ```
- **Resume Download**: Place your PDF resume inside this folder (e.g., `resume.pdf`) and update the link `id="download-cv"` in the HTML:
  ```html
  <a href="resume.pdf" download class="btn btn-secondary">
  ```

## Deployment
You can deploy this portfolio for free in under 2 minutes:
- **GitHub Pages**: Create a repository, push your files, and enable GitHub Pages under settings.
- **Vercel / Netlify**: Connect your GitHub repository directly for auto-build and continuous deployment.
