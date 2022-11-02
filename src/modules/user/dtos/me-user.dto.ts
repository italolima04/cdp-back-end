import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

class MeUserDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  avatar: boolean;
}

export default MeUserDto;
