'use server';
import fetcher from '@/utils/fetch';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { DestinationsList } from '@/components/DestinationsList/DestinationsList';
import { Country, Location } from '@/utils/types';
import styles from './page.module.css';
import Link from 'next/link';

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomeProps) {
  const { name_like } = searchParams;
  const params = new URLSearchParams();

  if (name_like) {
    params.append('name_like', name_like as string);
  }

  const url = `locations${params.toString() ? `?${params}` : ''}`;
  const locations = await fetcher<Location[]>(url);
  const countries = await fetcher<Country[]>('countries');

  const locationsWithCountryName = locations.map((location) => {
    const country = countries.find((country) => country.id === location.countryId);
    return {
      ...location,
      countryName: country ? country.name : undefined,
    };
  });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <SearchBox defaultSearchTerm={searchParams.name_like as string | undefined} />
        <Link className={styles.createButton} href="/destinations/new">
          Create
        </Link>
      </div>
      <DestinationsList locations={locationsWithCountryName} />
    </main>
  );
}
