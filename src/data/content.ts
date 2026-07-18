/**
 * A navigation link item used by the main site navigation.
 */
export type NavItem = {
  label: string;
  href: string;
};

/**
 * A single statistic item displayed in the hero section.
 */
export type StatItem = {
  label: string;
  value: string;
};

/**
 * A service offering shown on the homepage with a title, description, link,
 * and an icon key.
 */
export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: 'play' | 'party' | 'class';
};

/**
 * A trust indicator displayed as a supporting benefit card.
 */
export type TrustIndicator = {
  title: string;
  description: string;
  icon: 'users' | 'shield' | 'sparkles' | 'ticket' | 'music' | 'gift';
};

/**
 * A customer testimonial with quote, author name, and context detail.
 */
export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

/**
 * A highlighted event to display in the upcoming events list.
 */
export type EventItem = {
  day: string;
  title: string;
  time: string;
  badge: string;
  description: string;
};

/**
 * A class path step shown in the skating program overview.
 */
export type ClassPathItem = {
  level: string;
  detail: string;
};

/**
 * A single piece of class information such as schedule, pricing, or details.
 */
export type ClassInfoItem = {
  icon: 'clock' | 'price' | 'training';
  label: string;
  value: string;
  color: string;
  bg: string;
};

/**
 * A step item in the fundraiser experience flow.
 */
export type FundraiserStep = {
  title: string;
  detail: string;
};

/**
 * A gallery image asset used in the homepage gallery section.
 */
export type GalleryImage = {
  alt: string;
  src: string;
};

/**
 * A generic link item used in footer and other navigation blocks.
 */
export type LinkItem = {
  label: string;
  href: string;
};

/**
 * A social media link item with label and URL.
 */
export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Contact details for the business used across the site.
 */
export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  locationLabel: string;
};

/**
 * Main site navigation items.
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Classes', href: '/classes' },
  { label: 'Parties', href: '/parties' },
  { label: 'Fundraisers', href: '/fundraisers' },
  { label: 'Snack Bar', href: '/snack-bar' },
  { label: 'Contact', href: '/contact' },
];

export const quickStats: StatItem[] = [
  { label: 'Family Owned', value: 'Local roots, modern experience' },
  { label: 'Since 1986', value: 'Ashland favorite for generations' },
  { label: 'RVA Favorite', value: 'Trusted by families and schools' },
  { label: 'Safe & Fun', value: 'Friendly staff and organized sessions' },
];

/**
 * Short marquee highlights shown across the homepage.
 */
export const marqueeHighlights: string[] = [
  "Today's Hours: 12 PM - 10 PM",
  'Ashland, Virginia',
  'Phone: (804) 555-0196',
  'Upcoming Event: Glow Night Skate',
  'Family Parties Available Every Weekend',
];

/**
 * Featured service offerings shown on the homepage.
 */
export const services: ServiceItem[] = [
  {
    title: 'Open Skate',
    description:
      'Public sessions with energetic lighting and room for every skill level.',
    icon: 'play',
    href: '/schedule',
  },
  {
    title: 'Birthday Parties',
    description:
      'Private party options, food add-ons, and premium packages for families.',
    icon: 'party',
    href: '/parties',
  },
  {
    title: 'Skating Classes',
    description:
      'Structured instruction for beginners through advanced skaters.',
    icon: 'class',
    href: '/classes',
  },
];

/**
 * Trust indicator cards highlighting the rink's key benefits.
 */
export const trustIndicators: TrustIndicator[] = [
  {
    title: 'Family Friendly',
    description:
      'A welcoming rink where parents, kids, and grandparents all feel at home.',
    icon: 'users',
  },
  {
    title: 'Safe Environment',
    description:
      'Helpful staff and clear rink supervision for confidence on the floor.',
    icon: 'shield',
  },
  {
    title: 'Experienced Staff',
    description:
      'A team that keeps sessions organized, lively, and consistently on time.',
    icon: 'sparkles',
  },
  {
    title: 'Affordable Fun',
    description:
      'Great value for birthdays, group nights, classes, and weekend skating.',
    icon: 'ticket',
  },
  {
    title: 'Great Music',
    description:
      'A modern soundtrack that keeps the rink energized for every session.',
    icon: 'music',
  },
  {
    title: 'Community Favorite',
    description:
      'A local tradition for Ashland families, schools, and youth groups.',
    icon: 'gift',
  },
];

export const upcomingEvents: EventItem[] = [
  {
    day: 'Fri 14',
    title: 'Glow Night Skate',
    time: '7:00 PM - 10:00 PM',
    badge: 'Theme Night',
    description:
      'Blacklight energy, neon vibes, and family-friendly music all night.',
  },
  {
    day: 'Sat 15',
    title: 'Family Afternoon Session',
    time: '1:00 PM - 4:00 PM',
    badge: 'Popular',
    description:
      'A smoother tempo with space for beginners, birthday groups, and all ages.',
  },
  {
    day: 'Sun 16',
    title: 'Holiday Team Skate',
    time: '5:30 PM - 8:30 PM',
    badge: 'Special Event',
    description:
      'Great for youth teams, church groups, and celebration nights.',
  },
];

export const calendarCategories: StatItem[] = [
  {
    label: 'Theme Nights',
    value: 'Glow skates, music nights, and family favorites',
  },
  {
    label: 'Special Sessions',
    value: 'Extra sessions for holidays and busy weekends',
  },
  {
    label: 'Holiday Events',
    value: 'Premium dates that deserve standout promotion',
  },
];

export const partyInclusions: string[] = [
  'Private party options',
  'Group packages',
  'Food add-ons',
  'Skate rentals included',
  'Party rooms',
  'Staff support on site',
];

export const classPath: ClassPathItem[] = [
  {
    level: 'Beginner Classes',
    detail:
      'Learn balance, stopping, turning, and rink confidence in a supportive setting.',
  },
  {
    level: 'Intermediate Classes',
    detail:
      'Develop stride control, smoother transitions, and better group flow.',
  },
  {
    level: 'Advanced Skills',
    detail:
      'Challenge yourself with speed, style, and polished floor technique.',
  },
];

export const classes: ClassInfoItem[] = [
  {
    icon: 'clock',
    label: 'Schedule',
    value: 'Saturdays 10 AM - 12 PM | Sundays 11 AM - 1 PM',
    color: 'text-accent-cyan-mid',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: 'price',
    label: 'Pricing',
    value: '$18 per session | $60 for a 4-session pack | rentals included',
    color: 'text-neon-hover-light',
    bg: 'bg-neon-primary/10',
  },
  {
    icon: 'training',
    label: 'What to Bring',
    value: 'Comfortable clothing and socks. Skates and safety gear provided.',
    color: 'text-accent-cyan-light',
    bg: 'bg-accent-cyan/10',
  },
];

export const fundraiserGroups: string[] = [
  'Schools',
  'Churches',
  'Sports Teams',
  'Community Organizations',
];

/**
 * Step-by-step instructions describing the fundraiser process.
 */
export const fundraiserSteps: FundraiserStep[] = [
  {
    title: 'Schedule',
    detail:
      'Lock in a date for your school, church, sports team, or neighborhood group.',
  },
  {
    title: 'Promote',
    detail:
      'Share a clear invitation with families and supporters before event night.',
  },
  {
    title: 'Skate Night',
    detail:
      'Hosts and families enjoy a smooth event with a built-in revenue window.',
  },
  {
    title: 'Earn Funds',
    detail:
      'Raise money through a simple, dependable, and repeatable community event.',
  },
];

/**
 * Customer testimonials shown on the homepage.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'We booked a birthday party here and the whole process was polished, easy, and stress-free. The kids did not want to leave.',
    name: 'Sarah M.',
    detail: 'Birthday party parent',
  },
  {
    quote:
      'The rink feels modern, clean, and upbeat. Our family made this a regular weekend plan because it is such a good value.',
    name: 'Derrick T.',
    detail: 'Weekend skater',
  },
  {
    quote:
      'Our fundraiser night was organized and successful. The staff kept things moving and our group raised more than expected.',
    name: 'Melanie R.',
    detail: 'Community organizer',
  },
];

/**
 * Images used in the homepage gallery section.
 */
export const galleryImages: GalleryImage[] = [
  { alt: 'Family skate lighting', src: '/gallery/family-skate.svg' },
  { alt: 'Birthday party energy', src: '/gallery/birthday-party.svg' },
  { alt: 'Snack bar and seating', src: '/gallery/snack-bar.svg' },
  { alt: 'Group class moments', src: '/gallery/classes.svg' },
  { alt: 'Glow event atmosphere', src: '/gallery/glow-event.svg' },
  { alt: 'Community fundraiser night', src: '/gallery/fundraiser.svg' },
];

export type PreorderItem = {
  label: string;
  priceCents: number;
};

/**
 * Preorder menu items and pricing for the snack bar.
 * `priceCents` is the source of truth; display strings are derived from it.
 */
export const preorderItems: PreorderItem[] = [
  { label: 'Admission', priceCents: 1200 },
  { label: 'Skate Rentals', priceCents: 400 },
  { label: 'Snack Bar Items', priceCents: 850 },
  { label: 'Drink Bundle', priceCents: 525 },
];

/**
 * Categories used to group preorder items.
 */
export const preorderCategories: string[] = [
  'Admission',
  'Skate Rentals',
  'Food',
  'Drinks',
  'Snack Bar Items',
];

/**
 * Footer navigation links.
 */
export const footerLinks: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Parties', href: '/parties' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Social media links for the footer.
 */
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
];

/**
 * Business hours shown on the contact and schedule pages.
 */
export const businessHours: string[] = [
  'Mon - Thu: 4 PM - 9 PM',
  'Fri - Sun: 12 PM - 10 PM',
];

/**
 * The rink's main contact information.
 */
export const contactInfo: ContactInfo = {
  address: '123 Main Street, Ashland, VA 23005',
  phone: '(804) 555-0196',
  email: 'hello@ashlandskateland.com',
  locationLabel: 'Ashland, Virginia',
};
