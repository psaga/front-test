import fetcher from '@/utils/fetch';
import { Location } from '@/utils/types';

export async function PUT(location: Location) {
  const { id, countryName, ...locationFields } = location;
  await fetcher(`locations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(locationFields),
  });
}

export async function POST(location: Location) {
  const { countryName, ...locationFields } = location;
  await fetcher('locations', {
    method: 'POST',
    body: JSON.stringify(locationFields),
  });
}
