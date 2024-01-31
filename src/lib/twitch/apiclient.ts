import axios from 'axios';

const CACHE: {
  token: string|null,
  expiresAt: Date|null,
} = {
  token: null,
  expiresAt: null,
};

type AppTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
}

const twitchApiAxiosSingleton = () => {
  const client = axios.create({
    baseURL: process.env.TWITCH_API,
  });
  client.interceptors.request.use(async config => {
    const token = await getAppToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Client-Id'] = process.env.TWITCH_CLIENT_ID;
    return config;
  });
  return client;
}
type TwitchApiAxiosSingleton = ReturnType<typeof twitchApiAxiosSingleton>;

const globalForTwitchApiAxios = globalThis as unknown as {
  twitchApiAxios: TwitchApiAxiosSingleton | undefined,
};

export const twitchApiAxios =
  globalForTwitchApiAxios.twitchApiAxios ?? twitchApiAxiosSingleton();

export async function getAppToken() {
  if (null !== CACHE.expiresAt
      && CACHE.expiresAt.getTime() > (Date.now() + 1000 * 60)
  ) {
    return CACHE.token;
  }

  const response = await axios.postForm<AppTokenResponse>(
    'https://id.twitch.tv/oauth2/token',
    {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

  CACHE.token = response.data.access_token;
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds()+response.data.expires_in);
  CACHE.expiresAt = expiresAt;
  return CACHE.token;
}
