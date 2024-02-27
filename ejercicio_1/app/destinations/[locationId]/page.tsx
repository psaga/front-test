'use server';
import fetcher from '@/utils/fetch';
import { LocationForm } from '@/components/LocationForm/LocationForm';
import { Country, Location } from '@/utils/types';

type LocationsProps = {
  params: {
    locationId: string;
  };
};

export default async function Locations({ params }: LocationsProps) {
  const location = await fetcher<Location>(`locations/${params.locationId}`);
  const countries = await fetcher<Country[]>('countries');

  return <LocationForm location={location} countries={countries} />;
}
