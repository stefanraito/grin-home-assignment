/* eslint react/require-default-props: off */
import { FC } from 'react';

interface Props {
  name: string;
  size?: number;
  src?: string;
}

const randomAvatar = (id: string) =>
  `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(id)}`;

const Avatar: FC<Props> = ({ name, size = 40, src }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm overflow-hidden flex-shrink-0"
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={src || randomAvatar(name)}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span>{initials}</span>
    </div>
  );
};

export default Avatar;