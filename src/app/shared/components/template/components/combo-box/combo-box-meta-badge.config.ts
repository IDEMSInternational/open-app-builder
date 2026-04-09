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

  const raw = rawOptionFieldForMetaBadgeKey(option, cfg.colorKey);
  return raw != null && raw !== "" ? String(raw) : cfg.valueDefaults.color;
}

export function resolveOptionMetaBadgeText(
  cfg: OptionMetaBadgeConfig,
  option: IAnswerOption
): string {
  if (!cfg.textKey.trim()) return cfg.valueDefaults.text;

  const raw = rawOptionFieldForMetaBadgeKey(option, cfg.textKey);
  return raw != null && raw !== "" ? String(raw) : cfg.valueDefaults.text;
}

/**
 * HACK: Prefer exact key, then camelCase variant — answer list keys may be normalized to camelCase
 * by the zod parser when answer_list is passed in directly (not via data_items child rows).
 * TODO: update parser logic?
 */
function rawOptionFieldForMetaBadgeKey(option: IAnswerOption, key: string): unknown {
  return option[key] || option[snakeToCamel(key)];
}
