/**
 * SITE CONTENT — single source of truth for profile, contact and SEO copy.
 * Facts here are taken from "Reda Fatma Mobin Portfolio.pdf". Do not add
 * claims that are not documented there.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export const site = {
  name: "Reda Fatima Mobin",
  shortName: "Reda",
  title: "Reda Fatima Mobin | Filmmaker, Screenwriter & Creative Strategist",
  description:
    "Explore the creative portfolio of Reda Fatima Mobin, showcasing documentary filmmaking, screenwriting, direction, photography, journalism, and digital media strategy.",
  concept: "Stories that stay.",
  headline: "Making sense of the world, one frame at a time.",
  positioning: ["A filmmaker’s eye.", "A storyteller’s mind.", "A strategist’s perspective."],
  disciplines: ["Documentary", "Screenwriting", "Direction", "Photography", "Journalism", "Social Strategy"],
  role: "Assistant Manager, Marketing & Communications",
  organisation: "Indian School of Business",
};

export const contact = {
  email: "redafatmamobin@gmail.com",
  phoneDisplay: "+91 91169 64079",
  phoneHref: "tel:+919116964079",
  linkedin: "https://www.linkedin.com/in/reda-fatma-mobin-9019a31a9/",
  instagram: "https://www.instagram.com/redabtwthelines/",
  instagramHandle: "@redabtwthelines",
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Index", href: "/#index" },
  { label: "Photography", href: "/#photography" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];

/** Career path, in the order given in the portfolio. Only dates stated in the PDF are shown. */
export const journey = [
  { label: "Electronics & Communication Engineering", note: "Where it started: a grounding in STEM." },
  { label: "Mass Communication — AJK MCRC, Jamia Millia Islamia", note: "The turn towards media, film and storytelling." },
  { label: "ETBrandEquity, The Economic Times", note: "Reporting on marketing, advertising and brands.", period: "Jan 2022 – Jan 2023" },
  { label: "NerdNerdy Education · Medizyn Care", note: "Two years in social media marketing." },
  { label: "Indian School of Business", note: "Assistant Manager, Marketing & Communications.", period: "Current" },
];

export const dimensions = [
  {
    key: "storyteller",
    title: "The Storyteller",
    body: "Documentaries about people at the edges of society, a screenplay set in a time-travelling café, a centuries-old love story retold in still photographs.",
  },
  {
    key: "strategist",
    title: "The Strategist",
    body: "Organic content strategy for ISB Admissions, short-form content for education and sports brands, and a year reporting on the business of brands.",
  },
  {
    key: "thinker",
    title: "The Creative Thinker",
    body: "An engineer turned filmmaker, drawn to documentary as much as thriller and suspense — and, away from work, to art and painting.",
  },
];

export const skills = [
  { group: "Marketing", items: ["Organic Social Media", "Copywriting", "Content Strategy", "Branded Content Creation", "Short-form Videos"] },
  { group: "Writing", items: ["Content Writing", "Screenwriting", "Research"] },
  { group: "Film & TV Production", items: ["Direction", "Camera Work", "Live Sports & Music Productions", "Storyboarding", "Video Production"] },
  { group: "Soft Skills", items: ["Negotiation", "Adaptive Leadership", "Design Thinking"] },
];

export const kit = [
  { group: "Camera", items: ["Canon 5D Mark IV", "Nikon D7200", "Panasonic P2HD", "Sony HXC 100", "Nikon 750D"] },
  { group: "Edit & Post", items: ["Final Cut Pro", "VN", "Filmic Pro", "Snapseed", "Canva"] },
];

/** The creative process, each stage grounded in documented work. */
export const processStages = [
  { n: "01", title: "Observe", body: "Noticing the people most of us look past — the divers of the Yamuna, a basketball player pushing against bias.", ref: "Gharq · Crossroads" },
  { n: "02", title: "Research", body: "Research and transcription for documentary; in-depth analysis of the sports India competes in, turned into social content.", ref: "Gharq · Xtreme Vision" },
  { n: "03", title: "Write", body: "Screenplays, scripts and dialogues — from an anthology episode to a folk tale retold frame by frame.", ref: "Saayah · Fitoor" },
  { n: "04", title: "Direct", body: "Directing on set and behind the camera, from fiction and music video to testimonials and vox pops.", ref: "On The Loose · ISB" },
  { n: "05", title: "Compose", body: "Photographing people, architecture and products, indoors and out, with a deliberate eye for light.", ref: "Photography · Abhaav" },
  { n: "06", title: "Communicate", body: "Shaping stories for audiences — content strategy, publishing, and reporting on the business of brands.", ref: "ISB · ETBrandEquity" },
];
