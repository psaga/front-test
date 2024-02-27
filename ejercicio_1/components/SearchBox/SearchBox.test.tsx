import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SearchBox } from '@/components/SearchBox/SearchBox';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBox', () => {
  it('render the search box', () => {
    const defaultSearchTerm = 'Test';
    render(<SearchBox defaultSearchTerm={defaultSearchTerm} />);

    const searchInput = screen.getByLabelText('Search Destination');
    const submitButton = screen.getByLabelText('Submit');

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue(defaultSearchTerm);

    expect(submitButton).toBeInTheDocument();
  });
});
