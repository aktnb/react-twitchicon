'use server';

import { searchUsers } from '../actions';
import { TwitchUserIcon } from '@/components/TwitchUserIcon';

export default async function Page({searchParams: { q }}: {searchParams: { q: string }}) {
  if ('' === q) {
    return (<span>URLが不正です</span>);
  }
  const users = q.split(/\?q=/).reverse()[0].split(/\./);
  const tUsers = await searchUsers(users);

  return (
    <div className='flex flex-wrap bg-white/0'>
      { tUsers.map(u => <TwitchUserIcon key={u.id} user={u}/>) }
    </div>
  );
}
