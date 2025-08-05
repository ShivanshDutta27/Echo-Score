require('dotenv').config();
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const app = express();



const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURL = process.env.REDIRECT_URI;


app.use(cors({ origin: "https://echoscore-ofl3.vercel.app/" })); // Allow frontend domain


// Root route (optional)
app.get('/', (req, res) => {
  res.send('Backend server is running. Use /login to authenticate.');
});
console.log("Redirect URI:", process.env.REDIRECT_URI);

app.get('/login', (req, res) => {
  const scope = 'user-library-read playlist-read-private';
  const authParams = querystring.stringify({
    response_type: 'code',
    client_id: clientID,
    scope: scope,
    redirect_uri: redirectURL,
    show_dialog: true  
  });

  res.redirect(`https://accounts.spotify.com/authorize?${authParams}`);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURL,
        client_id: clientID,
        client_secret: clientSecret,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;
    res.redirect(`https://echoscore-ofl3.vercel.app/#access_token=${access_token}&refresh_token=${refresh_token}`);
} catch (error) {
    res.send(error);
    console.error(error);
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

