'use server';
import fetcher from '@/utils/fetch';
import { LocationForm } from '@/components/LocationForm/LocationForm';
import { Country } from '@/utils/types';

export default async function Destination() {
  const countries = await fetcher<Country[]>('countries', { next: { tags: ['countries'] } });

  return <LocationForm countries={countries} />;
}
