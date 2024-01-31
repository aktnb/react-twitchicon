import { twitchApiAxios } from '@/lib/twitch/apiclient';
import { TwitchUser } from '@/models/twitchUser/twitchUser';

type GetUsersParams = {
  words: string[];
};

type GetUsersResponse = {
  data: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
  }[];
};

export async function getUsers({ words }: GetUsersParams) {
  const users: TwitchUser[] = [];
  try {
    const response1 = await twitchApiAxios.get<GetUsersResponse>(
      '/helix/users',
      { params: { login: words } },
    );
    if (200 !== response1.status) {
      console.error(response1.statusText);
    }
    response1.data.data.forEach(user => {
      users.push(<TwitchUser>{
        id: user.id,
        login: user.login,
        displayName: user.display_name,
        description: user.description,
        profileImageUrl: user.profile_image_url,
        offlineImageUrl: user.offline_image_url,
        createdAt: user.created_at,
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    return users;
  }
}
