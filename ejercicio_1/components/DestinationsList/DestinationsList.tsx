'use client';
import { Location } from '@/utils/types';
import { useRouter } from 'next/navigation';
import styles from './component.module.css';

type DestionationsListProps = {
  locations: Location[];
};

export const DestinationsList = ({ locations }: DestionationsListProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {locations?.length ? (
        <div className={styles.locations}>
          {locations.map((location) => (
            <div
              className={styles.location}
              key={location.id}
              aria-label={location.name}
              onClick={() => router.push(`/destinations/${location.id}`)}
            >
              <div>{location.name}</div>
              <div className={styles.countryName}>{location.countryName}</div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div aria-label="No destinations available">There are no destinations available :(</div>
        </>
      )}
    </div>
  );
};
