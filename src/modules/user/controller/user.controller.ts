import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import uploadConfig from '@Config/upload.config';
import { UserDecorator } from '@Decoratator/user.decorator';

import UserService from '../services/user.service';
import CreateUserDto from '../dtos/create-user.dto';
import UpdateUserDto from '../dtos/update-user.dto';
import User from '../entities/user.entity';
import { UpdateAddressDTO } from '../dtos/update-address.dto';
import UpdatePasswordDTO from '../dtos/update-password.dto';

@ApiTags('user')
@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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
    @UserDecorator() user: User,
    @Query('avatar', new DefaultValuePipe(false), ParseBoolPipe) avatar = false,
  ): Promise<User> {
    return await this.userService.me({ id: user.id, avatar });
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

  @Patch()
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
    @UserDecorator() user: User,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(user.id, updatedUser);
  }

  @Patch('password')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @UserDecorator() user: User,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ): Promise<User> {
    return await this.userService.updatePassword(user.id, {
      ...updatePasswordDto,
    });
  }

  @Patch('avatar')
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
    @UserDecorator() user: User,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.updateAvatar({
      id: user.id,
      avatar: avatar.filename,
    });
  }

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
  @Get('address')
  async getAddressesOfUser(@UserDecorator() user: User) {
    return await this.userService.findAddressesByUser(user.id);
  }

  @Patch('/address')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateAddress(
    @Body() updateAddressDTO: UpdateAddressDTO,
    @UserDecorator() user: User,
  ) {
    return await this.userService.updateAddress(user.id, updateAddressDTO);
  }

  @Get('/plan')
  async getCurrentPlanOfUser(@UserDecorator() user: User) {
    return await this.userService.getCurrentPlanOfUser(user.id);
  }
}

export default UserController;
