export type EnvType = {
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_HOST: string
  DB_PORT: number
  DB_DATABASE: string
  DB_SSLMODE: 'disable' | 'require'
}

export class ENV {
  readonly DB_USERNAME: string
  readonly DB_PASSWORD: string
  readonly DB_HOST: string
  readonly DB_PORT: number
  readonly DB_DATABASE: string
  readonly DB_SSLMODE: 'disable' | 'require'
  readonly DB_URL: string

  constructor() {
    if (
      process.env.DB_USERNAME === undefined ||
      process.env.DB_PASSWORD === undefined ||
      process.env.DB_HOST === undefined ||
      process.env.DB_PORT === undefined ||
      process.env.DB_DATABASE === undefined
    ) {
      throw new Error('Environment variables are not properly set.')
    }

    if (process.env.DB_SSLMODE !== 'disable' && process.env.DB_SSLMODE !== 'require') {
      throw new Error('DB_SSLMODE must be either "disable" or "require".')
    }

    this.DB_USERNAME = process.env.DB_USERNAME
    this.DB_PASSWORD = process.env.DB_PASSWORD
    this.DB_HOST = process.env.DB_HOST
    this.DB_PORT = Number(process.env.DB_PORT)
    this.DB_DATABASE = process.env.DB_DATABASE
    this.DB_SSLMODE = process.env.DB_SSLMODE
    this.DB_URL = `postgresql://${this.DB_USERNAME}:${this.DB_PASSWORD}@${this.DB_HOST}:${this.DB_PORT}/${this.DB_DATABASE}?sslmode=${this.DB_SSLMODE}`
  }
}

// export const ENV: EnvType = {
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_HOST: process.env.DB_HOST,
//   DB_PORT: Number(process.env.DB_PORT),
//   DB_DATABASE: process.env.DB_DATABASE,
//   DB_SSLMODE: process.env.DB_SSLMODE,
// }
