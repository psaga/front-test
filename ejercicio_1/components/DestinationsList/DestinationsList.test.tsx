import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DestinationsList } from '@/components/DestinationsList/DestinationsList';
import { Location } from '@/utils/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DestionationsList', () => {
  it('render the destionations list', () => {
    const locations = [
      {
        id: 1,
        countryId: 1,
        name: 'Buenos Aires',
        latitude: '-34.61315',
        longitude: '-58.37723',
      },
      {
        id: 2,
        countryId: 2,
        name: 'Paris',
        latitude: '48.8584',
        longitude: '2.2945',
      },
    ];
    render(<DestinationsList locations={locations} />);

    const firstCity = screen.getByLabelText(locations[0].name);
    const secondCity = screen.getByLabelText(locations[1].name);

    expect(firstCity).toBeInTheDocument();
    expect(secondCity).toBeInTheDocument();
  });

  it('render the empty destinations list', () => {
    const locations: Location[] = [];
    render(<DestinationsList locations={locations} />);

    const emptyListMessage = screen.getByLabelText('No destinations available');

    expect(emptyListMessage).toBeInTheDocument();
  });
});
