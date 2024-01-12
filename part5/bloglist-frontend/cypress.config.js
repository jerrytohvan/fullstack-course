import { defineConfig } from 'cypress'

export default defineConfig({
  // video: true,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:5173',
    env: {
      BACKEND: 'http://localhost:3001/api',
      LOGGED_IN_SESSION: 'loggedBlogUser',
      MOCK_USER: {
        name: 'John Doe',
        username: 'johndoe',
        password: 'johndoe',
      },
    },
  },
})
