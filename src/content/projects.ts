/**
 * PROJECT DATA — every case study is assembled from these blocks.
 * Copy is based on the portfolio PDF; recognition and roles are only those
 * documented there. Image ids map to src/content/media.generated.json
 * (see scripts/media-sources.mjs to replace sources).
 */

import { articles, authorPage } from "./writing";

export type MediaRef = { id: string; alt: string; caption?: string };

export type Block =
  | { type: "lead"; text: string }
  | { type: "text"; heading?: string; body: string[] }
  | { type: "gallery"; layout: "filmstrip" | "mosaic" | "pair" | "full" | "phones" | "squares" | "sequence" | "surveillance"; items: MediaRef[]; caption?: string }
  | { type: "video"; youtubeId: string; title: string; poster: MediaRef }
  | { type: "voices"; lines: string[]; cite: string }
  | { type: "stat"; items: { value: string; label: string }[] }
  | { type: "list"; heading: string; items: string[] }
  | { type: "headlines"; heading: string; filter: "featured" | "more"; note?: string };

export type CategoryKey = "documentary" | "screenwriting" | "audiovisual" | "music-video" | "photography" | "social" | "journalism";

export const categories: { key: CategoryKey; label: string }[] = [
  { key: "documentary", label: "Documentary" },
  { key: "screenwriting", label: "Screenwriting & Direction" },
  { key: "audiovisual", label: "Audio-Visual" },
  { key: "music-video", label: "Music Video" },
  { key: "photography", label: "Photography" },
  { key: "social", label: "Social Media Marketing" },
  { key: "journalism", label: "Journalism" },
];

export type Project = {
  slug: string;
  n: string;
  title: string;
  category: CategoryKey;
  format: string;
  act: "storyteller" | "strategist";
  summary: string;
  role: string[];
  cover: MediaRef;
  accent: string;
  recognition?: string[];
  credit?: string;
  links?: { label: string; href: string; note?: string }[];
  /** Drive files that are not publicly shared yet (they return "Page not found" to visitors). Move back into `links` once sharing is "Anyone with the link". */
  privateLinks?: string[];
  blocks: Block[];
};

export const projects: Project[] = [
  {
    slug: "gharq",
    n: "01",
    title: "Gharq",
    category: "documentary",
    format: "Documentary",
    act: "storyteller",
    summary: "Three divers who pull the dead from the Yamuna give closure to grieving families — while living cut off from their own.",
    role: ["Research", "Narrative", "Sound Design", "Transcription"],
    cover: { id: "gharq-boat", alt: "A lone boatman poles a small boat across the dark, still water of the Yamuna" },
    accent: "#9fb3a6",
    recognition: [
      "Official Selection — Janakpur International Film Festival",
      "Official Selection — Nagpur Film Festival",
      "Selected & screened — India Doc Project, with NIV Art Centre, Delhi",
    ],
    credit: "An AJK MCRC Production. A film by Adarsh Sinha, Aliza Shafiq, E. Jasmine, Intekhab Alam Warsi, Mohd. Romaan Arora, Reda Fatima Mobin, Sadaf Khan and Sameer Khan.",
    links: [{ label: "Watch the trailer on YouTube", href: "https://www.youtube.com/watch?v=dfrVc6EV4Mw" }],
    blocks: [
      { type: "lead", text: "Gharq follows the lives of three divers who retrieve dead bodies from the river Yamuna. These men give closure to the families of the dead, yet have themselves been left stranded — ousted by their families and by society at large, their only solace being each other." },
      { type: "video", youtubeId: "dfrVc6EV4Mw", title: "Gharq — Official Trailer", poster: { id: "gharq-diver", alt: "A diver stands chest-deep in the foaming river, holding a bamboo pole" } },
      { type: "text", heading: "A dying river, a question of bias", body: ["Set against a dying river, the film asks its audience to question their biases against people who do not traditionally fit into society — and to sit with the dignity of work that most would rather not see."] },
      { type: "voices", lines: ["I never enter the water without her blessings.", "We’ve saved many who would jump into Yamuna before us.", "I have to come home because of societal responsibilities."], cite: "Subtitled lines from the film" },
      { type: "gallery", layout: "filmstrip", items: [
        { id: "gharq-foam", alt: "Toxic white foam on the Yamuna, scattered with marigold offerings and broken clay lamps" },
        { id: "gharq-shelter", alt: "A diver sits beneath a plastic sheet shelter by the river, mid-conversation" },
        { id: "gharq-portrait", alt: "Close portrait of a diver in an orange scarf against a hazy city skyline" },
        { id: "gharq-shrine", alt: "A man crouches in a dim shrine strung with marigold garlands" },
        { id: "gharq-gathering", alt: "Men gather on the riverbank among idols and offerings" },
        { id: "gharq-fire", alt: "A small fire burns at night on the riverbank, a figure barely visible behind it" },
      ], caption: "Stills from Gharq" },
      { type: "list", heading: "Reda’s contribution", items: ["Research", "Narrative", "Sound design", "Transcription"] },
    ],
  },
  {
    slug: "crossroads",
    n: "02",
    title: "Crossroads",
    category: "documentary",
    format: "Documentary",
    act: "storyteller",
    summary: "Sania, a university basketball player, confronts institutionalised gender bias in sport — and comes out resilient.",
    role: ["Filmmaker (team film)"],
    cover: { id: "crossroads-stretch", alt: "Silhouette of a young woman stretching against a low setting sun over a sports ground" },
    accent: "#e6a35f",
    recognition: ["Official Selection — 14th CMS International Children’s Film Festival, ‘Indian Panorama’ section"],
    credit: "A film by Adarsh Sinha, Aliza Shafiq, E. Jasmine, Intekhab Alam Warsi, Reda Fatima Mobin, Sadaf Khan and Sameer Khan.",
    links: [{ label: "Request a screening link", href: "mailto:redafatmamobin@gmail.com?subject=Screening%20request%3A%20Crossroads", note: "The full film is shared privately on request." }],
    privateLinks: ["https://drive.google.com/file/d/1WyoTxJOSv7QHj-Q_maUI1tB5HW90ZvZe/view?usp=drive_link"],
    blocks: [
      { type: "lead", text: "Crossroads explores gender disparities within university sports — and how empowered women empower other women." },
      { type: "gallery", layout: "full", items: [{ id: "crossroads-title", alt: "Title frame of Crossroads: a silhouetted player tosses a basketball against a dusk sky" }] },
      { type: "text", heading: "Sania’s game", body: ["The film follows Sania, a basketball player, as she confronts the institutionalised gender biases that hinder her journey — and comes out resilient. Reda made the film with her team, sharing the collective ‘A film by’ credit."] },
      { type: "voices", lines: ["They are treated like VIPs.", "So she took me there and she told me to meet sir. “Sir, this is my daughter.”"], cite: "Subtitled lines from the film" },
      { type: "gallery", layout: "mosaic", items: [
        { id: "crossroads-interview", alt: "Sania, in an orange T-shirt, speaks to camera in a warmly lit hostel room" },
        { id: "crossroads-field", alt: "A lone runner crosses a vast dry sports field, a long shadow behind her" },
        { id: "crossroads-courtside", alt: "Sania, in a red jersey, speaks beside the court with a water bottle on the rail" },
      ], caption: "Stills from Crossroads" },
    ],
  },
  {
    slug: "fitoor",
    n: "03",
    title: "Fitoor",
    category: "audiovisual",
    format: "Audio-Visual · Photo story",
    act: "storyteller",
    summary: "An immersive retelling of the age-old tale of Mirza–Sahiba, told entirely through still photographs.",
    role: ["Scripting", "Storyboarding", "Dialogues", "Photography", "Direction"],
    cover: { id: "fitoor-turban", alt: "A frightened young woman between two men in red turbans, lit in deep red" },
    accent: "#e2614a",
    links: [{ label: "Watch Fitoor on Instagram", href: "https://www.instagram.com/reel/Cwk98gJhmFi/" }],
    blocks: [
      { type: "lead", text: "Fitoor retells the age-old tale of Mirza–Sahiba using still photographs — a story of love and defiance assembled frame by frame." },
      { type: "gallery", layout: "sequence", items: [
        { id: "fitoor-forest", alt: "Mirza and Sahiba walk together through a sunlit grove", caption: "Frame I" },
        { id: "fitoor-red", alt: "A woman laughs, hands at her face, wrapped in red light", caption: "Frame II" },
        { id: "fitoor-turban", alt: "A frightened woman between two men in red turbans", caption: "Frame III" },
        { id: "fitoor-cave", alt: "Sahiba sits beside a wounded Mirza, arrows resting against the rock", caption: "Frame IV" },
      ] },
      { type: "list", heading: "Reda’s contribution", items: ["Scripting", "Storyboarding", "Dialogues", "Photography", "Direction"] },
    ],
  },
  {
    slug: "on-the-loose",
    n: "04",
    title: "On The Loose",
    category: "music-video",
    format: "Music Video",
    act: "storyteller",
    summary: "A man slips into a parallel dimension where he becomes invisible — a music video about constant surveillance.",
    role: ["Ideation", "Storyboarding", "Direction", "Editing"],
    cover: { id: "otl-park", alt: "A young couple sits back to back on a lawn, the woman holding up a book" },
    accent: "#a9c48a",
    links: [{ label: "Request a screening link", href: "mailto:redafatmamobin@gmail.com?subject=Screening%20request%3A%20On%20The%20Loose", note: "The full film is shared privately on request." }],
    privateLinks: ["https://drive.google.com/file/d/1xbvVeYQTnBp3pyfXre7LLtwiJ5jw9jXn/view?usp=drive_link"],
    blocks: [
      { type: "lead", text: "On The Loose is the story of a man who enters a parallel dimension where he becomes invisible. Through the music video, Reda questions the ever-evolving presence of constant surveillance." },
      { type: "gallery", layout: "surveillance", items: [
        { id: "otl-highfive", alt: "Two friends high-five on a rooftop beside a mosaic-tiled wall" },
        { id: "otl-closeup", alt: "Close-up of a young man smiling, framed by a leafy trellis" },
        { id: "otl-smile", alt: "A young woman smiles off-camera beside a vine-covered trellis" },
      ] },
      { type: "list", heading: "Reda’s contribution", items: ["Ideation", "Storyboarding", "Direction", "Editing"] },
    ],
  },
  {
    slug: "saayah",
    n: "05",
    title: "Saayah",
    category: "screenwriting",
    format: "Anthology Episode",
    act: "storyteller",
    summary: "The second episode of an anthology adapted from “Before the Coffee Gets Cold” — written and directed by Reda.",
    role: ["Screenplay", "Direction"],
    cover: { id: "saayah-still", alt: "Two men face each other across a café table in warm, low light" },
    accent: "#c9a46a",
    links: [{ label: "Request a screening link", href: "mailto:redafatmamobin@gmail.com?subject=Screening%20request%3A%20Saayah", note: "The full film is shared privately on request." }],
    privateLinks: ["https://drive.google.com/file/d/1CHqJGXImazsDcUp0Bmk-fuGgy78LfbC-/view"],
    blocks: [
      { type: "lead", text: "Adapted from the book of the same name, “Before the Coffee Gets Cold” unfolds three tales within a time-travelling café, inviting viewers into the magic of temporal shifts within its cosy confines." },
      { type: "text", heading: "Episode two", body: ["Reda wrote the screenplay for, and directed, the anthology’s second episode, ‘Saayah’."] },
      { type: "gallery", layout: "pair", items: [
        { id: "saayah-bts-1", alt: "Behind the scenes: monitor and camera framing actors at a café table; crew around the set" },
        { id: "saayah-bts-2", alt: "Behind the scenes: lighting a set, a wall of story notes, and an outdoor rooftop shoot" },
      ], caption: "Behind the scenes" },
    ],
  },
  {
    slug: "abhaav",
    n: "06",
    title: "Abhaav",
    category: "photography",
    format: "Photography · Photo essay",
    act: "storyteller",
    summary: "People, architecture and products, indoors and out — and Abhaav, one of Reda’s photo essays.",
    role: ["Photography"],
    cover: { id: "photo-hands", alt: "A woman with eyes closed as red-painted hands cradle her face" },
    accent: "#d9826a",
    links: [{ label: "View the Abhaav photo essay (Google Drive)", href: "https://drive.google.com/file/d/1IbTLr8oI87yr1EvvOUh3RaDXpjQFfLip/view?usp=sharing" }],
    blocks: [
      { type: "lead", text: "Reda photographs people, architecture and products, indoors and outdoors. Abhaav is one of her photo essays — the full essay is linked below." },
      { type: "gallery", layout: "mosaic", items: [
        { id: "photo-couple", alt: "Studio portrait: a young woman in a cream sweater, a man close behind her in shadow" },
        { id: "photo-tomb", alt: "Humayun’s Tomb in warm evening light, framed by tall palms" },
        { id: "photo-jewellery", alt: "Product study: a diamond pendant and chain catching a streak of light" },
      ], caption: "Selected photographs (not part of the Abhaav essay)" },
    ],
  },
  {
    slug: "isb",
    n: "07",
    title: "Indian School of Business",
    category: "social",
    format: "Social Media Strategy & Content Production",
    act: "strategist",
    summary: "Leading organic content strategy for ISB’s Admissions channels — from ideation and scripting to shooting, editing and publishing.",
    role: ["Content strategy", "Ideation & scripting", "Direction & camera", "Editing", "Publishing", "Stakeholder & agency coordination"],
    cover: { id: "isb-grid-1", alt: "A grid of ISB Admissions Instagram posts: student testimonials, events and campus life" },
    accent: "#8d9be0",
    links: [
      { label: "ISB Admissions on Instagram", href: "https://www.instagram.com/isb.admissions/" },
      { label: "ISB Admissions on LinkedIn", href: "https://www.linkedin.com/company/isbadmissions/" },
    ],
    blocks: [
      { type: "lead", text: "As Assistant Manager in the Marketing and Communications team, Reda leads the strategy for organic content on the organisation’s Admissions social media channels." },
      { type: "text", heading: "End to end", body: [
        "The role spans end-to-end content creation — from ideation and scripting to production and publishing. She conceptualises and produces testimonial videos, class highlights, student-experience videos, event coverage and vox pops, and directs and shoots video assets so each piece holds to the brand’s voice and speaks to its audience.",
        "The work means constant collaboration with internal and external stakeholders — students, professors, editors, agencies and cross-functional teams.",
      ] },
      { type: "stat", items: [
        { value: "~70%", label: "of what goes live is shot and edited by Reda" },
        { value: "~30%", label: "produced with external agencies, coordinated by her for consistency and quality" },
      ] },
      { type: "gallery", layout: "phones", items: [
        { id: "isb-grid-1", alt: "ISB Admissions Instagram grid: event coverage, graduate testimonials, campus moments" },
        { id: "isb-grid-2", alt: "ISB Admissions Instagram grid: faculty feature, programme tips, cultural fest and convocation" },
      ], caption: "ISB Admissions on Instagram — screenshots from the portfolio" },
      { type: "list", heading: "Formats", items: ["Testimonial videos", "Class highlights", "Student-experience videos", "Event coverage", "Vox pops"] },
    ],
  },
  {
    slug: "nerdnerdy",
    n: "08",
    title: "NerdNerdy Education",
    category: "social",
    format: "Social Media Marketing",
    act: "strategist",
    summary: "Short-form reels and research-led posts for an organisation creating educational resources for children with special needs.",
    role: ["Short-form content", "Copywriting", "Research-led posts"],
    cover: { id: "nn-habits", alt: "NerdNerdy carousel cover: 5 ways for habit building in children" },
    accent: "#ea7aa3",
    blocks: [
      { type: "lead", text: "At NerdNerdy Education, Reda specialised in short-form content focused on engagement and reach — distilling complex concepts into concise, accessible formats for social platforms." },
      { type: "gallery", layout: "phones", items: [
        { id: "nn-reel-scissors", alt: "Reel: ‘Want to teach children how to use scissors?’ over a bright pink sheet" },
        { id: "nn-reel-puzzle", alt: "Reel: hands solving a two-sided fish puzzle on a red background" },
      ], caption: "Short-form reels" },
      { type: "text", heading: "Research, made useful", body: ["She also curated detailed, well-researched informative posts, contributing to the organisation’s mission of providing valuable educational resources for children with special needs."] },
      { type: "gallery", layout: "squares", items: [
        { id: "nn-habits", alt: "Carousel: 5 ways for habit building in children" },
        { id: "nn-vocabulary", alt: "Carousel: 8 ways to boost your child’s vocabulary skills" },
        { id: "nn-selfstudy", alt: "Carousel: the best ways to encourage self study, part one" },
        { id: "nn-motor", alt: "Illustrated post explaining children’s motor abilities" },
      ], caption: "Informative carousels" },
    ],
  },
  {
    slug: "xtreme-vision",
    n: "09",
    title: "Xtreme Vision Sports Management",
    category: "social",
    format: "Sports Content & Social Media",
    act: "strategist",
    summary: "In-depth analysis of the sports India competes in, translated into match-day social content.",
    role: ["Sports research", "Social content"],
    cover: { id: "xv-hockey", alt: "Asian Games 2023 post: India beat Japan 5–1 in hockey" },
    accent: "#6f8cf0",
    blocks: [
      { type: "lead", text: "At Xtreme Vision Sports Management, Reda conducted in-depth analyses of the various sports in which India participates, translating those insights into compelling social media posts." },
      { type: "gallery", layout: "squares", items: [
        { id: "xv-hockey", alt: "Asian Games 2023 hockey: India 5, Japan 1" },
        { id: "xv-archery", alt: "Asian Games champions: Ojas Pravin Deotale, gold in men’s individual compound archery" },
        { id: "xv-isl", alt: "ISL 2023: Mumbai City vs East Bengal, 0–0" },
        { id: "xv-cricket", alt: "India vs Australia women’s T20I result card" },
      ], caption: "Social posts — from the portfolio" },
    ],
  },
  {
    slug: "etbrandequity",
    n: "10",
    title: "ETBrandEquity",
    category: "journalism",
    format: "Journalism · Published Articles",
    act: "strategist",
    summary: "A year reporting on marketing, advertising and the business of brands for Brand Equity by The Economic Times.",
    role: ["Reporting", "Feature writing"],
    cover: { id: "et-list-1", alt: "A list of Reda’s published ETBrandEquity articles" },
    accent: "#e0675a",
    links: [{ label: "All articles by Reda on ETBrandEquity", href: authorPage }],
    blocks: [
      { type: "lead", text: "From January 2022 to January 2023, at Brand Equity by The Economic Times (Times Internet), Reda reported on marketing, advertising and the business landscape of brands." },
      { type: "headlines", heading: "Featured in the portfolio", filter: "featured" },
      { type: "headlines", heading: "More from the archive", filter: "more", note: `${articles.length} articles verified on Reda’s ETBrandEquity author page (byline “Reda Fatma Mobin”), August–December 2022.` },
      { type: "gallery", layout: "phones", items: [
        { id: "et-list-1", alt: "ETBrandEquity article list, including pieces on pay parity, Queen Elizabeth II, Lay’s and Campa Cola" },
        { id: "et-list-2", alt: "ETBrandEquity article list, including pieces on QR codes, Dream11, Dhara and Twitter" },
      ], caption: "Article listings — screenshots from the portfolio" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
