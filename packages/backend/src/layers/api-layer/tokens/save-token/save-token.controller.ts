import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/layers/functionality/authentication/jwt/jwt-auth.guard';
import { SaveTokenService } from 'src/layers/functionality/tokens/save-token.service';
import { SaveTokenBody } from './save-token.body';
import { SaveTokenResponse } from './save-token.response';

@Controller({
  path: '/tokens',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class SaveTokenController {
  constructor(private saveTokenService: SaveTokenService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Successful save token',
    type: SaveTokenResponse,
  })
  @ApiBearerAuth('jwt-auth')
  @ApiTags('Tokens')
  async saveToken(
    @Body() { token }: SaveTokenBody,
    @Req() request: IRequestWithUser,
  ): Promise<SaveTokenResponse> {
    const { email } = request.user;
    console.log(email);
    await this.saveTokenService.save({ token, email });

    return {
      isSuccessful: true,
    };
  }
}
