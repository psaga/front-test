'use client';
import React, { FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './component.module.css';

type SearchBoxProps = {
  defaultSearchTerm?: string;
};

export const SearchBox = ({ defaultSearchTerm }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = React.useState(defaultSearchTerm || '');
  const router = useRouter();
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    router.push(`${searchTerm ? `?name_like=${searchTerm}` : '/'}`);
  };
  return (
    <form className={styles.searchForm} onSubmit={submitSearch}>
      <input
        defaultValue={searchTerm}
        className={styles.searchInput}
        placeholder="Destination..."
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search Destination"
      />
      <button type="submit" className={styles.searchButton} aria-label="Submit">
        <Image color="white" src="/search.svg" alt="Search Icon" width={12} height={12} priority={false} />
      </button>
    </form>
  );
};
