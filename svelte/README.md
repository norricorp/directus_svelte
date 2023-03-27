# Directus Svelte Example

This is a [Svelte 3](https://svelte.dev) project bootstrapped with [`create-vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite)'s Svelte template preset.

## 📌 Prerequisites

You will need to have the provided [Directus project](../directus) running first before proceeding with this example.

## 🚀 Getting Started

1. Clone this repo.

2. Install dependencies for this example.

   ```shell
   cd svelte
   npm install
   ```

3. Create a `.env` file by copying the provided `.env.example` file.

4. Start the development server.

   ```shell
   npm run dev
   ```

   Your Directus Svelte example is now running at <http://localhost:3000>.

## 🔗 Links

### Directus

- [Official Site](https://directus.io)
- [Documentation](https://docs.directus.io)

### Svelte

- [Official Site](https://svelte.dev)
- [Documentation](https://svelte.dev/docs)


### Added by me

I have kept articles but added a membersOnly attribute. Articles is public so can be read by visitors but the get filters
on the membersOnly attribute == false. After authentication, a members only link is displayed, which gets members articles.

This is probably not the best way to do this. Better would be to have two tables - articles and membersArticles. Identical fields.

This would allow articles to be public and memberArticles to be private and so require authentication. And it would protect when the rest api is used.

But it does mean a lot of duplication.


To work on network, change vite.config.js

add - server: host: true
Also add https and cert location

