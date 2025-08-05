const authEndPoint="https://accounts.spotify.com/authorize"
const clientID="d2c74942ac664e80ad1f4447e2609b5d"
const redirectUri="https://backend--bay.vercel.app/callback"


const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative"
].join("%20");

  

export const loginEndPoint = `${authEndPoint}?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code&show_dialog=true`                                                                                                



