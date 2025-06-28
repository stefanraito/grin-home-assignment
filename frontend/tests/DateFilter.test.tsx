import { render, screen, fireEvent } from '@testing-library/react';
import DateFilter, { RangeKey } from '../src/components/DateFilter';

test('DateFilter switches active button', () => {
  let val: RangeKey = 'today';
  render(<DateFilter value={val} onChange={(v) => (val = v)} />);
  fireEvent.click(screen.getByRole('button', { name: '7D' }));
  expect(val).toBe('7d');
});