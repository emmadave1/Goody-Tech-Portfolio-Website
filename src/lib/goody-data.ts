import brand1 from '@/assets/brand-bag-1.jpg'
import brand2 from '@/assets/brand-logo.jpg'
import brand3 from '@/assets/brand3.jpg'
// import brand4 from '@/assets/brand4.jpg'
import brand5 from '@/assets/brand6.jpg'

import graphic1 from '@/assets/graphics-11.jpg'
import graphic2 from '@/assets/graphics-4.jpg'
import graphic3 from '@/assets/graphics-10.jpg'
import graphic4 from '@/assets/graphics-12.jpg'
import graphic5 from '@/assets/graphics-13.jpg'
import graphic6 from '@/assets/graphics-15.jpg'
import graphic7 from '@/assets/graphics-9.jpg'
import graphic8 from '@/assets/graphics-2.jpg'

import banner1 from '@/assets/proj-banner-1.jpg'
import banner2 from '@/assets/proj-banner-3.jpg'

import card1 from '@/assets/brand-card-1.jpg'
import card2 from '@/assets/card-3.jpg'
import card3 from '@/assets/card-4.jpg'

import tshirt1 from '@/assets/tshirt-1.jpg'
import tshirt2 from '@/assets/tshirt-3.jpg'

// import mug1 from '@/assets/proj-mug-1.jpg'
// import mug2 from '@/assets/proj-mug-2.jpg'

export type ServiceId =
  | 'graphic'
  | 'banner'
  | 'card'
  | 'tshirt'
  // | 'mug'
  | 'brand'

export type Service = {
  id: ServiceId
  title: string
  short: string
  description: string
}

export const SERVICES: Service[] = [
  {
    id: 'graphic',
    title: 'Graphic Design',
    short: 'Posters, flyers, social kits',
    description:
      'Editorial-grade layouts and campaign visuals crafted to move audiences and elevate the brand.',
  },
  {
    id: 'banner',
    title: 'Banner Printing',
    short: 'Retail, event & outdoor',
    description:
      'Large-format printing with vivid, weather-tested inks — engineered for storefronts and stages.',
  },
  {
    id: 'card',
    title: 'Business Cards',
    short: 'Letterpress & foil',
    description:
      'Tactile business cards on premium stock with foil, emboss, and edge-paint finishes.',
  },
  {
    id: 'tshirt',
    title: 'T-Shirt Printing',
    short: 'Screen & DTG',
    description:
      'Small-batch apparel with color-accurate screen printing and soft-hand DTG on premium blanks.',
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    short: 'Systems & guidelines',
    description:
      'Full identity systems: logo suite, typography, color, tone and rollout guidelines.',
  },
]

export type Project = {
  id: string
  service: ServiceId
  title: string
  description: string
  cover: string
  images: string[]
  services: string[]
}

export const PROJECTS: Project[] = [
  // ==========================================
  // BRAND IDENTITY
  // ==========================================

  {
    id: 'aro-lounge-identity',
    service: 'brand',
    title: 'Aro Lounge — Identity System',
    description:
      'A refined identity system created for a boutique cocktail lounge, combining a distinctive mark, sophisticated palette, and cohesive stationery suite.',
    cover: brand1,
    images: [brand1, brand2],
    services: ['Logo suite', 'Stationery', 'Guidelines'],
  },

  {
    id: 'linden-studio-wordmark',
    service: 'brand',
    title: 'Linden Studio — Wordmark',
    description:
      'A quiet, editorial wordmark designed to give an architecture studio a refined and memorable visual presence.',
    cover: brand2,
    images: [brand2, brand1],
    services: ['Wordmark', 'Business cards'],
  },

  {
    id: 'linden-studio-identity',
    service: 'brand',
    title: 'Linden Studio — Visual Identity',
    description:
      'A minimal visual identity built around structured typography, balanced composition, and a sophisticated architectural aesthetic.',
    cover: brand3,
    images: [brand3, brand2, brand1],
    services: ['Visual identity', 'Typography', 'Stationery'],
  },

  {
    id: 'linden-studio-stationery',
    service: 'brand',
    title: 'Linden Studio — Stationery',
    description:
      'A premium stationery direction extending the Linden Studio identity across carefully designed physical brand touchpoints.',
    cover: brand5,
    images: [brand5, brand3, brand2, brand1],
    services: ['Stationery', 'Print design', 'Brand system'],
  },

  // ==========================================
  // GRAPHIC DESIGN
  // ==========================================

  {
    id: 'seagram-poster-series',
    service: 'graphic',
    title: 'Seagram Poster Series',
    description:
      'A three-piece poster campaign built around bold color blocks, expressive typography, and a strong visual hierarchy.',
    cover: graphic6,
    images: [graphic6, graphic2, graphic3],
    services: ['Poster design', 'Typography'],
  },

  {
    id: 'seagram-poster-bold',
    service: 'graphic',
    title: 'Seagram — Campaign Poster',
    description:
      'A bold promotional poster exploring scale, contrast, and confident typography to create an engaging campaign visual.',
    cover: graphic1,
    images: [graphic1, graphic2, graphic3],
    services: ['Poster design', 'Campaign design'],
  },

  {
    id: 'mague-editorial-cover',
    service: 'graphic',
    title: 'Mague Magazine — Cover',
    description:
      'A contemporary editorial cover designed around strong typography, visual balance, and an expressive magazine aesthetic.',
    cover: graphic2,
    images: [graphic2, graphic1],
    services: ['Editorial design', 'Cover design'],
  },

  {
    id: 'mague-editorial-spread',
    service: 'graphic',
    title: 'Mague Magazine — Editorial Spread',
    description:
      'An editorial spread combining generous white space, clear hierarchy, and carefully considered typography for long-form content.',
    cover: graphic4,
    images: [graphic4, graphic1, graphic3],
    services: ['Editorial design', 'Layout'],
  },

  {
    id: 'mague-editorial-layout',
    service: 'graphic',
    title: 'Mague Magazine — Layout',
    description:
      'A clean magazine layout designed to create rhythm between imagery, headlines, and supporting editorial content.',
    cover: graphic5,
    images: [graphic5, graphic2, graphic1],
    services: ['Editorial design', 'Layout'],
  },

  {
    id: 'mague-editorial-feature',
    service: 'graphic',
    title: 'Mague Magazine — Feature',
    description:
      'A visual feature layout focused on strong image placement, editorial hierarchy, and a polished reading experience.',
    cover: graphic8,
    images: [graphic8, graphic5, graphic3],
    services: ['Editorial design', 'Art direction'],
  },

  {
    id: 'mague-editorial-typography',
    service: 'graphic',
    title: 'Mague Magazine — Typography',
    description:
      'A typography-led editorial composition exploring scale, spacing, contrast, and visual storytelling.',
    cover: graphic7,
    images: [graphic7, graphic2, graphic4],
    services: ['Typography', 'Editorial design'],
  },

  // ==========================================
  // BANNER PRINTING
  // ==========================================

  {
    id: 'storefront-roll-down',
    service: 'banner',
    title: 'Storefront Roll-Down',
    description:
      'A 3m storefront banner produced on tension fabric with weather-resistant pigments for a durable outdoor presentation.',
    cover: banner1,
    images: [banner1, banner2],
    services: ['Large-format print', 'Install'],
  },

  {
    id: 'expo-roll-up',
    service: 'banner',
    title: 'Expo Roll-Up Stand',
    description:
      'A retractable roll-up banner system designed for conference booths and exhibitions, combining portability with strong visual impact.',
    cover: banner2,
    images: [banner2, banner1],
    services: ['Roll-up print', 'Hardware'],
  },

  // ==========================================
  // BUSINESS CARDS
  // ==========================================

  {
    id: 'letterpress-cards-doubles',
    service: 'card',
    title: 'Letterpress Cards — Doubles',
    description:
      'Deep-impression letterpress business cards produced on 600gsm cotton stock with dark green ink and refined gold foil detailing.',
    cover: card3,
    images: [card3, card1, card2],
    services: ['Letterpress', 'Foil'],
  },

  {
    id: 'letterpress-cards-premium',
    service: 'card',
    title: 'Letterpress Cards — Premium',
    description:
      'A premium business card concept combining tactile letterpress printing, carefully selected stock, and understated luxury finishes.',
    cover: card1,
    images: [card1, card2, card3],
    services: ['Letterpress', 'Premium stock'],
  },

  {
    id: 'marble-series-cards',
    service: 'card',
    title: 'Marble Series Cards',
    description:
      'A minimal card collection featuring duplex board, subtle textures, and blind-embossed marks for a distinctive tactile finish.',
    cover: card2,
    images: [card2, card1],
    services: ['Duplex print', 'Emboss'],
  },

  // ==========================================
  // T-SHIRT PRINTING
  // ==========================================

  {
    id: 'cream-essentials-tee',
    service: 'tshirt',
    title: 'Cream Essentials Tee',
    description:
      'A small-run apparel project printed on 220gsm cotton with a soft-hand chest logo and a clean everyday aesthetic.',
    cover: tshirt1,
    images: [tshirt1, tshirt2],
    services: ['Screen printing', 'Sourcing'],
  },

  {
    id: 'studio-uniform-drop',
    service: 'tshirt',
    title: 'Studio Uniform Drop',
    description:
      'A custom studio uniform collection featuring embroidered chest patches and a practical, understated visual identity.',
    cover: tshirt2,
    images: [tshirt2, tshirt1],
    services: ['Embroidery', 'Fulfillment'],
  },

  // ==========================================
  // MUGS
  // ==========================================

  // {
  //   id: 'ceramic-88-cafe-set',
  //   service: 'mug',
  //   title: 'Ceramic 88 — Café Set',
  //   description:
  //     'Sublimation-printed ceramic mugs created for a café house, designed for everyday use and durable presentation.',
  //   cover: mug1,
  //   images: [mug1, mug2],
  //   services: ['Sublimation', 'Packaging'],
  // },

  // {
  //   id: 'matte-black-studio-run',
  //   service: 'mug',
  //   title: 'Matte Black Studio Run',
  //   description:
  //     'A limited run of matte black mugs featuring clean laser-etched logos and a premium studio aesthetic.',
  //   cover: mug2,
  //   images: [mug2, mug1],
  //   services: ['Laser etch', 'Small batch'],
  // },
]