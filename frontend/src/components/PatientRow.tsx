import { FC } from 'react';
import { Patient } from '../types';
import Avatar from './Avatar';

import positiveIcon from '../assets/positive.svg';
import neutralIcon  from '../assets/neutral.svg';
import negativeIcon from '../assets/negative.svg';

const iconMap: Record<Patient['satisfaction'], string> = {
  positive: positiveIcon,
  neutral : neutralIcon,
  negative: negativeIcon,
};

interface Props { patient: Patient }

const PatientRow: FC<Props> = ({ patient }) => (
  <li
    role="row"
    className="grid grid-cols-[auto_var(--name-col)_minmax(48px,80px)_minmax(96px,140px)_48px] items-center gap-3 py-3 px-2"
  >
    <Avatar name={patient.name} />

    <div role="cell" className="flex flex-col">
      <span className="text-[11px] leading-none text-gray-400">Name</span>
      <span className="text-sm font-medium break-words">{patient.name}</span>
    </div>

    {/* ─── Scans ─── (placeholder 8) */}
    <div role="cell" className="flex flex-col items-center text-center">
      <span className="text-[11px] leading-none text-gray-400">Scans</span>
      <span className="text-sm text-gray-600">8</span>
    </div>

    <div role="cell" className="flex flex-col items-center">
      <span className="text-[11px] leading-none text-gray-400">Last&nbsp;Comm.</span>
      <span className="text-sm text-gray-600">
        {new Date(patient.lastCommunicationDate).toLocaleDateString()}
      </span>
    </div>

    <div role="cell" className="flex flex-col items-center justify-self-center">
      <span className="text-[11px] leading-none text-gray-400">Mood</span>
      <img src={iconMap[patient.satisfaction]} alt={patient.satisfaction} className="w-5 h-5" />
    </div>
  </li>
);

export default PatientRow;