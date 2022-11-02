import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  UseInterceptors,
  ValidationPipe,
  ClassSerializerInterceptor,
  UploadedFile,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadConfig from '@/config/upload.config';

import UserService from '../services/user.service';
import CreateUserDto from '../dtos/create-user.dto';
import UpdateUserDto from '../dtos/update-user.dto';
import User from '../entities/user.entity';

@ApiTags('user')
@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({
    name: 'avatar',
    required: false,
    type: Boolean,
    description:
      'Query string para o retorno da imagem do avatar do usuário, caso passe o atributo como true e o mesmo tenha o avatar atualizado.',
    example: {
      avatar: true,
    },
  })
  @ApiOperation({
    summary: 'Esta rota é responsável por listar os dados de um usuário.',
  })
  @ApiOkResponse({
    description: 'Retorna os dados do usuário que foi repassado.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Usuário para listagem dos dados não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor.',
  })
  async me(
    @Param('id') id: string,
    @Query('avatar', new DefaultValuePipe(false), ParseBoolPipe) avatar = false,
  ) {
    return await this.userService.me({ id, avatar });
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Esta rota é responsável por criar um usuário.',
  })
  @ApiOkResponse({
    description: 'Retorna os dados do usuário que foi criado.',
    type: User,
  })
  @ApiConflictResponse({
    description:
      'Os dados de E-mail, Telefone ou CPF já estão em uso por outro usuário.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Esta rota é responsável por atualizados os dados de um usuário.',
  })
  @ApiOkResponse({
    description: 'Retorna os dados do usuário que foi atualizado.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado para a atualização dos dados.',
  })
  @ApiConflictResponse({
    description:
      'Já existe um usuário com este e-mail OU Já existe um usuário com este número de telefone OU Já existe um usuário com este número CPF.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor.',
  })
  async update(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updatedUser);
  }

  @Patch('avatar/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('avatar', uploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Esta rota é responsável por atualizar o avatar de um usuário.',
  })
  @ApiOkResponse({
    description:
      'Retorna os dados do usuário atualizados com a imagem de perfil no avatar.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Usuário para atualização do avatar não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor.',
  })
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile() avatar,
  ): Promise<User> {
    return await this.userService.updateAvatar({ id, avatar: avatar.filename });
  }
}

export default UserController;
