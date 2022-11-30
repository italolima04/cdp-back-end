import User from '../../user/entities/user.entity';

interface SendEmailConfirmPasswordDTO {
  user: User;
}

export default SendEmailConfirmPasswordDTO;
