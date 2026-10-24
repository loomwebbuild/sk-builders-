export const BUSINESS_INFO = {
  name: "SK Builders",
  city: "Hyderabad",
  type: "Real Estate Developer, Hyderabad",
  tagline: "Creating Spaces for Better Life",
  phone: "7666643433",
  phoneFormatted: "+91 76666 43433",
  phoneTel: "tel:7666643433",
  whatsappUrl: "https://wa.me/917666643433",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591043980720",
  instagramUrl: "https://www.instagram.com/skbuildershyderabad/",
  instagramHandle: "@skbuildershyderabad",
} as const;

export const IMAGES = {
  hero: "/images/hero_luxury_villa_1792826581975.jpg",
  villa: "/images/luxury_villa_architecture_1792826583240.jpg",
  residential: "/images/modern_residential_exterior_1792826584128.jpg",
  independentHome: "/images/independent_home_design_1792826585895.jpg",
  plottedDevelopment: "/images/plotted_development_landscape_1792826584536.jpg",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/offerings" },
  { label: "Contact", href: "/contact" },
] as const;

export const OFFERINGS_DATA = [
  {
    id: "01",
    title: "Villas",
    slug: "villas",
    headline: "Architectural residences harmonizing privacy, scale, and indoor-outdoor living.",
    description:
      "Our luxury villas in Hyderabad are conceived for those who value privacy, spatial freedom, and refined architectural balance. Featuring expansive double-height volumes, private open courtyards, and clean cantilevered planes, each villa creates a timeless sanctuary for contemporary family living.",
    image: IMAGES.villa,
    aspect: "4:3",
    tag: "Villa Residences",
  },
  {
    id: "02",
    title: "Residential",
    slug: "residential",
    headline: "Thoughtfully planned residential communities shaped for enduring comfort.",
    description:
      "Our residential developments embody modern urban living in Hyderabad, designed with generous natural ventilation, abundant natural daylight, and disciplined architectural facades. Spaces that elevate everyday life through purposeful layouts and cohesive communal harmony.",
    image: IMAGES.residential,
    aspect: "4:3",
    tag: "Modern Residential",
  },
  {
    id: "03",
    title: "Independent Homes",
    slug: "independent-homes",
    headline: "Distinctive standalone homes crafted for individual expression and permanence.",
    description:
      "Tailored for families seeking an autonomous living environment, our independent homes feature bespoke architectural detailing, natural stone and timber textures, and private grounds that foster meaningful family connections.",
    image: IMAGES.independentHome,
    aspect: "4:3",
    tag: "Independent Living",
  },
  {
    id: "04",
    title: "Plotted Developments",
    slug: "plotted-developments",
    headline: "Meticulously organized land parcels providing an enduring canvas for your vision.",
    description:
      "Our plotted developments in Hyderabad offer demarcated, infrastructure-ready land parcels within thoughtfully organized master layouts. Wide tree-lined avenues and verdant open horizons provide the perfect foundation to build your custom dream residence.",
    image: IMAGES.plottedDevelopment,
    aspect: "16:9",
    tag: "Planned Parcels",
  },
] as const;
