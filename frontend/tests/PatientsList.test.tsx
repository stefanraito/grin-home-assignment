import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PatientsList from '../src/components/PatientsList';

const queryClient = new QueryClient();

test('renders loading state', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <PatientsList />
    </QueryClientProvider>,
  );
  expect(screen.getByText(/loading patients/i)).toBeInTheDocument();
});