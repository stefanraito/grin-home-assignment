/* eslint react/require-default-props: off */
import { FC, ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ className = '', children }) => (
  <div
    className={`
      bg-white rounded-2xl shadow-sm border border-gray-200
      p-4 flex flex-col gap-4
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;