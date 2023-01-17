// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Config within public will be also exposed to the client
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    public: {
      apiKey: process.env.MAPBOX_ACCESS_TOKEN,
      BASE_API_URL: 'oi',
      BASE_API_BROWSER_URL: 'hello'
    }
  },
})
