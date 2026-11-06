import type { HTMLAttributes, ReactNode } from 'react';
import { Avatar, type AvatarStatus } from './Avatar';
import './Avatar.css';

export interface AvatarUserProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma `name` */
  name: ReactNode;
  /** Figma `show-detail` + `detail` */
  detail?: ReactNode;
  /** Figma `size` — sm (avatar 24) | md (avatar 32) | lg (avatar 40); default "sm" */
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  initials?: string;
  status?: AvatarStatus;
}

/** Avatar user — Figma "Avatar user": avatar + name (medium) + detail (regular, text/neutral/soft). */
export function AvatarUser({ name, detail, size = 'sm', src, initials, status, className, ...rest }: AvatarUserProps) {
  const avatarSize = { sm: 'sm', md: 'md', lg: 'lg' } as const;
  return (
    <span className={['rv-avatar-user', className ?? ''].join(' ').trim()} data-size={size} {...rest}>
      <Avatar type={src ? 'image' : 'initials'} src={src} initials={initials ?? (typeof name === 'string' ? name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase() : 'CL')} size={avatarSize[size]} status={status} alt={typeof name === 'string' ? name : undefined} />
      <span className="rv-avatar-user__text">
        <span className="rv-avatar-user__name">{name}</span>
        {detail && <span className="rv-avatar-user__detail">{detail}</span>}
      </span>
    </span>
  );
}
