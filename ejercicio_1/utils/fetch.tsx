const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL_BASE;

export async function fetcher<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = API_URL_BASE + path;
  const fetchOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'content-type': 'application/json',
    },
    ...options,
  };
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${options.method} ${url}`);
  }
  const data: T = await response.json();
  return data;
}

export default fetcher;
