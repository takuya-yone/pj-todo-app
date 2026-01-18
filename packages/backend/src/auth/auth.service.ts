import {
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(readonly configService: ConfigService) {}

  async generateJwt(username: string, password: string): Promise<string> {
    const cognitoClient = new CognitoIdentityProviderClient({
      region: 'ap-northeast-1',
    })

    const params: AdminInitiateAuthCommandInput = {
      UserPoolId: this.configService.get('cognito.userPoolId'),
      ClientId: this.configService.get('cognito.clientId'),
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    }

    const response = await cognitoClient.send(new AdminInitiateAuthCommand(params))
    const idToken = response.AuthenticationResult?.IdToken

    if (!idToken) {
      throw new Error('Failed to retrieve ID token from Cognito response')
    }
    return idToken
  }
}
