/** Single-stroke drawings (drawn by LineArt). Kept out of the client component so server components can read them. */
export type Stroke = { d: string; accent?: boolean; fill?: boolean };

/** The drawings used across the home page. */
export const art = {
  book: [
    { d: "M80 54 C 62 44, 38 42, 18 48 L18 128 C 38 122, 62 124, 80 134 Z", fill: true },
    { d: "M80 54 C 98 44, 122 42, 142 48 L142 128 C 122 122, 98 124, 80 134 Z", fill: true },
    { d: "M80 54 L80 134" },
    { d: "M32 70 C 46 66, 58 67, 68 72" },
    { d: "M32 86 C 46 82, 58 83, 68 88" },
    { d: "M92 72 C 102 67, 114 66, 128 70" },
    { d: "M92 88 C 102 83, 114 82, 128 86" },
    { d: "M80 14 C 73 25, 73 32, 80 39 C 87 32, 87 25, 80 14 Z", accent: true, fill: true },
  ],
  care: [
    { d: "M80 74 C 70 54, 42 58, 48 80 C 52 94, 80 108, 80 108 C 80 108, 108 94, 112 80 C 118 58, 90 54, 80 74 Z", accent: true, fill: true },
    { d: "M22 100 C 34 124, 56 138, 80 138 C 104 138, 126 124, 138 100" },
    { d: "M22 100 C 18 90, 26 84, 34 92 L44 104" },
    { d: "M138 100 C 142 90, 134 84, 126 92 L116 104" },
    { d: "M58 22 L62 34 M80 14 L80 28 M102 22 L98 34", accent: true },
  ],
  globe: [
    { d: "M80 50 A 42 42 0 1 0 80.01 50 Z", fill: true },
    { d: "M80 50 C 60 72, 60 112, 80 134 C 100 112, 100 72, 80 50" },
    { d: "M40 80 C 60 88, 100 88, 120 80" },
    { d: "M40 104 C 60 96, 100 96, 120 104" },
    { d: "M80 50 L80 20", accent: true },
    { d: "M80 34 C 70 24, 60 26, 58 34 C 66 40, 76 40, 80 34 Z", accent: true, fill: true },
    { d: "M80 28 C 90 18, 100 20, 102 28 C 94 34, 84 34, 80 28 Z", accent: true, fill: true },
  ],
  hands: [
    { d: "M20 150 C 40 150, 52 140, 62 126 L90 96 C 96 89, 88 80, 80 86 L64 102" },
    { d: "M62 126 L50 112 C 44 104, 50 96, 58 100" },
    { d: "M220 150 C 200 150, 188 140, 178 126 L150 96 C 144 89, 152 80, 160 86 L176 102" },
    { d: "M178 126 L190 112 C 196 104, 190 96, 182 100" },
    { d: "M120 104 C 106 104, 98 94, 104 82 C 110 72, 130 72, 136 82 C 142 94, 134 104, 120 104 Z", accent: true, fill: true },
    { d: "M120 76 L120 46", accent: true },
    { d: "M120 58 C 110 48, 98 50, 96 58 C 104 64, 114 64, 120 58 Z", accent: true, fill: true },
    { d: "M120 52 C 130 42, 142 44, 144 52 C 136 58, 126 58, 120 52 Z", accent: true, fill: true },
    { d: "M100 30 L104 40 M120 20 L120 32 M140 30 L136 40" },
  ],
} satisfies Record<string, Stroke[]>;
