You are a senior frontend engineer and UI/UX expert. Your task is to transform my existing fresh React app into a **modern, animated personal portfolio website** inspired by a clean, minimal, and professional design similar to the provided reference.

## 🧠 General Requirements

* Use **React (functional components + hooks)**
* Use **Tailwind CSS** for styling
* Use **Framer Motion** for animations
* Use **Lucide React or Heroicons** for icons
* Maintain a **clean folder structure**
* Ensure **responsive design** (mobile, tablet, desktop)
* Use **modern UI/UX practices** (spacing, typography, smooth transitions)
* Keep the design minimal, elegant, and professional

---

## 🎨 Layout Structure

### 1. Navbar (Header)

* Fixed top navigation bar
* Left: Logo (text-based, e.g., "sewood")
* Center: Navigation links (Services, Portfolio, About, Contact Me)
* Right: Call-to-action button (e.g., "Download CV")
* Add hover underline animation on links
* Add scroll-based background blur (glassmorphism effect)

---

### 2. Hero Section (Main Section)

* Centered layout
* Large circular profile image in the center
* Behind the image: subtle gradient or soft blob background
* Add:

  * Name (e.g., "Scott Eastwood") in bold large font
  * Subtitle: "Software Engineer / Product Designer"
* Below: company logos (Slack, Amazon, Logitech, Google, Facebook)

---

## ✨ Advanced Animations (IMPORTANT)

Implement ALL modern animations typically found in high-end developer portfolios:

### Entrance Animations

* Fade-in + slide-up for text elements
* Staggered animation for navbar items
* Profile image scale-in effect

### Micro Interactions

* Button hover:

  * Scale up slightly
  * Add shadow glow
* Link hover:

  * Underline animation (left to right)
* Logo hover:

  * Slight grayscale to color transition

### Scroll Animations

* Reveal sections on scroll (fade + translateY)
* Parallax scrolling effect for background elements
* Navbar changes style on scroll (transparent → solid)

### Cursor-based Effects

* Optional: custom cursor or hover magnetic effect on buttons
* Subtle tilt effect on profile image (mouse movement)

### Floating / Decorative Animations

* Animated SVG lines (like the green curved line in the design)
* Floating geometric shapes (low opacity)
* Smooth looping motion (using CSS or Framer Motion)

### Image Effects

* Profile image:

  * Hover zoom effect
  * Soft shadow glow
* Optional: mask or circular clipping animation

### Text Effects

* Typewriter animation for subtitle (optional)
* Gradient animated text (subtle)

---

## 🎯 Styling Details

* Use **neutral colors** (white, gray, black)
* Accent color: soft green or pastel gradient
* Rounded corners (2xl)
* Soft shadows
* Plenty of whitespace
* Clean typography (e.g., Inter or Poppins)

---

## 📁 Suggested Component Structure

* components/

  * Navbar.jsx
  * Hero.jsx
  * AnimatedBackground.jsx
  * LogoStrip.jsx
* pages/

  * Home.jsx
* App.jsx

---

## ⚙️ Implementation Notes

* Install dependencies:

  * framer-motion
  * lucide-react
  * tailwindcss

* Use Framer Motion features:

  * motion.div
  * variants
  * initial, animate, whileHover, whileInView

* Use Tailwind for:

  * spacing
  * responsiveness
  * hover states

---

## 📱 Responsiveness

* Mobile:

  * Stack layout vertically
  * Collapse navbar into hamburger menu
* Tablet:

  * Adjust spacing and font sizes
* Desktop:

  * Full layout with centered hero

---

## 🚀 Final Output Expectations

* Fully working React UI
* Smooth and modern animations
* Clean, readable, and maintainable code
* No errors or warnings
* Pixel-perfect and visually appealing

---

## ⚠️ Important

* Do NOT create a new React app
* Only MODIFY and EXTEND the existing fresh React project
* Ensure everything runs immediately after implementation

---

Build the portfolio as if it belongs to a professional software engineer—clean, modern, and impressive.
