import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LocationForm } from '@/components/LocationForm/LocationForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LocationForm', () => {
  it('render the form in edit mode', () => {
    const countries = [
      {
        id: 1,
        name: 'Argentina',
      },
      {
        id: 2,
        name: 'Francia',
      },
    ];
    const location = {
      id: 1,
      countryId: 1,
      name: 'Buenos Aires',
      latitude: '-34.61315',
      longitude: '-58.37723',
    };
    render(<LocationForm countries={countries} location={location} />);

    const nameInput = screen.getByLabelText('Name');
    const countrySelect = screen.getByLabelText('Select country');
    const latitudeInput = screen.getByLabelText('Latitude');
    const longitudeInput = screen.getByLabelText('Longitude');

    expect(nameInput).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    expect(latitudeInput).toBeInTheDocument();
    expect(longitudeInput).toBeInTheDocument();

    expect(nameInput).toHaveValue(location.name);
    expect(countrySelect).toHaveValue(location.countryId.toString());
    expect(latitudeInput).toHaveValue(location.latitude);
    expect(longitudeInput).toHaveValue(location.longitude);
  });
});
