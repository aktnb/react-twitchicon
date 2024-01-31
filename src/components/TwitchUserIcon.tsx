import { TwitchUser } from '@/models/twitchUser/twitchUser'
import Image from 'next/image';

type Params = {
  user: TwitchUser;
};

export function TwitchUserIcon({ user }: Params) {
  return (
    <div>
      <Image
        src={user.profileImageUrl}
        alt={user.login}
        width={300}
        height={300}
      />
    </div>
  );
}
