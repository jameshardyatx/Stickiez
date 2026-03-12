export const NoteColors = {
    "white": "#d4d4d4",
    "lightblue": "oklch(0.7 0.13 229.46)",
    "purple": "oklch(0.7 0.13 290.52)",
    "lilac": "oklch(0.7 0.13 331.75)",
    "emerald": "oklch(0.7 0.13 176.47)",
    "gold": "oklch(0.7 0.13 105.73)",
    "orange": "oklch(0.7 0.13 63.79)",
    "rose": "oklch(0.7 0.13 18.3)"
} as const;
export type NoteColorKey = keyof typeof NoteColors;