import { IAnswerOption } from "src/app/shared/utils";
import { snakeToCamel } from "../../utils";

/** Fallback values when a field is missing on an answer option (not default key names). */
export const OPTION_META_BADGE_VALUE_DEFAULTS = {
  color: "primary",
  text: "",
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
  if (!cfg.colorKey.trim()) return cfg.valueDefaults.color;

  /**
   * HACK: Convert to camel case since answer list keys get converted to camel case by zod parser
   * (only if answer_list is passed in directly, not via data_items child rows)
   * TODO: update parser logic?
   */
  const raw = option[cfg.colorKey] || option[snakeToCamel(cfg.colorKey)];
  return raw != null && raw !== "" ? String(raw) : cfg.valueDefaults.color;
}

export function resolveOptionMetaBadgeText(
  cfg: OptionMetaBadgeConfig,
  option: IAnswerOption
): string {
  if (!cfg.textKey.trim()) return cfg.valueDefaults.text;

  /**
   * HACK: Convert to camel case since answer list keys get converted to camel case by zod parser
   * (only if answer_list is passed in directly, not via data_items child rows)
   * TODO: update parser logic?
   */
  const raw = option[cfg.textKey] || option[snakeToCamel(cfg.textKey)];
  return raw != null && raw !== "" ? String(raw) : cfg.valueDefaults.text;
}
