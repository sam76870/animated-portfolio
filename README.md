# Shubham Pathak — Portfolio v2

> Fully animated personal portfolio built with **React + TypeScript + Framer Motion**

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Sticky nav with blur + mobile menu
│   ├── Hero.tsx            # Particle canvas, typewriter, photo, CTAs
│   ├── About.tsx           # Bio, stats, learning progress bars
│   ├── Skills.tsx          # Tech stack cards + marquee
│   ├── Projects.tsx        # Featured project cards with hover FX
│   ├── Experience.tsx      # Animated timeline
│   ├── Contact.tsx         # EmailJS "Ask Me" form
│   ├── Footer.tsx          # Links + social
│   ├── CustomCursor.tsx    # Smooth magnetic cursor
│   └── ScrollProgress.tsx  # Top progress bar
├── hooks/
│   └── useCustomCursor.ts  # Cursor logic hook
├── data.ts                 # ← ALL your content lives here
├── App.tsx                 # Root with loader + layout
├── main.tsx                # Entry point
└── index.css               # Design tokens + global styles
```

---

## ✅ Setup Checklist

### 1. Add Your Photo
Place your photo at:
```
public/photo.jpg
```
Recommended: 400×400px, square crop, good lighting.

### 2. Add Your Resume PDF
Place your resume at:
```
public/Shubham_Pathak_Resume_2026.pdf
```

### 3. Set Up EmailJS (for the "Ask Me" form)

1. Go to **[emailjs.com](https://emailjs.com)** → Sign up (free)
2. Create a **Service** (Gmail recommended) → copy `Service ID`
3. Create an **Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — subject
   - `{{message}}` — message body
4. Copy your **Public Key** from Account → API Keys

Then open `src/data.ts` and replace:

```typescript
export const EMAILJS_CONFIG = {
  serviceId:  'YOUR_SERVICE_ID',   // ← paste here
  templateId: 'YOUR_TEMPLATE_ID',  // ← paste here
  publicKey:  'YOUR_PUBLIC_KEY',   // ← paste here
};
```

### 4. Update Your Info
Open `src/data.ts` and update:
- `PERSONAL.email` — your professional email
- `PERSONAL.linkedin` — your LinkedIn URL
- `PERSONAL.github` — your GitHub URL
- `PERSONAL.photoUrl` — path to your photo (default: `/photo.jpg`)
- `PERSONAL.resumeUrl` — path to resume PDF
- `PROJECTS` — add/remove/edit your projects
- `EXPERIENCE` — add/remove jobs

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#050510` |
| Accent Cyan | `#00d4ff` |
| Accent Purple | `#7b2ff7` |
| Accent Green | `#00ff88` |
| Font Sans | Space Grotesk |
| Font Mono | JetBrains Mono |

---

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Framer Motion** — page transitions, scroll animations, hover effects
- **react-type-animation** — typewriter effect in hero
- **@emailjs/browser** — contact form email delivery
- **react-scroll** — smooth section scrolling
- **react-hot-toast** — form success/error notifications
- **react-intersection-observer** — scroll-triggered animations
- **Vite** — fast dev server + build

---

## 📦 Deploy

### Netlify (Recommended)
```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com/drop
```

Or connect your GitHub repo for auto-deploy on push.

### Vercel
```bash
npm install -g vercel
vercel --prod
```

---

## 🔧 Customization

**Change colors** → edit CSS variables in `src/index.css` under `:root`

**Add a section** → create `src/components/NewSection.tsx`, import in `App.tsx`

**Change fonts** → update the Google Fonts link in `index.html` + `--font-sans` / `--font-mono` in CSS

---

Built with ❤ in Mumbai 🇮🇳
