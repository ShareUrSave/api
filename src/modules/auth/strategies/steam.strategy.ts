import Strategy, {
  SteamProfile,
  SteamStrategyOptions,
} from '@fabiansharp/modern-passport-steam';
import { ConfigService } from '@modules/config/config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@users/users.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const options: SteamStrategyOptions = {
      apiKey: configService.get('STEAM_API_KEY')!,
      returnUrl: configService.get('STEAM_RETURN_URL')!,
      realm: configService.get('STEAM_REALM')!,
      passReqToCallback: true,
    };

    super(options);
  }

  validate(req: Request, identifier: string, profile: SteamProfile) {
    console.log(req, identifier, profile);

    // TODO: Implement user validation logic
  }
}
