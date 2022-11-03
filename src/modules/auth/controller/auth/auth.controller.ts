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
} from '@nestjs/swagger';
import { ICreateSessionDTO } from '../../dtos/ICreateSessionDTO';
import { AuthService } from '../../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary:
      'Esta rota é responsável por gerar o token JWT necessário para realizar operações com autenticação',
  })
  @ApiOkResponse({
    description: 'Retorna um token JWT',
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    status: 401,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
    status: 500,
  })
  async login(@Body() { email, password }: ICreateSessionDTO) {
    return await this.authService.execute({ email, password });
  }
}
