'use server';

import { revalidatePath } from 'next/cache';

export default async function action(paths: string[]) {
  paths.forEach((path) => revalidatePath(path));
}
