import {
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'

const COGNITO_API_VERSION = '2016-04-18'
const REGION = 'ap-northeast-1'
const COGNITO_USER_POOL_ID = process.env.COGNITO_USERPOOL_ID ?? ''
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID ?? ''
const COGNITO_USERNAME = process.env.COGNITO_USERNAME ?? ''
const COGNITO_PASSWORD = process.env.COGNITO_PASSWORD ?? ''

const client = new CognitoIdentityProviderClient({
  apiVersion: COGNITO_API_VERSION,
  region: REGION,
})

/**
 * IDトークンを取得
 */
const getIdToken = async (): Promise<void> => {
  const params: AdminInitiateAuthCommandInput = {
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: COGNITO_USERNAME,
      PASSWORD: COGNITO_PASSWORD,
    },
  }

  const response = await client.send(new AdminInitiateAuthCommand(params))
  const idToken = response.AuthenticationResult?.IdToken

  if (!idToken) {
    throw new Error('Failed to retrieve ID token from Cognito response')
  }

  console.log(`ID_TOKEN="${idToken}"`)
}

getIdToken()
