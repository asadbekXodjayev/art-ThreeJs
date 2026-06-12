export interface PaletteColor {
  hex: string;
  name: string;
}

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
  /** short lede shown under the title */
  desc: string;
  medium: string;
  dimensions: string;
  location: string;
  movement: string;
  genre: string;
  commissionedBy?: string;
  overview: string;
  composition: string;
  technique: string;
  symbolism: string;
  legacy: string;
  facts: string[];
  palette: PaletteColor[];
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
    desc: 'The Chi Rho page turns sacred text into a living field of ornament, animals and hidden forms.',
    medium: 'Iron-gall ink and pigment on vellum',
    dimensions: 'Page about 33 cm × 25 cm',
    location: 'Trinity College Library, Dublin (MS 58)',
    movement: 'Insular (Hiberno-Saxon) manuscript art',
    genre: 'Illuminated gospel book — incipit page',
    overview:
      'The Book of Kells, made around AD 800 by Columban monks, is the most lavishly decorated Insular gospel book to survive. Its single most famous page is folio 34r, the Chi Rho — the Greek monogram of Christ that opens the Nativity passage in Matthew.\n\nHere the letter Chi explodes across almost the entire page in a storm of spirals, knots and trumpet shapes, so dense that the text it begins is nearly lost in pattern. Within the ornament hide angels, cats and mice, an otter with a fish, and human heads — rewards for the patient eye.',
    composition:
      'The vast Chi sweeps diagonally, anchoring a near-symmetrical web of roundels and interlace. Tiny figurative vignettes nestle in the negative spaces, balancing cosmic ornament with earthy humour.',
    technique:
      'Pigments include orpiment yellow, red and white lead, verdigris green and precious lapis-derived blue, applied with extraordinary fineness. Some details are smaller than a millimetre — visible only under magnification.',
    symbolism:
      "The monogram itself sacralises Christ's name. Cats stalking mice that nibble a Eucharistic host are read as a meditation on vigilance and the sacrament; a moth and chrysalis may symbolise resurrection.",
    legacy:
      'A national treasure of Ireland and a pinnacle of medieval art; the Chi Rho page is one of the most reproduced single folios in the history of the book.',
    facts: [
      'The page is so detailed that some motifs are invisible to the naked eye.',
      'Hidden in the ornament are two cats watching mice fight over a communion wafer.',
      "A 12th-century chronicler called such work 'the work of an angel, not a man.'",
      'Its gold-and-jewel cover was torn off by thieves in 1007 and never recovered.',
      'Only a couple of its 680 pages are free of decoration.',
    ],
    palette: [
      { hex: '#2A4C86', name: 'Lazurite blue' },
      { hex: '#B0182B', name: 'Red lead' },
      { hex: '#C7A12B', name: 'Orpiment yellow' },
      { hex: '#3C6A4A', name: 'Verdigris green' },
    ],
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
    desc: 'Van Eyck turns domestic stillness into a study in light, texture, symbolism and seeing.',
    medium: 'Oil on oak panel',
    dimensions: '82.2 cm × 60 cm',
    location: 'National Gallery, London (NG186)',
    movement: 'Early Netherlandish (Northern Renaissance)',
    genre: 'Double portrait / interior scene',
    overview:
      "Signed and dated 1434 by Jan van Eyck, the picture shows a richly dressed couple — long identified as the Italian merchant Giovanni di Nicolao Arnolfini and his wife — standing in a Bruges bedchamber. It is one of the earliest oil paintings to render the visible world with near-photographic fidelity.\n\nEvery surface is described with miraculous precision: the brass chandelier, the fur trims, the oranges by the window, the little dog. High on the back wall the artist wrote 'Johannes de eyck fuit hic' — 'Jan van Eyck was here, 1434' — as if signing a legal witness.",
    composition:
      'A vertical, symmetrical interior with the couple joining hands at centre. The convex mirror on the rear wall pulls the whole room — and two extra figures in the doorway — into a tiny reflected world, multiplying the space.',
    technique:
      'Van Eyck exploited the new medium of oil glazes, layering translucent films to achieve depth of colour, soft light and textures impossible in tempera. The mirror reflection is painted in astonishing miniature.',
    symbolism:
      "Scholars debate the meaning: the single lit candle, the dog (fidelity), discarded shoes (sacred ground), oranges (wealth or fertility) and the carved St Margaret (childbirth) suggest marriage, devotion and prosperity — though no documentary 'wedding' is proven.",
    legacy:
      "A touchstone of Western realism and of the 'disguised symbolism' debate. Its mirror reflection has fascinated artists from Velázquez to modern photographers.",
    facts: [
      "The Latin inscription reads 'Jan van Eyck was here 1434', signed like a legal witness.",
      'The convex mirror reflects two figures standing where the viewer stands.',
      "Ten tiny scenes of the Passion ring the mirror's frame, each smaller than a fingernail.",
      "The single burning candle in full daylight has been read as a symbol of God's presence.",
      'The woman is not pregnant — she is holding up the heavy folds of a fashionable gown.',
    ],
    palette: [
      { hex: '#4E5D2E', name: 'Bottle green' },
      { hex: '#7A1F22', name: 'Bed crimson' },
      { hex: '#8C6A38', name: 'Brass' },
      { hex: '#E6D7B4', name: 'Window light' },
    ],
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
    desc: 'Leonardo catches motion and intelligence in a single suspended instant — a portrait that thinks.',
    medium: 'Oil on walnut panel',
    dimensions: '54 cm × 39 cm',
    location: 'Czartoryski Museum, Kraków',
    movement: 'High Renaissance',
    genre: 'Portrait',
    commissionedBy: 'The court of Ludovico Sforza, Duke of Milan',
    overview:
      'Painted around 1489–1491 at the Milanese court, the sitter is Cecilia Gallerani, the young, learned mistress of Duke Ludovico Sforza. She turns sharply to her left as if following a voice beyond the frame, the white ermine twisting in her arms with the same alert energy.\n\nIt is one of only four surviving portraits of women by Leonardo, and arguably the first modern portrait — a likeness that records not just features but a mind in motion.',
    composition:
      'A three-quarter figure set against a dark field, built on a spiral: shoulders one way, head another, the animal echoing the turn. The raised, elongated hand draws the eye along the diagonal.',
    technique:
      "Thin oil glazes over a precise underdrawing model the face with Leonardo's soft gradations of light. Scientific imaging shows he revised the composition twice — the ermine was added and enlarged in stages.",
    symbolism:
      "The ermine was an emblem of purity and moderation, and a pun twice over: 'galée' (Greek for ermine) echoes Gallerani, and Ludovico himself bore the Order of the Ermine. The animal is the duke, held close.",
    legacy:
      "Smuggled, hidden and looted across Polish history — including seizure by the Nazis — the painting survived to become Poland's most treasured artwork and a touchstone of Renaissance portraiture.",
    facts: [
      'Cecilia Gallerani was about sixteen when Leonardo painted her.',
      "The background was overpainted black in the 19th century; it was originally a bluish grey.",
      'X-ray studies revealed two earlier versions beneath the final ermine.',
      'During World War II the painting was looted by the Nazis and hung in the office of Hans Frank.',
      'It is one of only four female portraits by Leonardo to survive.',
    ],
    palette: [
      { hex: '#101012', name: 'Court black' },
      { hex: '#B0353C', name: 'Sleeve carmine' },
      { hex: '#3E5A8C', name: 'Mantle blue' },
      { hex: '#E8DDC8', name: 'Ermine white' },
    ],
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
    desc: "The instant after 'one of you will betray me' — drama organized by geometry.",
    medium: 'Tempera and oil on plaster',
    dimensions: '460 cm × 880 cm',
    location: 'Santa Maria delle Grazie, Milan',
    movement: 'High Renaissance',
    genre: 'Religious mural — refectory scene',
    commissionedBy: 'Ludovico Sforza, Duke of Milan',
    overview:
      'Painted between 1495 and 1498 on the refectory wall of a Dominican convent, the mural captures the moment Christ announces that one of the twelve will betray him. The apostles erupt in waves of disbelief, protest and guilt while Christ remains the still centre.\n\nLeonardo abandoned the traditional frieze of haloed saints for a study in group psychology: each apostle reacts according to his character, grouped in agitated trios that ripple outward from the calm triangle of Christ.',
    composition:
      "One-point perspective converges exactly on Christ's head, so the painted room extends the real refectory. The twelve are bound into four groups of three, their gestures sweeping toward and away from the centre.",
    technique:
      'Leonardo rejected true fresco, which dries too fast for his deliberate manner, and painted on dry plaster with an experimental tempera-oil mix. It gave him subtlety — and doomed the surface, which began flaking within decades.',
    symbolism:
      'Christ’s outspread hands point to bread and wine, instituting the Eucharist even as betrayal is announced. Judas, clutching his purse, recoils into shadow on the same side of the table as everyone else — a break with tradition.',
    legacy:
      'Endlessly copied, parodied and restored, it remains the most famous depiction of the scene in Western art. The 1999 restoration removed centuries of overpaint, recovering what little of Leonardo’s hand survives.',
    facts: [
      'A door was cut through the bottom of the mural in 1652, destroying Christ’s feet.',
      'The refectory was bombed in 1943; the mural survived behind sandbags while the roof fell.',
      'Because of Leonardo’s experimental technique, restoration began as early as 1726.',
      'The 1978–1999 restoration took more than twice as long as the painting itself.',
      'Napoleon’s troops used the refectory as a stable.',
    ],
    palette: [
      { hex: '#27435F', name: 'Robe blue' },
      { hex: '#8C2F28', name: 'Mantle red' },
      { hex: '#C8B68C', name: 'Refectory light' },
      { hex: '#5C4A33', name: 'Tablecloth umber' },
    ],
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
    desc: 'The boldest claim ever painted that the artist is a creator in his own right.',
    medium: 'Oil on lime panel',
    dimensions: '67.1 cm × 48.9 cm',
    location: 'Alte Pinakothek, Munich',
    movement: 'German Renaissance',
    genre: 'Self-portrait',
    overview:
      "Painted in 1500, when Dürer turned twenty-eight, this is the third and most radical of his self-portraits. He faces the viewer in strict frontality — a pose reserved until then for Christ and saints — in a fur-trimmed coat, his long hair arranged in deliberate symmetry.\n\nThe Latin inscription beside his monogram declares that he 'painted himself thus, with undying colours' — an artist presenting his own image with the permanence of an icon.",
    composition:
      'Perfect frontal symmetry on a dark, depthless ground, the raised hand touching the fur collar where a blessing hand would rest in an icon of Christ. The famous AD monogram floats at eye level like a seal.',
    technique:
      'Minute oil handling renders every hair of fur and beard individually; the luminous flesh is built in thin layers over a precise drawing. Dürer’s training as a goldsmith and engraver shows in the metallic exactness of detail.',
    symbolism:
      'The Christ-like pose is not blasphemy but theology: man made in God’s image, and the artist as creator. Painted at the half-millennium of 1500, it doubles as a manifesto for the new dignity of the artist.',
    legacy:
      'The most discussed self-portrait of the Northern Renaissance, and the ancestor of every artist who has painted themselves as more than a craftsman.',
    facts: [
      'Frontal poses were reserved for sacred images — Dürer claimed one for an artist.',
      'The inscription dates the work precisely to the symbolic year 1500.',
      'Dürer was internationally famous for his prints before he was thirty.',
      'The panel stayed in Nuremberg’s town hall for centuries as a civic relic.',
      'His AD monogram became one of the first trademarks in art history.',
    ],
    palette: [
      { hex: '#1A140F', name: 'Icon dark' },
      { hex: '#8C5A2B', name: 'Fur brown' },
      { hex: '#D9B98C', name: 'Flesh light' },
      { hex: '#6B4A2B', name: 'Auburn hair' },
    ],
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
    desc: "Leonardo's sfumato softens every edge into atmosphere, making her expression seem alive and perpetually unresolved.",
    medium: 'Oil on poplar panel',
    dimensions: '77 cm × 53 cm',
    location: 'Musée du Louvre, Paris (INV. 779)',
    movement: 'High Renaissance',
    genre: 'Portrait',
    commissionedBy: 'Possibly Francesco del Giocondo (debated)',
    overview:
      "Begun around 1503, Leonardo da Vinci carried the small poplar panel with him for years, refining it until his death in 1519. The sitter is generally identified as Lisa Gherardini, wife of the Florentine merchant Francesco del Giocondo — hence 'La Gioconda'.\n\nHer half-smile, the soft modelling of the face and the dreamlike mountain landscape behind her made the portrait revolutionary. Leonardo set the figure in a relaxed three-quarter pose with hands gently folded — a template for portraiture for centuries.",
    composition:
      'A stable pyramidal form: the body turns one way, the face another, the eyes toward us. An imaginary, hazy landscape with winding paths and a high horizon recedes behind her, the two sides subtly mismatched.',
    technique:
      "Leonardo's sfumato builds the face from dozens of translucent glazes, some only a few microns thick, so transitions of light and shade dissolve without any visible line — the source of her elusive expression.",
    symbolism:
      'The ambiguous smile and the wild, primordial landscape have invited endless interpretation, from a meditation on nature and humanity to a hidden self-portrait. No contemporary documents settle her identity beyond doubt.',
    legacy:
      "The most famous painting in the world, drawing millions to the Louvre yearly. Its fame was sealed by the 1911 theft and amplified by Duchamp's parody and endless reproduction.",
    facts: [
      'Leonardo never delivered it — he kept and reworked it for some sixteen years.',
      'The 1911 theft, not the painting alone, turned it into a global icon.',
      'She has no visible eyebrows; analysis suggests they may have faded.',
      'Her smile reads differently depending on whether you look at her eyes or her mouth.',
      'It hangs alone behind climate-controlled glass and is never loaned.',
    ],
    palette: [
      { hex: '#6B5536', name: 'Umber shadow' },
      { hex: '#C9A66B', name: 'Warm flesh' },
      { hex: '#3E4A3A', name: 'Sfumato green' },
      { hex: '#8FA0A0', name: 'Hazy blue' },
    ],
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
    desc: 'Raphael painted philosophy itself as architecture.',
    medium: 'Fresco',
    dimensions: 'Base about 770 cm wide',
    location: 'Stanza della Segnatura, Vatican',
    movement: 'High Renaissance',
    genre: 'Allegorical fresco',
    commissionedBy: 'Pope Julius II',
    overview:
      'Painted between 1509 and 1511 for the private library of Pope Julius II, the fresco gathers the great thinkers of antiquity beneath a soaring barrel vault. At the centre Plato points upward to the realm of ideas while Aristotle gestures to the earth — the two poles of Western thought in a single stride.\n\nAround them Raphael arranged Pythagoras, Euclid, Ptolemy, Diogenes and dozens more, many wearing the faces of his contemporaries: Plato is Leonardo, Heraclitus broods with the features of Michelangelo, and Raphael himself watches from the right edge.',
    composition:
      'Rigorous one-point perspective drives through receding arches to the open sky between Plato and Aristotle. The figures are choreographed in conversational clusters along two stepped levels, balanced left and right like the halves of an argument.',
    technique:
      'True buon fresco painted in giornate — patches of fresh plaster completed day by day. The architecture, probably informed by Bramante’s plans for new St Peter’s, is rendered with a draughtsman’s precision.',
    symbolism:
      'Each figure embodies a discipline of rational knowledge, mirroring the theology, poetry and law painted on the room’s other walls. The statues of Apollo and Minerva preside over the arts and wisdom.',
    legacy:
      'The defining image of the Renaissance synthesis of classical and Christian learning, reproduced in classrooms ever since — the group portrait of Western philosophy.',
    facts: [
      'Heraclitus, leaning on a marble block, was added late — a tribute to Michelangelo, then painting the Sistine ceiling nearby.',
      'Raphael painted his own face among the philosophers, looking out at the viewer.',
      'Plato is widely believed to carry the features of Leonardo da Vinci.',
      'Raphael was about twenty-six when he began the commission.',
      'The fresco decorates what was the pope’s private library.',
    ],
    palette: [
      { hex: '#B5803C', name: 'Vault gold' },
      { hex: '#7A2E2A', name: 'Philosopher red' },
      { hex: '#4A6B8C', name: 'Sky through arch' },
      { hex: '#CDC3AE', name: 'Marble' },
    ],
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
    desc: 'Restraint as elegance — Raphael paints his friend with the grace Castiglione preached.',
    medium: 'Oil on canvas (transferred from panel)',
    dimensions: '82 cm × 67 cm',
    location: 'Musée du Louvre, Paris',
    movement: 'High Renaissance',
    genre: 'Portrait',
    overview:
      "Painted around 1514–1515, the sitter is Baldassare Castiglione — diplomat, humanist and author of 'The Book of the Courtier', the era's manual of graceful conduct. Raphael, his close friend, portrays him in a restrained harmony of greys, blacks and whites.\n\nThe portrait embodies the very ideal Castiglione named 'sprezzatura': studied effortlessness. Nothing dazzles, everything persuades — the soft beard, the steady blue-grey gaze, the velvet beret tilted just so.",
    composition:
      'A half-length figure in three-quarter view against a plain warm ground, hands quietly folded — a composition learned from the Mona Lisa, pared back to essentials.',
    technique:
      'Subtle oil modelling renders fur, velvet and linen in a narrow tonal range, proving how much colour lives inside grey. The light falls evenly, without theatrical shadow.',
    symbolism:
      'The sober dress is itself the message: true nobility, in Castiglione’s philosophy, shows in measure rather than display. The portrait is the book made visible.',
    legacy:
      'Admired and copied by Titian, Rembrandt — who sketched it at auction in 1639 — and Matisse, it set the standard for the understated portrait of the intellectual.',
    facts: [
      "Rembrandt drew a quick copy when the portrait was auctioned in Amsterdam in 1639.",
      'Castiglione and Raphael were close friends; the painter consulted him on classical scholarship.',
      "'The Book of the Courtier' was published in 1528, a year before Castiglione's death.",
      'Cézanne and Matisse both made copies after it in the Louvre.',
      'The painting was transferred from its original panel to canvas in the 18th century.',
    ],
    palette: [
      { hex: '#3A3A3C', name: 'Velvet grey' },
      { hex: '#1C1A18', name: 'Beret black' },
      { hex: '#D9CDB8', name: 'Linen white' },
      { hex: '#8C7A5C', name: 'Warm ground' },
    ],
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
    desc: 'A biblical miracle staged as a Venetian feast — the noisiest silence in painting.',
    medium: 'Oil on canvas',
    dimensions: '677 cm × 994 cm',
    location: 'Musée du Louvre, Paris',
    movement: 'Venetian Renaissance / Mannerism',
    genre: 'Religious banquet scene',
    commissionedBy: 'The Benedictine monastery of San Giorgio Maggiore, Venice',
    overview:
      'Commissioned in 1562 for the refectory of San Giorgio Maggiore and finished in fifteen months, the canvas stages Christ’s first miracle — water turned to wine — as a sumptuous Venetian wedding banquet with more than a hundred guests, musicians, servants, dogs and parrots.\n\nChrist sits calm and haloed at the exact centre of the uproar, while around him sixteenth-century Venice eats, pours and gossips in silk. Sacred story and worldly spectacle share one enormous table.',
    composition:
      'A frieze of figures across the foreground table, a second tier at the balustrade, and classical architecture opening to a luminous sky. The musicians in the foreground — portraits of Veronese and his fellow painters — anchor the centre beneath Christ.',
    technique:
      'Veronese’s shimmering Venetian palette plays silver, lemon and sea-green silks against cool marble. The sheer scale demanded studio assistants, yet the surface keeps his swift, confident touch.',
    symbolism:
      'Above Christ, servants butcher a lamb — the feast’s hidden Eucharistic omen. An hourglass on the musicians’ table counts down worldly pleasure even as the wine flows.',
    legacy:
      'Looted by Napoleon’s army in 1797, rolled like a carpet and shipped to Paris, it now faces the Mona Lisa — the largest painting in the Louvre, and the eternal scene-stealer of that room.',
    facts: [
      'At nearly 70 square metres it is the largest painting in the Louvre.',
      'Napoleon’s troops cut it from its frame in Venice in 1797 and rolled it for transport.',
      'The foreground musicians are said to portray Veronese, Titian, Tintoretto and Bassano.',
      'More than a hundred figures crowd the canvas.',
      'A facsimile now hangs in its original Venetian refectory.',
    ],
    palette: [
      { hex: '#7A9CB0', name: 'Venetian sky' },
      { hex: '#B03A30', name: 'Feast crimson' },
      { hex: '#C9B26B', name: 'Silk gold' },
      { hex: '#D8D2C4', name: 'Marble white' },
    ],
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
    desc: 'A group portrait reimagined as theatre, momentum and chiaroscuro in motion.',
    medium: 'Oil on canvas',
    dimensions: '363 cm × 437 cm (after 17th-c. trimming)',
    location: 'Rijksmuseum, Amsterdam (SK-C-5)',
    movement: 'Dutch Golden Age / Baroque',
    genre: 'Group portrait / militia piece',
    commissionedBy: 'The civic militia company of Captain Frans Banninck Cocq',
    overview:
      "Completed by Rembrandt van Rijn in 1642, the enormous canvas portrays a company of Amsterdam civic guards. Rembrandt shattered the convention of the static, evenly-lit group portrait, instead catching the militia in the very act of surging into action.\n\nCaptain Banninck Cocq, in black with a red sash, strides forward giving an order; light blazes on his lieutenant in gold and on a mysterious illuminated girl. Around them muskets are loaded, a drum beats, a dog barks — chaos welded into a single dynamic instant.",
    composition:
      'A diagonal, deep-stage arrangement leads the eye from the dark archway into the advancing front rank. Rembrandt used dramatic spotlighting to rank the figures by light rather than by row, defying the equal billing his patrons paid for.',
    technique:
      "Bold, varied brushwork ranges from thick impasto highlights to thin, shadowy glazes. The pervasive gloom is partly later darkened varnish — it is a daytime scene, the 'Night Watch' nickname a later mistake.",
    symbolism:
      "The little glowing girl wears a dead chicken at her belt whose claws echo the militia's emblem; she may be a living mascot or allegory of the company. The interplay of light and dark dramatises civic duty and vigilance.",
    legacy:
      "Rembrandt's most famous work and a national symbol of the Netherlands. 'Operation Night Watch', a public conservation project begun in 2019, has used AI and scanning to reconstruct its lost edges.",
    facts: [
      'It is not a night scene at all — darkened varnish created the illusion that named it.',
      'It was cut down in 1715; a small old copy preserves the missing figures.',
      'Each guard reportedly paid toward his place, yet Rembrandt lit some far more prominently than others.',
      "A mysterious illuminated girl carries a dead chicken whose claws echo the militia's emblem.",
      'It has survived a knife attack, an acid attack and a slashing across nearly four centuries.',
    ],
    palette: [
      { hex: '#1C140C', name: 'Shadow brown' },
      { hex: '#B8862E', name: 'Lieutenant gold' },
      { hex: '#7A1E1E', name: 'Sash red' },
      { hex: '#D8C28A', name: 'Spotlit cream' },
    ],
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
    desc: 'Vermeer’s home town after a rain shower, doubled in still harbour water.',
    medium: 'Oil on canvas',
    dimensions: '96.5 cm × 115.7 cm',
    location: 'Mauritshuis, The Hague',
    movement: 'Dutch Golden Age / Baroque',
    genre: 'Cityscape',
    overview:
      'Painted around 1660–1661 from an upper room across the harbour, the canvas shows Delft in raking morning light after rain: dark gates and bridges in shadow, the sunlit tower of the Nieuwe Kerk glowing beyond, clouds rolling away.\n\nIt is one of only two outdoor scenes Vermeer left, and the rare seventeenth-century cityscape that feels less like topography than like weather remembered — a specific Tuesday morning preserved for four centuries.',
    composition:
      'Three calm horizontal bands — water, town, sky — with the city wall stretched like a frieze between its reflections and the towering cloudscape that fills more than half the canvas.',
    technique:
      'Vermeer threads tiny globules of thick paint along the lit roofs and rigging, catching sparkle the way a lens catches highlights — one reason some scholars suspect he studied images from a camera obscura.',
    symbolism:
      'The sunlit Nieuwe Kerk — burial place of the princes of Orange — rises bright above the shadowed gates, often read as quiet civic and spiritual hope after the gunpowder disaster that had shattered Delft in 1654.',
    legacy:
      "Marcel Proust, who saw it in 1921, called it 'the most beautiful painting in the world' and gave its 'little patch of yellow wall' a death scene in his novel. It anchored Vermeer's rediscovery.",
    facts: [
      'It is one of only two exterior scenes in Vermeer’s surviving work.',
      'Proust’s narrator Bergotte dies contemplating its little patch of yellow wall.',
      'The clock on the Schiedam Gate reads just past seven in the morning.',
      'Sand mixed into some paint layers makes the lit façades literally glitter.',
      'Bought for the Dutch nation in 1822 for 2,900 guilders.',
    ],
    palette: [
      { hex: '#8FA6B8', name: 'After-rain sky' },
      { hex: '#5C4A38', name: 'Gate shadow' },
      { hex: '#C9A86B', name: 'Sunlit tower' },
      { hex: '#3E5A66', name: 'Harbour water' },
    ],
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
    desc: 'Vermeer distils portraiture into one luminous turning moment, suspended between intimacy and mystery.',
    medium: 'Oil on canvas',
    dimensions: '44.5 cm × 39 cm',
    location: 'Mauritshuis, The Hague (inv. 670)',
    movement: 'Dutch Golden Age / Baroque',
    genre: 'Tronie (character head, not a commissioned portrait)',
    overview:
      "Painted by Johannes Vermeer around 1665, this is not a portrait of a known sitter but a 'tronie' — a study of an exotic, idealised type. A girl in a blue-and-gold turban turns over her shoulder toward us, lips slightly parted, a single great pearl catching the light at her ear.\n\nAgainst a deep, dark, empty ground, Vermeer concentrates everything on light: the moist gleam of her eyes, the soft edge of her cheek, and that famous pearl, rendered with just two strokes of white.",
    composition:
      'A tight, intimate close-up against pure darkness, with the head turned in a fleeting glance. The blue turban and its long yellow tail balance the composition and frame the luminous face.',
    technique:
      'Vermeer worked wet-in-wet with subtle glazes, using costly natural ultramarine for the turban. The pearl is an illusion — a soft grey underlayer topped by one bright and one diffused highlight, with no hard outline.',
    symbolism:
      "There is no narrative; the power lies in immediacy and ambiguity. The 'pearl' is probably too large to be real and may be polished glass or tin — its true subject is light itself.",
    legacy:
      "Now an icon of intimacy and mystery, popularised further by Tracy Chevalier's 1999 novel and the 2003 film. Recent scientific study mapped its pigments in microscopic detail.",
    facts: [
      "It is not a portrait but a 'tronie' — an imagined character study.",
      'The pearl is painted with essentially two brushstrokes of white and no outline.',
      'Recent analysis shows the black background was once a deep green curtain.',
      'Vermeer left only about 36 paintings and was nearly forgotten for 200 years.',
      "The 'pearl' is likely too big to be genuine and may represent polished glass.",
    ],
    palette: [
      { hex: '#1B1B1A', name: 'Void black' },
      { hex: '#2C4C8C', name: 'Ultramarine turban' },
      { hex: '#C9A23A', name: 'Golden cloth' },
      { hex: '#E5C9A8', name: 'Lit skin' },
    ],
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
    desc: 'Vermeer’s smallest canvas, and perhaps his most concentrated act of attention.',
    medium: 'Oil on canvas, mounted on panel',
    dimensions: '24.5 cm × 21 cm',
    location: 'Musée du Louvre, Paris',
    movement: 'Dutch Golden Age / Baroque',
    genre: 'Genre scene',
    overview:
      'Painted around 1669–1670, Vermeer’s smallest picture shows a young woman bent close over her lace pillow, bobbins and pins in hand, the whole world narrowed to a few centimetres of thread.\n\nThe viewer is pulled to the same nearness as the worker: foreground threads blur as if seen out of focus while the lace itself stays sharp — an optical intimacy no painter had attempted before.',
    composition:
      'A compact pyramid of concentration: bowed head, working hands and cushion locked into the centre, cropped close like a glance over her shoulder.',
    technique:
      'Vermeer paints the spilling red and white threads as almost abstract ribbons of liquid colour — wet dots and trails that anticipate painting two centuries ahead. The selective blur mimics a lens’s shallow depth of field.',
    symbolism:
      'Lacemaking was an emblem of domestic virtue and patient diligence; the sewing cushion and the quiet absorption make industry itself the subject.',
    legacy:
      'Renoir reportedly called it one of the two most beautiful paintings in the world, and Dalí painted obsessive copies — a tiny canvas with an outsized afterlife.',
    facts: [
      'At 24.5 × 21 cm it is Vermeer’s smallest known painting.',
      'The foreground threads are deliberately out of focus — a lens-like effect.',
      'Salvador Dalí made a paranoiac copy of it in 1955.',
      'The lacemaker works on bobbin lace, a luxury craft of the Dutch Golden Age.',
      'Acquired by the Louvre in 1870.',
    ],
    palette: [
      { hex: '#C9B26B', name: 'Lit yellow bodice' },
      { hex: '#B03A30', name: 'Spilled red thread' },
      { hex: '#3E4A5C', name: 'Cushion blue' },
      { hex: '#D8CDB8', name: 'Lace white' },
    ],
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
