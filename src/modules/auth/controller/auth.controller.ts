import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
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
import { VerifyTokenService } from '../services/verify-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sendEmailWithTokenService: SendEmailWithTokenService,
    private redefinePasswordService: RedefinePasswordService,
    private verifyTokenService: VerifyTokenService,
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
  @ApiOperation({
    summary:
      'Esta rota é responsável por criar um token e associar ao usuário e enviar um e-mail ao usuário com o token para redefinir a senha',
  })
  @ApiOkResponse({
    description:
      'Retorna um entidade de token recém criada e associada ao usuário',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
  })
  async sendEmailWithToken(
    @Body() { email }: SendEmailWithTokenDTO,
  ): Promise<UsersToken> {
    return this.sendEmailWithTokenService.execute({ email });
  }

  @Get('verify-token/:token')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary:
      'Esta rota é responsável verificar se o token enviado para o e-mail do usuário é valido',
  })
  @ApiOkResponse({
    description: 'Retorna um valor verdadeiro ou falso',
  })
  @ApiNotFoundResponse({
    description: 'Token ou usuário não encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
  })
  async verifyToken(@Param('token') token: string): Promise<boolean> {
    return this.verifyTokenService.execute(token);
  }

  @Post('redefine-password')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Esta rota é responsável por redefinir a senha do usuário',
  })
  @ApiOkResponse({
    description: 'Redefine a senha do usuário',
  })
  @ApiNotFoundResponse({
    description: 'Usuário ou token não encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
  })
  async redefinePassword(
    @Body() { token, password, confirmPassword }: RedefinePasswordDTO,
  ): Promise<User> {
    return this.redefinePasswordService.execute({
      token,
      password,
      confirmPassword,
    });
  }
}
