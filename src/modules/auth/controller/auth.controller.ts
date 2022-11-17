import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersToken } from '@prisma/client';
import User from '../../user/entities/user.entity';

import { CreateSessionDTO } from '../dtos/create-session.dto';
import RedefinePasswordDTO from '../dtos/redefine-password.dto';
import SendEmailWithTokenDTO from '../dtos/send-email-with-token.dto';
import { AuthService } from '../services/auth.service';
import RedefinePasswordService from '../services/redefine-password.service';
import SendEmailWithTokenService from '../services/send-email-with-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sendEmailWithTokenService: SendEmailWithTokenService,
    private redefinePasswordService: RedefinePasswordService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary:
      'Esta rota é responsável por gerar o token JWT necessário para realizar operações com autenticação',
  })
  @ApiOkResponse({
    description: 'Retorna um token JWT',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
  })
  async login(@Body() { email, password }: CreateSessionDTO) {
    return await this.authService.authenticate({ email, password });
  }

  @Post('recover-password')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  sendEmailWithToken(
    @Body() { email }: SendEmailWithTokenDTO,
  ): Promise<UsersToken> {
    return this.sendEmailWithTokenService.execute({ email });
  }

  @Post('redefine-password')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  redefinePassword(
    @Body() { token, password, confirmPassword }: RedefinePasswordDTO,
  ): Promise<User> {
    return this.redefinePasswordService.execute({
      token,
      password,
      confirmPassword,
    });
  }
}
