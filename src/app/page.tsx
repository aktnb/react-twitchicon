'use client';

import { ItemTwitchUser } from '@/components/ItemTwitchUser';
import { UrlLoad } from '@/components/UrlLoad';
import { UserSearch } from '@/components/UserSearch';
import { TwitchUser } from '@/models/twitchUser/twitchUser';
import { useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<TwitchUser[]>([]);

  const token = encodeURI(users.map(u => u.login).join('.'));

  function addUser(user: TwitchUser) {
    setUsers([...users, user].filter((u, i, self) => self.findIndex(u2 => u2.id === u.id) === i));
  }
  function removeUser(user: TwitchUser) {
    setUsers([...users.filter(u => u.id !== user.id)]);
  }

  return (
    <main>
      <h2 className='font-bold'>プレビュー用URL</h2>
      <UrlLoad setUsers={setUsers} token={token}/>
      <h2 className='font-bold'>ユーザーを検索する</h2>
      <UserSearch addUser={addUser}/>
      <h2 className='font-bold'>プレビュー</h2>
      <div className='flex flex-wrap'>
        {users.map(u => (
          <ItemTwitchUser key={u.id} user={u} removeUser={removeUser}/>
        ))}
      </div>
    </main>
  );
}
