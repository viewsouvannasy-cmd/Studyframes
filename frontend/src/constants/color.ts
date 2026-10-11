export const STUDY_CARD_COLOR_PATTERNS = {
  blue: { bg: "#D1E0F7", stroke: "#274B8F", blur: "#91BDFF" },
  violet: { bg: "#E4DBFB", stroke: "#5B3FA0", blur: "#AF8FFF" },
  green: { bg: "#D6F0DE", stroke: "#1F7A45", blur: "#8FFFB1" },
  amber: { bg: "#FBE8C6", stroke: "#9A5B12", blur: "#FFD78F" },
  rose: { bg: "#FADCE1", stroke: "#A63A54", blur: "#FF8FA1" },
  teal: { bg: "#D3F1EE", stroke: "#146B63", blur: "#8FFFF4" },
} as const;

export type StudyCardColorKey = keyof typeof STUDY_CARD_COLOR_PATTERNS;
