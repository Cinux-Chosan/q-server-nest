import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validatePassword(username: string, password: string) {
    const users = global.argv.user;
    if (users.size) {
      // 需要登录
      return users.get(username) === password
    }
    return false;
  }
}
