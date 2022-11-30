import User from '../../user/entities/user.entity';

interface EmailWithUserAndToken {
  user: User;
  token: string;
}

export default EmailWithUserAndToken;
