import type { CSSProperties, SVGAttributes } from 'react';
import { strokeIcons, fillIcons, type IconName, type FillIconName } from './paths';

export type { IconName, FillIconName };

/** Size tokens of the 3c. semantic.layout collection (size/4xs … size/5xl). */
export type SizeToken = '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'fill' | 'strokeWidth'> {
  /** Figma icon name (Phosphor set), e.g. "CaretRight". */
  name: IconName;
  /** Size token (default "3xs" = 16 px) or a pixel number. */
  size?: SizeToken | number;
  /**
   * Figma rule: an icon next to a regular label uses stroke 1.2, next to a medium label 1.5.
   * "regular" → 1.2 px, "medium" → 1.5 px. Overridden by `strokeWidth`.
   */
  weight?: 'regular' | 'medium';
  /** Explicit stroke width in px at the rendered size (vector-effect: non-scaling-stroke). */
  strokeWidth?: number;
  /** Use the filled variant (Figma Format=Outline, Weight=Fill) when the set provides one. */
  fill?: boolean;
  /** Accessible label. Without it the icon is decorative (aria-hidden). */
  label?: string;
}

const sizeCss = (s: SizeToken | number) => (typeof s === 'number' ? `${s}px` : `var(--rv-size-${s})`);

/**
 * Icon — stroke-based SVG mirrored from the Figma icon set (32×32 viewBox).
 * Colour comes from `currentColor`: set `color` on the icon (or its parent) with an icon/* token.
 */
export function Icon({ name, size = '3xs', weight = 'regular', strokeWidth, fill = false, label, style, ...rest }: IconProps) {
  const sw = strokeWidth ?? (weight === 'medium' ? 1.5 : 1.2);
  const px = sizeCss(size);
  const useFill = fill && name in fillIcons;
  const paths: readonly string[] = useFill ? fillIcons[name as FillIconName] : strokeIcons[name];
  const s: CSSProperties = { width: px, height: px, flexShrink: 0, display: 'inline-block', ...style };
  return (
    <svg
      viewBox="0 0 32 32"
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className="rv-icon"
      data-icon={name}
      style={s}
      {...rest}
    >
      {paths.map((d, i) =>
        useFill ? (
          <path key={i} d={d} fill="currentColor" />
        ) : (
          <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        ),
      )}
    </svg>
  );
}
