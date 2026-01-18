// https://docs.nestjs.com/techniques/configuration

type ConfigType = {
  cognito: {
    clientId: string
    region: string
    userPoolId: string
    authority: string
    jwksUri: string
  }
  db: {
    username: string
    password: string
    host: string
    port: number
    database: string
    schema: string
    sslmode: 'disable' | 'require'
    dbUrl: string
  }
}

const configuration = (): ConfigType => {
  if (
    process.env.DB_USERNAME === undefined ||
    process.env.DB_PASSWORD === undefined ||
    process.env.DB_HOST === undefined ||
    process.env.DB_PORT === undefined ||
    process.env.DB_DATABASE === undefined ||
    process.env.DB_SSLMODE === undefined ||
    process.env.DB_SCHEMA === undefined ||
    process.env.COGNITO_CLIENT_ID === undefined ||
    process.env.COGNITO_REGION === undefined ||
    process.env.COGNITO_USERPOOL_ID === undefined
  ) {
    throw new Error('Environment variables are not properly set.')
  }

  if (process.env.DB_SSLMODE !== 'disable' && process.env.DB_SSLMODE !== 'require') {
    throw new Error('DB_SSLMODE must be either "disable" or "require".')
  }

  const cognitoAuthority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USERPOOL_ID}`

  return {
    cognito: {
      clientId: process.env.COGNITO_CLIENT_ID,
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      authority: cognitoAuthority,
      jwksUri: `${cognitoAuthority}/.well-known/jwks.json`,
    },
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      sslmode: process.env.DB_SSLMODE,
      dbUrl: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?sslmode=${process.env.DB_SSLMODE}`,
    },
  }
}

export default configuration
