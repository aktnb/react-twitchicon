import { searchUsers } from '@/app/actions';
import { TwitchUser } from '@/models/twitchUser/twitchUser';
import { useState } from 'react';
import { TwitchUserInfo } from './TwitchUserInfo';

type Params = {
  addUser: (user: TwitchUser) => void;
};

export function UserSearch({ addUser }: Params) {
  const [word, setWord] = useState<string>('');
  const [user, setUser] = useState<TwitchUser|null>(null);

  async function search() {
    const user = await searchUsers([word]);
    setWord('');
    if (user.length === 0) return;
    setUser(user[0]);
    console.log(user[0]);
  }

  function handleAddButton() {
    if (!user) return;
    addUser(user);
    setUser(null);
  }

  return (
    <div>
      <div>
        <input type='text'
          onChange={(e) => setWord(e.target.value)} value={word}
          className='input input-bordered w-full max-w-xs'
          placeholder='username here'
        />
        <button className='ms-1 btn btn-outline btn-primary' onClick={() => search()}>
          検索
        </button>
      </div>
      <div className='relative h-[300px]'>
        {user && <div className='absolute top-0 left-0'>
          <TwitchUserInfo user={user}/>
          <button className='btn btn-outline btn-primary'
            onClick={() => handleAddButton()}>追加</button>
        </div>}
      </div>
    </div>
  );
}
