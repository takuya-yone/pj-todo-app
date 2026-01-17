import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from './strategy/jwt.strategy'
// パターン2を使いたいときはコメントインする。
// import { ManualJwtStrategy } from './strategy/jwt.manual.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwtCognito' })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
