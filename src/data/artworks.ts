export interface Artwork {
  id: string;
  /** stable URL identifier — /art/{slug} */
  slug: string;
  title: string;
  artist: string;
  year: number;
  /** display year, e.g. "c. 800" for approximate dates */
  yearLabel?: string;
  era: 'MEDIEVAL' | 'NORTHERN' | 'HIGH RENAISSANCE' | 'BAROQUE';
  tags: string[];
  desc: string;
  medium: string;
  location: string;
  img: string;
}

export const ERAS = ['ALL', 'MEDIEVAL', 'NORTHERN', 'HIGH RENAISSANCE', 'BAROQUE'] as const;

export const ARTWORKS: Artwork[] = [
  {
    id: 'book-of-kells',
    slug: 'book-of-kells',
    title: 'BOOK OF KELLS — CHI RHO',
    artist: 'CELTIC MONKS',
    year: 800,
    yearLabel: 'c. 800',
    era: 'MEDIEVAL',
    tags: ['ILLUMINATION', 'VELLUM', 'INSULAR'],
    desc: 'The great Chi Rho page of the insular gospel book, where two Greek letters dissolve into a labyrinth of spirals, knots and hidden creatures. It is the illuminated manuscript at its most ecstatic — a prelude to everything the Renaissance would later formalize.',
    medium: 'Ink and pigment on vellum',
    location: 'Trinity College Library, Dublin',
    img: '/art/book-of-kells.webp',
  },
  {
    id: 'arnolfini-portrait',
    slug: 'arnolfini-portrait',
    title: 'THE ARNOLFINI PORTRAIT',
    artist: 'JAN VAN EYCK',
    year: 1434,
    era: 'NORTHERN',
    tags: ['OIL ON OAK', 'PORTRAIT', 'SYMBOLISM'],
    desc: 'A Bruges merchant and his bride stand in a room rendered with such patient precision that the convex mirror behind them reflects the whole scene back — painter included. Van Eyck made oil paint itself the instrument of a new realism.',
    medium: 'Oil on oak panel',
    location: 'The National Gallery, London',
    img: '/art/arnolfini-portrait.webp',
  },
  {
    id: 'lady-with-ermine',
    slug: 'lady-with-ermine',
    title: 'LADY WITH AN ERMINE',
    artist: 'LEONARDO DA VINCI',
    year: 1490,
    era: 'HIGH RENAISSANCE',
    tags: ['OIL ON WALNUT', 'PORTRAIT', 'SFORZA'],
    desc: 'Cecilia Gallerani turns as if someone has just entered the room, the white ermine alert in her arms. Leonardo catches motion and intelligence in a single suspended instant — a portrait that thinks.',
    medium: 'Oil on walnut panel',
    location: 'Czartoryski Museum, Kraków',
    img: '/art/lady-with-ermine.webp',
  },
  {
    id: 'last-supper',
    slug: 'last-supper',
    title: 'THE LAST SUPPER',
    artist: 'LEONARDO DA VINCI',
    year: 1498,
    era: 'HIGH RENAISSANCE',
    tags: ['MURAL', 'PERSPECTIVE', 'MILAN'],
    desc: 'The instant after the words "one of you will betray me" — twelve men recoil, protest and conspire in waves of gesture while the vanishing point holds steady at the calm center. Drama organized by geometry.',
    medium: 'Tempera and oil on plaster',
    location: 'Santa Maria delle Grazie, Milan',
    img: '/art/last-supper.webp',
  },
  {
    id: 'durer-self-portrait',
    slug: 'durer-self-portrait',
    title: 'SELF-PORTRAIT AT TWENTY-EIGHT',
    artist: 'ALBRECHT DÜRER',
    year: 1500,
    era: 'NORTHERN',
    tags: ['OIL ON PANEL', 'SELF-PORTRAIT', 'NUREMBERG'],
    desc: 'Dürer faces the viewer head-on in a pose reserved for sacred images, fur-collared and utterly self-possessed. It is the boldest claim ever painted that the artist is a creator in his own right.',
    medium: 'Oil on lime panel',
    location: 'Alte Pinakothek, Munich',
    img: '/art/durer-self-portrait.webp',
  },
  {
    id: 'mona-lisa',
    slug: 'mona-lisa',
    title: 'MONA LISA',
    artist: 'LEONARDO DA VINCI',
    year: 1503,
    era: 'HIGH RENAISSANCE',
    tags: ['OIL ON POPLAR', 'SFUMATO', 'PORTRAIT'],
    desc: 'The most famous painting in the world earns its myth up close: edges dissolved in smoke-soft sfumato, a gaze that follows, a smile that refuses to settle. Five centuries of looking have not exhausted it.',
    medium: 'Oil on poplar panel',
    location: 'Musée du Louvre, Paris',
    img: '/art/mona-lisa.webp',
  },
  {
    id: 'school-of-athens',
    slug: 'school-of-athens',
    title: 'THE SCHOOL OF ATHENS',
    artist: 'RAPHAEL',
    year: 1511,
    era: 'HIGH RENAISSANCE',
    tags: ['FRESCO', 'PHILOSOPHY', 'VATICAN'],
    desc: 'Plato points to the heavens, Aristotle to the earth, and around them the whole ancient intellect assembles beneath soaring coffered vaults. Raphael painted philosophy itself as architecture.',
    medium: 'Fresco',
    location: 'Stanza della Segnatura, Vatican',
    img: '/art/school-of-athens.webp',
  },
  {
    id: 'castiglione',
    slug: 'castiglione',
    title: 'PORTRAIT OF BALDASSARE CASTIGLIONE',
    artist: 'RAPHAEL',
    year: 1515,
    era: 'HIGH RENAISSANCE',
    tags: ['OIL ON CANVAS', 'PORTRAIT', 'COURTIER'],
    desc: 'The author of The Book of the Courtier sits in greys, blacks and one quiet flash of white — restraint as elegance. Raphael paints his friend with the same balanced grace Castiglione preached.',
    medium: 'Oil on canvas',
    location: 'Musée du Louvre, Paris',
    img: '/art/castiglione.webp',
  },
  {
    id: 'wedding-at-cana',
    slug: 'wedding-at-cana',
    title: 'THE WEDDING AT CANA',
    artist: 'PAOLO VERONESE',
    year: 1563,
    era: 'HIGH RENAISSANCE',
    tags: ['OIL ON CANVAS', 'BANQUET', 'VENICE'],
    desc: 'A biblical miracle staged as a Venetian feast — over a hundred guests, musicians, marble colonnades and silver light. The largest canvas in the Louvre, and the noisiest silence in painting.',
    medium: 'Oil on canvas',
    location: 'Musée du Louvre, Paris',
    img: '/art/wedding-at-cana.webp',
  },
  {
    id: 'night-watch',
    slug: 'night-watch',
    title: 'THE NIGHT WATCH',
    artist: 'REMBRANDT VAN RIJN',
    year: 1642,
    era: 'BAROQUE',
    tags: ['OIL ON CANVAS', 'MILITIA', 'CHIAROSCURO'],
    desc: 'A civic guard portrait that refuses to stand still — Rembrandt sends his militia surging out of shadow into golden light, drum beating, banner rising. Group portraiture became theatre.',
    medium: 'Oil on canvas',
    location: 'Rijksmuseum, Amsterdam',
    img: '/art/night-watch.webp',
  },
  {
    id: 'view-of-delft',
    slug: 'view-of-delft',
    title: 'VIEW OF DELFT',
    artist: 'JOHANNES VERMEER',
    year: 1661,
    era: 'BAROQUE',
    tags: ['OIL ON CANVAS', 'CITYSCAPE', 'DELFT'],
    desc: 'Vermeer’s home town after a rain shower — wet roofs glinting, clouds rolling off, the city doubled in still harbour water. Proust called a patch of its yellow wall the most beautiful painting in the world.',
    medium: 'Oil on canvas',
    location: 'Mauritshuis, The Hague',
    img: '/art/view-of-delft.webp',
  },
  {
    id: 'girl-with-pearl-earring',
    slug: 'girl-with-pearl-earring',
    title: 'GIRL WITH A PEARL EARRING',
    artist: 'JOHANNES VERMEER',
    year: 1665,
    era: 'BAROQUE',
    tags: ['OIL ON CANVAS', 'TRONIE', 'LIGHT'],
    desc: 'Not a portrait but a tronie — a study of a turning head, parted lips and one impossible pearl catching the light. Vermeer reduces painting to its essence: a glance, suspended forever.',
    medium: 'Oil on canvas',
    location: 'Mauritshuis, The Hague',
    img: '/art/girl-with-pearl-earring.webp',
  },
  {
    id: 'lacemaker',
    slug: 'lacemaker',
    title: 'THE LACEMAKER',
    artist: 'JOHANNES VERMEER',
    year: 1670,
    era: 'BAROQUE',
    tags: ['OIL ON CANVAS', 'GENRE', 'DOMESTIC'],
    desc: 'A young woman bends over her bobbins in total absorption, threads spilling like poured paint. Vermeer’s smallest canvas, and perhaps his most concentrated act of attention.',
    medium: 'Oil on canvas, mounted on panel',
    location: 'Musée du Louvre, Paris',
    img: '/art/lacemaker.webp',
  },
];

export function findBySlug(slug: string): Artwork | undefined {
  return ARTWORKS.find((a) => a.slug === slug);
}

export function nextArtwork(current: Artwork): Artwork {
  const index = ARTWORKS.indexOf(current);
  return ARTWORKS[(index + 1) % ARTWORKS.length];
}
