import Image from 'next/image';
import { TwitchUser } from '@/models/twitchUser/twitchUser'

type Params = {
  user: TwitchUser;
};
export function TwitchUserInfo({ user }: Params) {
  return (
    <div>
      <Image
        src={user.profileImageUrl}
        alt={user.login}
        width={200}
        height={200}
      />
      { user.displayName !== user.login
        ? <span>{ user.displayName }({ user.login })</span>
        : <span>{ user.login }</span>
      }
    </div>
  );
}
