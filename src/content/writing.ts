/**
 * ETBrandEquity articles by Reda (byline: "Reda Fatma Mobin").
 * Every URL, headline and date below was verified against the live article
 * pages, linked from her author page:
 * https://brandequity.economictimes.indiatimes.com/author/479257094/reda-fatma-mobin
 * `featured` = shown in the portfolio PDF; `exclusive` = marked "Exclusive" there.
 * The author page has a "Load more" control, so older pieces may exist beyond these 20.
 */
export type Article = { title: string; url: string; date: string; section: string; featured?: boolean; exclusive?: boolean };

const BE = "https://brandequity.economictimes.indiatimes.com/news";

export const authorPage = "https://brandequity.economictimes.indiatimes.com/author/479257094/reda-fatma-mobin";

export const articles: Article[] = [
  { title: "Why QR codes are the new favourite tool of advertisers", url: `${BE}/marketing/why-qr-codes-are-the-new-favourite-tool-of-advertisers-/96352835`, date: "2022-12-20", section: "Marketing", featured: true, exclusive: true },
  { title: "Hansal Mehta calls latest Dream11 ad “disgusting”; stirs debate on freedom of expression", url: `${BE}/research/advertising/hansal-mehta-calls-latest-dream11-ad-disgusting-stirs-debate-on-freedom-of-expression/96147360`, date: "2022-12-11", section: "Advertising", featured: true },
  { title: "Dhara and the kid who loved jalebis", url: `${BE}/research/advertising/dhara-and-the-kid-who-loved-jalebis/95778391`, date: "2022-11-26", section: "Advertising", featured: true, exclusive: true },
  { title: "Is Musk making Twitter hostile for advertisers?", url: `${BE}/research/advertising/is-musk-making-twitter-hostile-for-advertisers/95303434`, date: "2022-11-04", section: "Advertising", featured: true, exclusive: true },
  { title: "The Blue Tick conundrum", url: `${BE}/digital/the-blue-tick-conundrum/95253784`, date: "2022-11-03", section: "Digital", featured: true },
  { title: "Wokewashing: Are brands preying on people's optimism?", url: `${BE}/research/advertising/wokewashing-are-brands-preying-on-peoples-optimism/95132736`, date: "2022-10-28", section: "Advertising" },
  { title: "To the people of India, respect the national anthem!", url: `${BE}/research/advertising/to-the-people-of-india-respect-the-national-anthem/94575333`, date: "2022-10-01", section: "Advertising" },
  { title: "MarTech Asia Summit 2022: Evolution and under-utilisation of martech stacks", url: `${BE}/digital/martech-asia-summit-2022-evolution-and-under-utilisation-of-martech-stacks/94402644`, date: "2022-09-23", section: "Digital" },
  { title: "MarTech Asia Summit 2022: The future and importance of metaverse", url: `${BE}/digital/martech-asia-summit-2022-the-future-and-importance-of-metaverse/94378495`, date: "2022-09-22", section: "Digital" },
  { title: "MarTech Asia Summit 2022: A two pronged strategy for customer retention", url: `${BE}/digital/et-martech-asia-summit-2022-a-two-pronged-strategy-for-customer-retention/94370259`, date: "2022-09-22", section: "Digital" },
  { title: "Advertising industry indicates fear and concern on pay parity: Toby Southgate, Global CEO, Forsman & Bodenfors", url: `${BE}/research/advertising/advertising-industry-indicates-fear-and-concern-on-pay-parity-toby-southgate-global-ceo-forsman-bodenfors/94290391`, date: "2022-09-19", section: "Advertising", featured: true },
  { title: "Metaverse to be used as a tool to target future generation of consumers: Virat Khullar, Hyundai Motor India", url: `${BE}/digital/metaverse-to-be-used-as-a-tool-to-target-future-generation-of-consumers-virat-khullar-hyundai-motor-india/94302491`, date: "2022-09-19", section: "Digital" },
  { title: "Queen Elizabeth II: Advertising campaigns with a royal touch", url: `${BE}/research/advertising/queen-elizabeth-ii-advertising-campaigns-with-a-royal-touch/94084595`, date: "2022-09-09", section: "Advertising", featured: true },
  { title: "As the world mourns the queen, where's Lay's Gourmet?", url: `${BE}/research/advertising/as-the-world-mourns-the-queen-wheres-lays-gourmet/94084185`, date: "2022-09-09", section: "Advertising", featured: true },
  { title: "Nation branding, the five principles: Peter Knapp, Landor & Fitch", url: `${BE}/marketing/nation-branding-the-five-principles-peter-knapp-landor-fitch/94048633`, date: "2022-09-07", section: "Marketing", featured: true },
  { title: "When Campa Cola gave Salman Khan his first break", url: `${BE}/research/advertising/when-campa-cola-gave-salman-khan-his-first-break/93960429`, date: "2022-09-03", section: "Advertising", featured: true },
  { title: "When 'eggheads' turned into ZooZoo for Vodafone", url: `${BE}/research/advertising/when-eggheads-turned-into-zoozoo-for-vodafone/93670908`, date: "2022-08-20", section: "Advertising" },
  { title: "India Independence Day 1947: When brands ushered in a new dawn", url: `${BE}/research/advertising/india-independence-day-1947-when-brands-ushered-in-a-new-dawn/93550821`, date: "2022-08-14", section: "Advertising" },
  { title: "Use data to extract signal from the noise: Gonzalo Garcia Villanueva, GfK", url: `${BE}/digital/use-data-to-extract-signal-from-the-noise-gonzalo-garcia-villanueva-gfk/93368793`, date: "2022-08-08", section: "Digital" },
  { title: "Google’s Asian owned label: A bad idea?", url: `${BE}/digital/be-comments-googles-asian-owned-label-a-bad-idea/93404488`, date: "2022-08-07", section: "Digital" },
];

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
