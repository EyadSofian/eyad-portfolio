# Eyad Sofian — Portfolio

Personal portfolio for Eyad Sofian, AI Product & Technology Specialist based in Cairo, Egypt.

## Tech Stack

- **React 19** + **Vite 8**
- **Framer Motion 12** — scroll animations, hover states, modal transitions
- **Lucide React** — icons
- **Plus Jakarta Sans** + **JetBrains Mono** — typography (Google Fonts)
- **Web3Forms** — contact form (serverless)
- **Vercel** — deployment

## Features

- Bento grid project layout (featured 4 + uniform grid for the rest)
- Project modals with animated workflow diagrams and key metrics
- Categorized skills section (5 groups, no arbitrary percentages)
- Timeline experience section with tech tags and achievement bullets
- Contact form with budget selector, success/error states, and all contact channels
- Dark / light theme toggle
- Fully responsive (375px to 1440px+)
- WCAG 2.1 AA accessibility (ARIA labels, focus rings, keyboard navigation)
- SEO: meta tags, og:image, JSON-LD Person schema, sitemap.xml

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Contact Form (Web3Forms)

The contact form uses [Web3Forms](https://web3forms.com) — free and serverless.

1. Go to [web3forms.com](https://web3forms.com) and get a free access key
2. Open `src/App.jsx` and find the `handleSubmit` function
3. Replace `YOUR_WEB3FORMS_KEY` with your actual key

### Updating Content

All portfolio data lives in `src/data.js`:

- `PROJECTS` — project cards (title, description, tags, metrics, workflow, links)
- `SKILL_GROUPS` — skills grouped by domain
- `EXPERIENCE` — work history with bullets and tech tags
- `CERTS` — certifications

### OG Image

Add a 1200x630px `og-image.png` to the `public/` folder for proper social media previews.

## Deployment (Vercel)

Vercel auto-detects Vite. Connect the repository — no build configuration needed.

The production bundle splits into three chunks:

- `react-vendor` — React + ReactDOM (~58KB gzip)
- `motion` — Framer Motion (~45KB gzip)
- `index` — application code (~14KB gzip)

## Contact

- **WhatsApp:** +20 121 028 0648
- **Email:** eyadsofian862@gmail.com
- **LinkedIn:** [eyad-sofian-16b753238](https://linkedin.com/in/eyad-sofian-16b753238)
- **GitHub:** [EyadSofian](https://github.com/EyadSofian)
- **Botpress:** [experts/eyad-sofian](https://botpress.com/experts/eyad-sofian)
