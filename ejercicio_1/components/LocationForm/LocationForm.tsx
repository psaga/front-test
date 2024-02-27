'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import actions from '@/app/actions';
import { POST as postLocation, PUT as putLocation } from '@/app/api/locations/route';
import { POST as postCountry } from '@/app/api/countries/route';
import { Country, Location } from '@/utils/types';
import styles from './component.module.css';

type LocationFormProps = {
  location?: Location;
  countries: Country[];
};

export const LocationForm = ({ location, countries }: LocationFormProps) => {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<Location>({ defaultValues: location });

  const countryId = watch('countryId');

  const alterLocation = async (data: Location) => {
    if (data.countryId === -1) {
      const country = await postCountry(data.countryName as string);
      data.countryId = country.id;
    }
    if (location) {
      if (Object.keys(dirtyFields).length) {
        await putLocation(data);
        actions(['/', `destinations/${location.id}`]);
      }
    } else {
      await postLocation(data);
      actions(['/']);
    }
    router.push('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => alterLocation(data))}>
      <div>
        <label className={styles.fieldName}>Name</label>
        <input
          className={styles.formField}
          type="text"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-label="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
      </div>
      <div>
        <label className={styles.fieldName}>Country</label>
        <select
          className={styles.formField}
          {...register('countryId', { valueAsNumber: true })}
          aria-label="Select country"
        >
          {countries.map((country) => (
            <option value={country.id} key={country.id} aria-label={country.name}>
              {country.name}
            </option>
          ))}
          <option value="-1">Other</option>
        </select>
      </div>
      {countryId === -1 && (
        <div>
          <label className={styles.fieldName}>Country Name</label>
          <input
            className={styles.formField}
            type="text"
            aria-invalid={errors.countryName ? 'true' : 'false'}
            aria-label="New country name"
            {...register('countryName', {
              required: 'Country Name is required',
            })}
          />
          {errors.countryName && <p className={styles.errorMessage}>{errors.countryName.message}</p>}
        </div>
      )}
      <div>
        <label className={styles.fieldName}>Latitude</label>
        <input
          className={styles.formField}
          type="text"
          aria-invalid={errors.latitude ? 'true' : 'false'}
          {...register('latitude', {
            required: 'Latitude is required',
            pattern: { value: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, message: 'Latitude is invalid' },
          })}
          aria-label="Latitude"
        />
        {errors.latitude && <p className={styles.errorMessage}>{errors.latitude.message}</p>}
      </div>
      <div>
        <label className={styles.fieldName}>Longitude</label>
        <input
          className={styles.formField}
          type="text"
          aria-invalid={errors.longitude ? 'true' : 'false'}
          {...register('longitude', {
            required: 'Longitude is required',
            pattern: { value: /^[-+]?((1[0-7]\d|[\d]{1,2})(\.\d+)?|180(\.0+)?)$/, message: 'Longitude is invalid' },
          })}
          aria-label="Longitude"
        />
        {errors.longitude && <p className={styles.errorMessage}>{errors.longitude.message}</p>}
      </div>
      <input type="submit" className={styles.submit} aria-label="Submit" />
    </form>
  );
};
