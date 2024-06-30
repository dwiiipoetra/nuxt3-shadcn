// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   devtools: { enabled: true },
//   modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"]
// })

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets"
  },
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-icon','nuxt-highcharts'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  plugins: ['~/plugins/axios.ts'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})