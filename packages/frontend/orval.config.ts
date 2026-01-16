import { defineConfig } from 'orval'

export default defineConfig({
  'swagger-spec-file': {
    input: {
      target: '../backend/openapi.yml',
    },
    output: {
      mode: 'tags-split',
      target: 'app/gen/endpoints',
      schemas: 'app/gen/models',
      client: 'swr',
      baseUrl: 'http://localhost:4000',
      mock: true,
    },
  },
  'zod-schema': {
    input: {
      target: '../backend/openapi.yml',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'app/gen/endpoints',
      fileExtension: '.zod.ts',
    },
  },
})
