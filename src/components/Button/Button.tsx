import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import './Button.css';

/** Figma: Button › type */
export type ButtonType = 'brand' | 'destructive' | 'static-black' | 'static-white';
/** Figma: Button › style */
export type ButtonStyle = 'filled' | 'stroke' | 'lighter' | 'ghost';
/** Figma: Button › size (md = size/xl 40 px, sm = size/lg 36 px, xs = size/md 32 px) */
export type ButtonSize = 'md' | 'sm' | 'xs';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'style'> {
  /** Figma `label` */
  label?: ReactNode;
  /** Figma `type` — default "brand" */
  type?: ButtonType;
  /** Figma `style` — default "filled" */
  variant?: ButtonStyle;
  /** Figma `size` — default "md" */
  size?: ButtonSize;
  /** Figma `show-icon-left` + `icon-left` */
  iconLeft?: IconName;
  /** Figma `show-icon-right` + `icon-right` */
  iconRight?: IconName;
  /** Figma `icon-only=True` + `icon` — renders a square button with a single icon; `label` becomes the accessible name. */
  icon?: IconName;
  /** Native button type (submit / button / reset). */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Fill the width of the container (Figma instances set to Fill). */
  fullWidth?: boolean;
}

/**
 * Button — Figma "Button" (page ↳ Button).
 * Anatomy: [Icon left 16px] [Label wrap pad 0 2xs, sm/medium] [Icon right 16px]; icons stroke 1.5, same colour as the label.
 * States: hover / focus (focus-ring) / disabled come from CSS; `state` is not a prop.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label = 'Button', type = 'brand', variant = 'filled', size = 'md', iconLeft, iconRight, icon, htmlType = 'button', fullWidth, className, disabled, ...rest },
  ref,
) {
  const iconOnly = icon !== undefined;
  return (
    <button
      ref={ref}
      type={htmlType}
      className={['rv-button', fullWidth ? 'rv-button--full' : '', className ?? ''].join(' ').trim()}
      data-type={type}
      data-style={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      disabled={disabled}
      aria-label={iconOnly && typeof label === 'string' ? label : undefined}
      {...rest}
    >
      {iconOnly ? (
        <Icon name={icon} size="3xs" weight="medium" />
      ) : (
        <>
          {iconLeft && <Icon name={iconLeft} size="3xs" weight="medium" />}
          <span className="rv-button__label">{label}</span>
          {iconRight && <Icon name={iconRight} size="3xs" weight="medium" />}
        </>
      )}
    </button>
  );
});
