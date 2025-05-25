import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { CategoryScore } from '../../types';
import { categories } from '../../data/categories';

interface Props {
  scores: CategoryScore[];
}

export const ResultChart = ({ scores }: Props): JSX.Element => {
  const data = scores.map((s) => ({
    subject: categories[s.category],
    A: s.percentage,
  }));

  return (
    <RadarChart outerRadius={90} width={300} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Radar name="score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};
