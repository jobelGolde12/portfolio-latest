/**
 * Generates public/jobel-golde-resume.pdf — a clean, brand-styled one-pager
 * built from the same data shown on the site. Wire the real PDF over this
 * file whenever you update your resume.
 *
 * Usage: npm run generate:resume
 */
import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Brand palette ──────────────────────────────────────────────
const INK = '#0A0B0D';
const ACCENT = '#7C5CFF';
const GRAY = '#5C636E';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 52, bottom: 52, left: 60, right: 60 },
  info: { Title: 'Jobel V. Golde — Resume', Author: 'Jobel V. Golde' },
});

doc.pipe(createWriteStream(join(root, 'public', 'jobel-golde-resume.pdf')));

const pageW = doc.page.width - doc.page.margins.left - doc.page.margins.right;

// ── Helpers ────────────────────────────────────────────────────
function sectionTitle(text) {
  doc
    .fillColor(ACCENT)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(text.toUpperCase(), { characterSpacing: 1.2 })
    .moveDown(0.35);
  doc
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + pageW, doc.y)
    .lineWidth(0.8)
    .strokeColor('#E5E5E5')
    .stroke()
    .moveDown(0.5);
}

// ── Header ─────────────────────────────────────────────────────
doc
  .fillColor(INK)
  .font('Helvetica-Bold')
  .fontSize(30)
  .text('JOBEL V. GOLDE', { characterSpacing: 1.5 })
  .moveDown(0.15);

doc
  .fillColor(ACCENT)
  .font('Helvetica')
  .fontSize(12)
  .text('Full Stack Developer', { characterSpacing: 0.6 })
  .moveDown(0.35);

doc
  .fillColor(GRAY)
  .font('Helvetica')
  .fontSize(9)
  .text(
    'Bulan, Sorsogon, Philippines  ·  +63 993 054 3293  ·  jobelgolde45@gmail.com',
  )
  .text(
    'github.com/jobelGolde12  ·  linkedin.com/in/jobel-golde-6a8822411  ·  jobelgolde.dev',
    { link: 'https://jobelgolde.dev' },
  )
  .moveDown(1);

// ── Summary ────────────────────────────────────────────────────
sectionTitle('Summary');
doc
  .fillColor(INK)
  .font('Helvetica')
  .fontSize(10.5)
  .text(
    'Passionate full-stack developer with strong experience building multiple systems. I enjoy solving problems through code, continuously improving my skills, and exploring different areas of the IT industry — contributing to meaningful projects while expanding my knowledge of software development and emerging technologies.',
    { lineGap: 3 },
  )
  .moveDown(0.6);

// ── Skills ─────────────────────────────────────────────────────
sectionTitle('Skills');
const skillRows = [
  ['Programming', 'JavaScript, PHP, Java, C++'],
  ['Web Development', 'Laravel, Vue.js, React.js, Next.js, HTML, CSS, Bootstrap, Tailwind, Inertia.js, TypeScript'],
  ['Databases', 'MySQL, phpMyAdmin'],
  ['Tools', 'Git/GitHub, VS Code, XAMPP, Postman, Figma, Docker'],
  ['Networking', 'LAN/WAN, IP Addressing, Wireshark'],
];
for (const [label, value] of skillRows) {
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(INK)
    .text(`${label}: `, { continued: true })
    .font('Helvetica')
    .fillColor(GRAY)
    .text(value); // default width = remaining line space (wraps at right margin)
}
doc.moveDown(0.6);

// ── Projects ───────────────────────────────────────────────────
sectionTitle('Selected Projects');
const projects = [
  {
    name: 'Profanity Detection API',
    tech: 'Laravel · REST API · React',
    desc: 'Custom profanity detection API specialized in Tagalog and regional Filipino terms. Designed to integrate with posts, comments, and messaging systems to automatically detect and block inappropriate language. Deployed and integrated by external services.',
  },
  {
    name: 'Lost and Found System',
    tech: 'Laravel · Vue.js · Inertia',
    desc: 'Capstone project — community platform for reporting and recovering lost items with real-time status updates and searchable categorized listings.',
  },
  {
    name: 'Protec Damayan',
    tech: 'Laravel · Vue.js · SMS Integration',
    desc: 'Mutual-aid system for fund records and disbursements with automated SMS death announcements via Semaphore.',
  },
  {
    name: 'School Portal',
    tech: 'Laravel · Vue.js · Inertia.js',
    desc: 'Student information and access system with role-based authentication for students, teachers, and administrators.',
  },
];
for (const p of projects) {
  doc
    .fillColor(INK)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text(p.name, { continued: true })
    .fillColor(ACCENT)
    .font('Helvetica')
    .text(`   ${p.tech}`)
    .fillColor(GRAY)
    .font('Helvetica')
    .fontSize(9.5)
    .text(p.desc, { lineGap: 2 })
    .moveDown(0.4);
}

// ── Education & Languages ──────────────────────────────────────
sectionTitle('Education & Languages');
doc
  .font('Helvetica-Bold')
  .fontSize(10)
  .fillColor(INK)
  .text('Bachelor of Science in Information Technology', { continued: true })
  .fillColor(GRAY)
  .font('Helvetica')
  .text('   (2022–2026)', { width: pageW })
  .font('Helvetica')
  .fontSize(9.5)
  .text('Sorsogon State University — Bulan Campus')
  .moveDown(0.4)
  .font('Helvetica-Bold')
  .fontSize(10)
  .fillColor(INK)
  .text('Languages: ', { continued: true })
  .font('Helvetica')
  .fillColor(GRAY)
  .text('English, Filipino');

doc.end();
console.log('Generated public/jobel-golde-resume.pdf');
