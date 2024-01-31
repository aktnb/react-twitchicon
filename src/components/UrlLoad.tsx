import { searchUsers } from '@/app/actions';
import { TwitchUser } from '@/models/twitchUser/twitchUser';
import { useEffect, useState } from 'react'

type Params = {
  setUsers: (users: TwitchUser[]) => void;
  token: string;
}

function getUrl(token: string) {
  if ('' === token) return '';
  let port = '';
  if (window.location.port !== '80' && window.location.port !== '443') {
    port = ':' + window.location.port;
  }
  return window.location.hostname
    + port
    + '/viewer?q=' + token;
}

export function UrlLoad({ setUsers, token }: Params) {
  const [url, setUrl] = useState<string>(getUrl(token));

  async function search() {
    const text = url.split(/\?q=/).reverse()[0];
    console.log(text);
    const user = await searchUsers(text.split(/\./));
    setUrl(getUrl(token));
    if (user.length === 0) return;
    setUsers(user);
    console.log(user);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      alert('URLをクリップボードに保存しました'); 
    } catch (error) {
      alert('失敗しました');
    }
  }

  useEffect(() => {
    setUrl(getUrl(token));
  }, [token]);

  return (
    <div>
      <input type='text'
        onChange={(e) => setUrl(e.target.value)} value={url}
        className='input input-bordered w-full max-w-xs'
        placeholder='viewer url here'
      />
      <button
        className='ms-1 btn btn-outline'
        onClick={() => copy()}
      >
        コピー
      </button>
      <button
        className='ms-1 btn btn-outline btn-secondary'
        onClick={() => search()}
      >
        読み込み
      </button>
    </div>
  )
}
