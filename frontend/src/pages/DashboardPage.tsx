import { useMemo, useState } from 'react';
import { Satisfaction, Stats } from '../types';

import DateFilter, { RangeKey } from '../components/DateFilter';
import MetricCard from '../components/MetricCard';
import SatisfactionCard from '../components/SatisfactionCard';
import PatientsFilterChips from '../components/PatientsFilterChips';
import PatientsList from '../components/PatientsList';
import Card from '../components/Card';

import { useStats } from '../hooks/useStats';
import { useSatisfaction } from '../hooks/useSatisfaction';
import { usePatients } from '../hooks/usePatients';
import { rangeToDates } from '../utils/date';
import { computeCounts, statVal } from '../utils/utils';
import { metricDefs } from '../data/metricDefs';

import logoSvg from '../assets/logo.svg';

const DashboardPage = () => {

  const [range, setRange] = useState<RangeKey>('7d');
  const [sentiment, setSentiment] = useState<'all' | Satisfaction>('all');
  const [from, to] = rangeToDates(range);

  const { data: stats, isLoading } = useStats(from, to);
  const { data: satisfaction } = useSatisfaction(from, to);
  const { data: patientPages } = usePatients(from, to);

  const employees = satisfaction?.employees ?? {
    negative: 0,
    neutral: 0,
    positive: 0,
  };
  const patients = satisfaction?.patients ?? {
    negative: 0,
    neutral: 0,
    positive: 0,
  };

  const listCounts = useMemo(
    () => computeCounts(patientPages?.pages),
    [patientPages],
  );

  const leftMetrics = metricDefs.filter((m) => m.key !== 'instructions');
  const rightMetric = metricDefs.find((m) => m.key === 'instructions')!;

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
              {leftMetrics.map((m) => (
                <MetricCard
                  key={m.key}
                  icon={<img src={m.icon} className="w-6 h-6" alt="" />}
                  label={m.label}
                  value={statVal(m.key, stats, isLoading)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <MetricCard
                icon={<img src={rightMetric.icon} className="w-6 h-6" alt="" />}
                label={rightMetric.label}
                value={statVal(rightMetric.key, stats, isLoading)}
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
};

export default DashboardPage;