import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service'
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  login(
    @Body('username') username,
    @Body('password') password,
    @Session() session,
  ) {
    const args = global.argv
    if (args.users.size) {
      const isValidUser = this.authService.validatePassword(username, password);
      if (isValidUser) {
        session.username = username;
        return {
          success: true,
          result: true,
          message: '登录成功!',
        };
      } else {
        return {
          success: false,
          result: '',
          message: '登录失败：用户名或密码错误!',
        }
      }
    } else {
      return {
        success: false,
        result: '',
        message: '未配置用户信息，无需登录'
      }
    }
  }

  @Post('logout')
  logout(@Session() session) {
    session.username = null;
    return {
      success: true,
      message: '登出成功!',
      result: true,
    };
  }
}
