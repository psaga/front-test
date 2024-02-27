import fetcher from '@/utils/fetch';
import { Country } from '@/utils/types';

export async function POST(countryName: string): Promise<Country> {
  const country = await fetcher<Country>('countries', {
    method: 'POST',
    body: JSON.stringify({ name: countryName }),
  });
  return country;
}
