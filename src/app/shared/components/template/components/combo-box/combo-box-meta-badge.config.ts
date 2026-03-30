import { IAnswerOption } from "src/app/shared/utils";

/** Fallback values when a field is missing on an answer option (not default key names). */
export const OPTION_META_BADGE_VALUE_DEFAULTS = {
  color: "primary",
} as const;

export type OptionMetaBadgeConfig = {
  /** Property key on each answer option for badge label text. */
  textKey: string;
  /** Property key on each answer option for ion-chip color. */
  colorKey: string;
  valueDefaults: typeof OPTION_META_BADGE_VALUE_DEFAULTS;
};

export function resolveOptionMetaBadgeColor(
  cfg: OptionMetaBadgeConfig,
  option: IAnswerOption
): string {
  const key = cfg.colorKey;
  if (!key) return cfg.valueDefaults.color;
  const raw = option[key];
  return raw != null && raw !== "" ? String(raw) : cfg.valueDefaults.color;
}
