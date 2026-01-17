import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

export interface Claim {
  sub: string
  email: string
  token_use: string
  auth_time: number
  iss: string
  exp: number
  username: string
  client_id: string
}

// PassportStrategy(Strategy, 'jwt')部分の第一引数は
// jwt.guard.tsでのAuthGuard('jwt')に合わせる。
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtCognito') {
  private readonly logger = new Logger(JwtStrategy.name)

  constructor(readonly configService: ConfigService) {
    super({
      // ヘッダからBearerトークンを取得
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // cognitoのクライアントidを指定
      audience: configService.get('cognito.clientId'),
      // jwt発行者。今回はcognito
      issuer: configService.get('cognito.authority'),
      algorithms: ['RS256'],
      // もし自分がjwt発行してるなら秘密鍵を指定するが、
      // cognitoなど外部サービスが発行してるならsecretOrKeyProviderを利用。
      secretOrKeyProvider: passportJwtSecret({
        // 公開鍵をキャッシュする。これがfalseだと、毎リクエストごとに
        // 公開鍵をHTTPリクエストで取得する必要がある。
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.get('cognito.jwksUri') ?? '',
      }),
      // passReqToCallback: true, // これをtrueにするとvalidateの第一引数にRequestを使用できる。
    })
  }

  // JWT検証後、デコードされたpayloadを渡してくる。
  // 検証後に実行されることに注意。JWTが向こうであればそもそも実行されない。
  // validate自体はPromiseにすることも可能。
  public validate(payload: Claim): string {
    this.logger.log(`JWT validate called. payload: ${JSON.stringify(payload)}`)
    return payload.email
  }
}
