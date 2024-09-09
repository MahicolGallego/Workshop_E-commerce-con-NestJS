import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/common/filters/error-manager.filter';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(usernameOrEmail: string, password: string) {
    try {
      const user =
        await this.userService.findByUsernameOrEmail(usernameOrEmail);
      if (!(await bcrypt.compare(password, user.password))) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Incorrect credentials',
        });
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw ErrorManager.createSignatureError(error.message);
      } else {
        // Manejo para errores inesperados que no sean instancias de Error
        throw ErrorManager.createSignatureError('An unexpected error occurred');
      }
    }
  }
}
