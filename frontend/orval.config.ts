module.exports = {
  'swagger-spec-file': {
    input: {
      target: '../backend/openapi.yml',
    },
    output: {
      mode: 'single',
      target: './src/app/apiClient.ts',
      schemas: './src/app/model',
      client: 'swr',
      baseUrl: 'http://localhost:4000',
      mock: true,
    },
  },
}
