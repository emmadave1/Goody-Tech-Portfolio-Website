import brand1 from "@/assets/proj-brand-1.jpg";
import brand2 from "@/assets/proj-brand-2.jpg";
import graphic1 from "@/assets/proj-graphic-1.jpg";
import graphic2 from "@/assets/proj-graphic-2.jpg";
import banner1 from "@/assets/proj-banner-1.jpg";
import banner2 from "@/assets/proj-banner-2.jpg";
import card1 from "@/assets/proj-card-1.jpg";
import card2 from "@/assets/proj-card-2.jpg";
import tshirt1 from "@/assets/proj-tshirt-1.jpg";
import tshirt2 from "@/assets/proj-tshirt-2.jpg";
import mug1 from "@/assets/proj-mug-1.jpg";
import mug2 from "@/assets/proj-mug-2.jpg";

export type ServiceId =
  | "graphic"
  | "banner"
  | "card"
  | "tshirt"
  | "mug"
  | "brand";

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "graphic",
    title: "Graphic Design",
    short: "Posters, flyers, social kits",
    description:
      "Editorial-grade layouts and campaign visuals crafted to move audiences and elevate the brand.",
  },
  {
    id: "banner",
    title: "Banner Printing",
    short: "Retail, event & outdoor",
    description:
      "Large-format printing with vivid, weather-tested inks — engineered for storefronts and stages.",
  },
  {
    id: "card",
    title: "Business Cards",
    short: "Letterpress & foil",
    description:
      "Tactile business cards on premium stock with foil, emboss, and edge-paint finishes.",
  },
  {
    id: "tshirt",
    title: "T-Shirt Printing",
    short: "Screen & DTG",
    description:
      "Small-batch apparel with color-accurate screen printing and soft-hand DTG on premium blanks.",
  },
  {
    id: "mug",
    title: "Mug Printing",
    short: "Ceramic & matte",
    description:
      "Dishwasher-safe sublimation printing on glossy and matte ceramics — sharp, durable, gift-ready.",
  },
  {
    id: "brand",
    title: "Brand Identity",
    short: "Systems & guidelines",
    description:
      "Full identity systems: logo suite, typography, color, tone and rollout guidelines.",
  },
];

export type Project = {
  id: string;
  service: ServiceId;
  title: string;
  description: string;
  cover: string;
  images: string[];
  services: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "aro-lounge",
    service: "brand",
    title: "Aro Lounge — Identity System",
    description:
      "A refined identity for a boutique cocktail lounge — mark, palette and full stationery suite.",
    cover: brand1,
    images: [brand1, brand2],
    services: ["Logo suite", "Stationery", "Guidelines"],
  },
  {
    id: "linden-studio",
    service: "brand",
    title: "Linden Studio — Wordmark",
    description:
      "A quiet, editorial wordmark and card system for an architecture studio.",
    cover: brand2,
    images: [brand2, brand1],
    services: ["Wordmark", "Business cards"],
  },
  {
    id: "seagram-poster",
    service: "graphic",
    title: "Seagram Poster Series",
    description:
      "A three-piece poster campaign built around bold color blocks and confident typography.",
    cover: graphic1,
    images: [graphic1, graphic2],
    services: ["Poster design", "Typography"],
  },
  {
    id: "mague-editorial",
    service: "graphic",
    title: "Mague Magazine Spread",
    description:
      "Editorial layout for a long-form feature — hierarchy, rhythm, and generous white space.",
    cover: graphic2,
    images: [graphic2, graphic1],
    services: ["Editorial design", "Layout"],
  },
  {
    id: "storefront-banner",
    service: "banner",
    title: "Storefront Roll-Down",
    description:
      "A 3m storefront banner produced on tension fabric with weatherproof pigments.",
    cover: banner1,
    images: [banner1, banner2],
    services: ["Large-format print", "Install"],
  },
  {
    id: "expo-rollup",
    service: "banner",
    title: "Expo Roll-Up Stand",
    description:
      "A retractable roll-up banner system for conference booths — packs down flat.",
    cover: banner2,
    images: [banner2, banner1],
    services: ["Roll-up print", "Hardware"],
  },
  {
    id: "letterpress-cards",
    service: "card",
    title: "Letterpress Cards — Doubles",
    description:
      "Deep-impression letterpress on 600gsm cotton with dark green ink and gold foil.",
    cover: card1,
    images: [card1, card2],
    services: ["Letterpress", "Foil"],
  },
  {
    id: "marble-cards",
    service: "card",
    title: "Marble Series Cards",
    description:
      "A minimal card set with duplex board and blind-embossed marks.",
    cover: card2,
    images: [card2, card1],
    services: ["Duplex print", "Emboss"],
  },
  {
    id: "cream-tee",
    service: "tshirt",
    title: "Cream Essentials Tee",
    description:
      "Small-run screen-printed tee on 220gsm cotton with a soft-hand chest logo.",
    cover: tshirt1,
    images: [tshirt1, tshirt2],
    services: ["Screen printing", "Sourcing"],
  },
  {
    id: "studio-uniform",
    service: "tshirt",
    title: "Studio Uniform Drop",
    description:
      "Uniform apparel for a design studio, with embroidered chest patches.",
    cover: tshirt2,
    images: [tshirt2, tshirt1],
    services: ["Embroidery", "Fulfillment"],
  },
  {
    id: "ceramic-88",
    service: "mug",
    title: "Ceramic 88 — Café Set",
    description:
      "Sublimation-printed ceramic mugs for a café house — dishwasher and microwave safe.",
    cover: mug1,
    images: [mug1, mug2],
    services: ["Sublimation", "Packaging"],
  },
  {
    id: "matte-black-run",
    service: "mug",
    title: "Matte Black Studio Run",
    description:
      "A limited run of matte black mugs with laser-etched logos.",
    cover: mug2,
    images: [mug2, mug1],
    services: ["Laser etch", "Small batch"],
  },
];
