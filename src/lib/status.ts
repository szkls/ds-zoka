import type { FillIconName } from '../icons/paths';

/** Figma status property shared by Badge, Alert and Banner. */
export type Status = 'information' | 'success' | 'warning' | 'error';

/** Figma default icons per status (icon-information / icon-success / icon-warning / icon-error), filled weight. */
export const statusIcon: Record<Status, FillIconName> = {
  information: 'Info',
  success: 'CheckCircle',
  warning: 'Warning',
  error: 'WarningCircle',
};
