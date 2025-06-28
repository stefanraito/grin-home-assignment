import { useState } from 'react';
import { Patient , PaginatedPatients, Satisfaction } from '../types';
import DateFilter, { RangeKey } from '../components/DateFilter';
import { useStats } from '../hooks/useStats';
import { useSatisfaction } from '../hooks/useSatisfaction';
import { usePatients } from '../hooks/usePatients';
import { rangeToDates } from '../utils/date';

import MetricCard from '../components/MetricCard';
import SatisfactionCard from '../components/SatisfactionCard';
import PatientsFilterChips from '../components/PatientsFilterChips';
import PatientsList from '../components/PatientsList';
import Card from '../components/Card';

import meetingsIcon from '../assets/meetingsIcon.svg';
import tasksIcon from '../assets/tasks.svg';
import brushingIcon from '../assets/brushing.svg';
import likesIcon from '../assets/likes.svg';
import timesavedIcon from '../assets/timesaved.svg';
import instructionsIcon from '../assets/instructions.svg';
import logoSvg from '../assets/logo.svg';

const DashboardPage = () => {
  const [range, setRange] = useState<RangeKey>('7d');
  const [sentiment, setSentiment] =
    useState<'all' | Satisfaction>('all');
  const [from, to] = rangeToDates(range);

  const { data: stats, isLoading } = useStats(from, to);
  const { data: satisfaction } = useSatisfaction(from, to);
  const { data: patientPages } = usePatients(from, to);

  const employees = satisfaction?.employees ?? {
    negative: 0,
    neutral : 0,
    positive: 0,
  };
  const patients = satisfaction?.patients ?? {
    negative: 0,
    neutral : 0,
    positive: 0,
  };

  const listPatients =
    patientPages?.pages.flatMap((page: PaginatedPatients) => page.data) ?? [];
  const listCounts = listPatients.reduce<Record<Satisfaction, number>>(
    (acc: Record<Satisfaction, number>, p: Patient) => {
      acc[p.satisfaction] += 1;
      return acc;
    },
    { negative: 0, neutral: 0, positive: 0 },
  );

  return (
    <>
      <header className="bg-white h-14 shadow-sm flex items-center px-6">
        <img src={logoSvg} alt="Grin logo" className="h-5 w-auto mr-2" />
        <span className="text-lg font-semibold">Grin</span>
      </header>

      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <DateFilter value={range} onChange={setRange} />

        <div className="grid lg:grid-cols-[560px_1fr] gap-6">
          <div className="grid grid-cols-1 lg:[grid-template-columns:280px_280px] gap-4">

            <div className="flex flex-col gap-4">
              <MetricCard icon={<img src={meetingsIcon} className="w-6 h-6" alt="" />} label="Meetings Completed" value={isLoading ? '-' : stats!.liveCalls} />
              <MetricCard icon={<img src={tasksIcon}     className="w-6 h-6" alt="" />} label="Tasks Completed"     value={isLoading ? '-' : stats!.tasks} />
              <MetricCard icon={<img src={brushingIcon}  className="w-6 h-6" alt="" />} label="Brushing"            value={isLoading ? '-' : stats!.brushings} />
              <MetricCard icon={<img src={likesIcon}     className="w-6 h-6" alt="" />} label="Likes"               value={isLoading ? '-' : stats!.likes} />
              <MetricCard icon={<img src={timesavedIcon} className="w-6 h-6" alt="" />} label="Time Saved"
                          value={
                            isLoading
                              ? '-'
                              : `${Math.floor(stats!.timeSavedMinutes / 60)}h ${stats!.timeSavedMinutes % 60}m`
                          } />
            </div>

            <div className="flex flex-col gap-4">
              <MetricCard
                icon={<img src={instructionsIcon} className="w-6 h-6" alt="" />}
                label="Instructions Sent"
                value={isLoading ? '-' : stats!.instructions}
              />
              <SatisfactionCard
                title="Overall Employees Satisfaction"
                counts={employees}
                description="Emotions are mixed among your employees. You might want to reach out to some of them and find out what's on their mind."
              />
              <SatisfactionCard
                title="Overall Patients Satisfaction"
                counts={patients}
                description="Emotions are mixed among your patients. You might want to reach out to some of them and find out what's on their mind."
              />
            </div>

          </div>

          <Card className="h-[664px] overflow-auto">
            <h2 className="text-lg font-semibold mb-2">
              Overall Patients Sentiment
            </h2>
            <PatientsFilterChips
              value={sentiment}
              onChange={setSentiment}
              counts={listCounts}
            />
            <PatientsList from={from} to={to} sentiment={sentiment} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;