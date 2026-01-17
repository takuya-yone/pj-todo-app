import { AuthGuard } from '@nestjs/passport'

// AuthGuard('jwt')の引数の値は
// jwt.strategy.tsのPassportStrategy(Strategy, 'jwt')に合わせる。
export class JwtGuard extends AuthGuard('jwtCognito') {}
