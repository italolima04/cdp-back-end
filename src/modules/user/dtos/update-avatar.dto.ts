import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class UpdateAvatarDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}

export default UpdateAvatarDto;
