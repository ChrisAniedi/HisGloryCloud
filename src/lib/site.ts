/**
 * Single source of truth for church content.
 * Everything here is sourced from hisglorycloudchurch.org — edit freely,
 * every page reads from this file.
 */

export const church = {
  name: "His Glory Cloud Church",
  short: "HGC",
  alias: "Glory Tent",
  chapel: "Praise Chapel",
  founded: "2013-11-16",
  foundedLabel: "November 16, 2013",
  tagline: "Raising Kingdom Builders for God’s Glory",
  pillars: ["Transforming Lives", "Shaping Leaders", "Spreading God’s Glory"],
  leader: {
    name: "Apostle Festus Nwachukwu Edobor",
    title: "Son of God",
    role: "Senior Pastor & Founder",
  },
  address: {
    line1: "8 Adenle Road, Off 31 Road",
    line2: "Gowon Estate, Egbeda",
    city: "Lagos",
    country: "Nigeria",
    full: "8 Adenle Road, Off 31 Road, Gowon Estate, Egbeda, Lagos, Nigeria",
  },
  timezone: "Africa/Lagos",
  url: "https://hisglorycloudchurch.org",
} as const;

/**
 * Contact. The church's current site lists no phone or WhatsApp number. Put the WhatsApp
 * number here in international form without "+" (e.g. "2348012345678") and the floating
 * WhatsApp button will open a chat; until then it opens the pastoral care page.
 */
export const contact = {
  whatsapp: null as string | null,
};
export const waLink = (text = "Hello HGC, I would like some help.") =>
  contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}` : null;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address.full)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(church.address.full)}&z=15&output=embed`;

export const socials = {
  youtube: { label: "YouTube", handle: "@sonofgodtv2", href: "https://www.youtube.com/@sonofgodtv2" },
  instagram: { label: "Instagram", handle: "@hgcglorytent", href: "https://www.instagram.com/hgcglorytent" },
  facebook: { label: "Facebook", handle: "HGC Glory Tent", href: "https://www.facebook.com/share/1ZM4zz5ftd/" },
} as const;

export type Gathering = {
  id: "sunday" | "midweek";
  name: string;
  short: string;
  /** 0 = Sunday … 6 = Saturday, in Africa/Lagos time */
  day: number;
  dayLabel: string;
  start: [number, number];
  end: [number, number];
  timeLabel: string;
  description: string;
};

export const gatherings: Gathering[] = [
  {
    id: "sunday",
    name: "Sunday Service",
    short: "Sunday",
    day: 0,
    dayLabel: "Every Sunday",
    start: [9, 0],
    end: [12, 0],
    timeLabel: "9am – 12pm",
    description:
      "Our main gathering. Powerful worship, the Word preached with fire, and a family that can’t wait to meet you.",
  },
  {
    id: "midweek",
    name: "Midweek Service",
    short: "Wednesday",
    day: 3,
    dayLabel: "Every Wednesday",
    start: [18, 0],
    end: [19, 0],
    timeLabel: "6pm – 7pm",
    description:
      "An hour in the middle of the week to reset: prayer, teaching and a refreshing of the Spirit.",
  },
];

export const nextSteps = [
  {
    slug: "salvation",
    href: "/salvation",
    eyebrow: "New life",
    title: "I just gave my life to Jesus",
    blurb: "Welcome to the family. We’ll walk with you hand in hand and offer spiritual support as you grow.",
    cta: "Start here",
  },
  {
    slug: "prayer",
    href: "/prayer",
    eyebrow: "We intercede",
    title: "I need prayer",
    blurb: "Send in your request and our prayer squad will stand in agreement with you.",
    cta: "Let’s pray",
  },
  {
    slug: "testimony",
    href: "/testimony",
    eyebrow: "Give thanks",
    title: "I have a testimony",
    blurb: "Share the goodness of God so others can build faith through your story.",
    cta: "Share it",
  },
  {
    slug: "serve",
    href: "/serve",
    eyebrow: "Serve God",
    title: "I want to serve",
    blurb: "Join the workforce and serve as a valued member of Christ’s team in His tent and sanctuary.",
    cta: "Join the workforce",
  },
] as const;

export const departments = [
  "Sanctuary Unit",
  "Greeters Unit",
  "Relationship & Hospitality",
  "Protocol",
  "Media",
  "Drama",
  "Technical Team",
  "Ushering Unit",
  "Security Unit",
  "Prayer Squad",
  "Choir",
] as const;

export const pastoralOccasions = [
  "Baby dedication",
  "Naming ceremony",
  "Birthday celebration",
  "House warming",
  "Marriage thanksgiving",
  "Car dedication",
  "Wake keeping / Funeral",
  "General counselling",
] as const;

export const welcomeStatements = [
  {
    title: "Welcome to His Glory Cloud Church",
    body: "A family of joyful believers who love God deeply, praise passionately, and raise visionary kingdom leaders.",
  },
  {
    title: "A place of praise and purpose",
    body: "Experience powerful worship, divine encounters, and life-changing opportunities to grow, lead, and impact generations.",
  },
  {
    title: "Building leaders, shaping destinies",
    body: "A church committed to nurturing faith, inspiring greatness, and developing purpose-driven leaders for Christ.",
  },
  {
    title: "Where love, joy and faith overflow",
    body: "A vibrant community that celebrates God’s presence, empowers minds, and transforms lives through unwavering love.",
  },
] as const;

export const coreValues = [
  { title: "The Gospel", body: "Spreading the gospel of our Lord Jesus with signs, wonders and the power of God as of old." },
  { title: "Media", body: "Broadcasting the Word across media platforms so no distance can keep anyone from the message." },
  { title: "Outreach", body: "Taking the love of Christ beyond our walls through evangelism and outreach programs." },
  { title: "Philanthropy", body: "Providing for families in need, and being the hands and feet of Jesus in practical ways." },
  { title: "Community", body: "Contributing to our community and raising leaders who carry God’s glory into every sphere." },
] as const;

export const giving = {
  bank: "Zenith Bank",
  accountName: "His Glory Cloud Church",
  accountNumber: "1014394130",
  impact: [
    "Provide essential resources to families in need",
    "Fund evangelistic efforts to share the message of salvation",
    "Support local and international missions to unreached areas",
    "Offer spiritual and practical help to people facing challenges",
  ],
} as const;

export const scriptures = {
  vision: {
    ref: "1 Corinthians 2:9",
    text: "Eye has not seen, nor ear heard, nor have entered into the heart of man the things which God has prepared for those who love Him.",
  },
  giving: {
    ref: "2 Corinthians 9:7",
    text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  },
  harvest: {
    ref: "Luke 6:38",
    text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",
  },
} as const;

export const trainingFaqs = [
  {
    q: "What is the Ministry Training Program?",
    a: "A program designed to equip believers with spiritual knowledge, leadership skills and practical ministry experience to serve effectively in God’s kingdom.",
  },
  {
    q: "Who can join?",
    a: "Anyone with a passion to know God more and serve in ministry, whether you’re a new believer or already serving in a department.",
  },
  {
    q: "How long does it last?",
    a: "It depends on the level of training. Most sessions run between 6 and 12 weeks, with both theory and practical sessions.",
  },
  {
    q: "What topics are covered?",
    a: "Spiritual Growth, Biblical Leadership, Evangelism, Church Administration, Discipleship and Ministry Ethics, among others.",
  },
  {
    q: "Is there a registration fee?",
    a: "Most of our trainings are free. Some advanced or specialised courses may require a small contribution to cover materials.",
  },
  {
    q: "Do I receive a certificate?",
    a: "Yes. Participants who complete the program and meet all requirements receive a Certificate of Completion from the church.",
  },
  {
    q: "Can I serve after the training?",
    a: "Absolutely. Graduates are encouraged to join a ministry department and serve actively in church activities and outreach.",
  },
  {
    q: "How do I register?",
    a: "Fill out the form on this page, or visit the church office to pick up an application form.",
  },
] as const;

export const visitFaqs = [
  {
    q: "What time should I arrive?",
    a: "Sunday Service starts at 9am. Come 10 to 15 minutes early to settle in. Our Greeters Unit will meet you at the door.",
  },
  {
    q: "What should I wear?",
    a: "Come as you are. You’ll see everything from Sunday best to casual. What matters is that you’re here.",
  },
  {
    q: "How long is the service?",
    a: "Sunday Service runs from 9am to 12pm. Midweek Service on Wednesday is one hour, from 6pm to 7pm.",
  },
  {
    q: "Can I watch online?",
    a: "Yes. Services stream on our YouTube channel. You can join from anywhere in the world.",
  },
  {
    q: "I just gave my life to Christ. What now?",
    a: "That’s the best decision you’ll ever make. Fill in the Salvation form and someone from our team will reach out to walk with you.",
  },
] as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
  { label: "Watch", href: "/watch" },
  { label: "Next Steps", href: "/next-steps" },
  { label: "Give", href: "/give" },
] as const;

/** The church's own menu, as on hisglorycloudchurch.org. */
export const primaryNav = [
  { label: "About Us", href: "/about" },
  { label: "Ministry Training", href: "/training" },
  { label: "Outreach", href: "/give" },
  { label: "Pastoral Services", href: "/pastoral-care" },
] as const;

/** The "Next step" panel, in the church's own words. */
export const nextStepLinks = [
  { title: "Salvation", body: "Just accepted Jesus Christ as your Lord and Saviour?", href: "/salvation" },
  { title: "Join the workforce", body: "Ready to connect? Start your journey here.", href: "/serve" },
  { title: "Prayer request", body: "Need prayer? We are available.", href: "/prayer" },
  { title: "Share testimony", body: "Share about the goodness of God and encourage others.", href: "/testimony" },
] as const;

/**
 * Photography. Files live in /public/media. `null` leaves the slot out (or shows
 * a plain placeholder where a picture is needed).
 */
export const media = {
  // Photos from the church's own site (hisglorycloudchurch.org). Swap in new ones in /public/media.
  worship: "/media/worship-hands.jpg" as string | null,
  prayer: "/media/in-prayer.jpg" as string | null,
  thanksgiving: "/media/thanksgiving.jpg" as string | null,
  leader: null as string | null, // e.g. "/media/apostle.jpg" (a proper portrait for the About page)
  // Small circular portrait, cropped from a frame of one of his YouTube messages. Fine at avatar size only.
  // Not shown for now (owner, 2026-11-17). To bring it back: "/media/pastor.jpg" (file kept).
  pastor: null as string | null,
};
