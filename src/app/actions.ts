'use server';

import { getUsers } from '@/repositories/twitchUser/repository';

export async function searchUsers(words: string[]) {
  return await getUsers({ words });
}
