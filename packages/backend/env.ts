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
  readonly COGNITO_CLIENT_ID: string
  readonly COGNITO_REGION: string
  readonly COGNITO_USERPOOL_ID: string
  readonly COGNITO_AUTHORITY: string

  constructor() {
    if (
      process.env.DB_USERNAME === undefined ||
      process.env.DB_PASSWORD === undefined ||
      process.env.DB_HOST === undefined ||
      process.env.DB_PORT === undefined ||
      process.env.DB_DATABASE === undefined ||
      process.env.DB_SSLMODE === undefined ||
      process.env.COGNITO_CLIENT_ID === undefined ||
      process.env.COGNITO_REGION === undefined ||
      process.env.COGNITO_USERPOOL_ID === undefined
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
    this.COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID
    this.COGNITO_REGION = process.env.COGNITO_REGION
    this.COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID
    this.COGNITO_AUTHORITY = `https://cognito-idp.${this.COGNITO_REGION}.amazonaws.com/${this.COGNITO_USERPOOL_ID}`
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
