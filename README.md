# eChat

eChat is a simple chat app built as the successor to DocSocial. **It is just as insecure as DocSocial as well.**

eChat consits of two parts: the server (/Server) and the client (/).
The server constists of 2 docker containers: A [Centrifugo](https://centrifugal.dev/) instance, connected to a [Redis](https://redis.io) database for (not reliably) saving messages.
The client is a [Svelte](https://svelte.dev/) app that connects to the server via [Centrifuge.js](https://github.com/centrifugal/centrifuge-js) with WebTransport.

## Running the server

You will need:

- A server
- Latest version of Docker installed

Instructions:

- Clone the contents of the Server directory to the server
- Replace every instance of "YOUR_DOMAIN" with a domain pointing to the server and forward port 8000
- Install the latest version of the [Centrifugo](https://github.com/centrifugal/centrifugo/releases/) binary in the same directory if you don't have it already
- Run the Centrifugo binary with the `genconfig` argument to generate a config.json file, and replace the Secrets in the config.yml file with the newly generated ones
- Run the Centrifugo binary with the arguments `gentoken -u 1` to generate a token, save this for later
- Follow [Centrifugo's instructions](https://centrifugal.dev/docs/server/tls/) on how to set up TLS (Required due to WebTransport, edit docker-compose.yml if not using Let's Encrypt)
- Configure any other files to your liking
- Run `docker compose up` in the same directory to run the containers

## Running the client

You will need:

- Latest version of NodeJS installed
- Latest version of npm installed
- A terminal
- A modern web browser

Instructions:

- Clone the repository to your local machine
- Open a terminal and navigate to the directory of the repository
- Run `npm i -g pnpm` to install pnpm if you do not already have it
- Run `pnpm i` to install all dependencies
- Replace every instance of "YOUR_DOMAIN" with the same domain used when setting up the server
- Replace "YOUR_TOKEN" in user.ts with the token generated when setting up the server.

To start a local dev server, run `pnpm run dev` and navigate to the link shown in the terminal (remember to use HTTPS!). Upon saving a file, your changes will be shown in the web browser.

**The app's styling only works correctly at a resolution of 375x500!** This is because the app was originally designed for use in a browser extension.

To build for production, run `pnpm run build`, then `pnpm run preview` (or `pnpm run buildview`) to preview the final site.
