# Portfolio Project - 1:1 Replica

This project is a pixel-perfect, 1:1 replica of the portfolio website: `https://abdulbasit-005.vercel.app/`.

## Features

- **1:1 Visual Match**: Exact colors (`#050505` background, `#ef4444` accent), typography, and spacing.
- **GSAP & Framer Motion Animations**: Smooth scroll-based animations and entry effects.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Modern Tech Stack**: Next.js, Tailwind CSS, Lucide React, and GSAP.
- **Glassmorphism UI**: Premium card designs with subtle glows and gradients.

## Tech Stack

- **Frontend**: React (Next.js), Tailwind CSS
- **Animation**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**:

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Run the development server**:
   From the root or `client` directory:
   ```bash
   npm run dev
   ```

## Project Structure

```text
portfolio/
├── client/              # Frontend (React + Next.js)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── sections/    # Main website sections (Hero, About, etc.)
│   │   ├── gsap-setup.js # GSAP configuration
│   │   └── data.js      # Site content and metadata
├── server/              # Backend (Express for Contact Form)
└── README.md            # You are here
```

## Deployment

To deploy the website:

1. Build the frontend: `npm run build`
2. Host on platforms like Vercel, Netlify, or AWS.

## License

MIT
