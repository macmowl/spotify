# Spotify

I recreated the spotify application. And it works like a charm.

## Preview

Preview the example live on [Spotify](https://spotify-macmowl.vercel.app/login).

Due to spotify restrictions, you need the official Spotify opened and launched a song to be able to use this app.

## Technologies

This app is made with:
- [React](https://fr.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [Spotify web API](https://github.com/thelinmichael/spotify-web-api-node)
- [Recoil](https://recoiljs.org/fr/)
- [NexAuth](https://next-auth.js.org/)

## Installation

To run this project, install it locally with npm by following these steps:

- Select the folder then
```
git clone https://github.com/macmowl/spotify.git
```
- create a .env.local on root folder and create 3 environment variables :
    - NEXTAUTH_URL=http://localhost:3000
    - NEXT_PUBLIC_CLIENT_SECRET
    - NEXT_PUBLIC_CLIENT_ID
    - JWT_SECRET=Name_it_like_you-want
- Create or sign in to [Spotify Developer](https://developer.spotify.com/)
- Create a new app and then, you be able to see the client secret and client ID used in your .env
```js
npm install
npm run dev
```