import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Snake Game',
      meta: [
        { name: 'description', content: 'Snake Game' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: [
    './styles/board.css'
  ]
});
