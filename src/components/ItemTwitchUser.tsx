import { TwitchUser } from '@/models/twitchUser/twitchUser'
import Image from 'next/image';

type Props = {
  user: TwitchUser;
  removeUser: (user: TwitchUser) => void;
};

export function ItemTwitchUser({ user, removeUser }: Props) {

  function handleRemoveButton() {
    const confirm = window.confirm(`${user.displayName}のIconを削除しますか？`);
    if (confirm) {
      removeUser(user);
    }
  }

  return (
    <div className='relative group'>
      <Image src={user.profileImageUrl} alt={user.login} width={100} height={100}/>
      <button
        className='absolute m-auto top-0 bottom-0 left-0 right-0 w-fit h-fit invisible group-hover:visible btn btn-outline btn-warning'
        onClick={() => handleRemoveButton()}
      >削除</button>
    </div>
  )
}
