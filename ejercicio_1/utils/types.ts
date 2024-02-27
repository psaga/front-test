export type Location = {
  id: number;
  countryId?: number;
  countryName?: string;
  name: string;
  latitude: string;
  longitude: string;
};

export type Country = {
  id: number;
  name: string;
};
