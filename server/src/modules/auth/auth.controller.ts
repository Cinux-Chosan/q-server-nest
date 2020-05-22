import { Controller, Post, Body, Session } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('login')
  login(
    @Body('username') username,
    @Body('password') password,
    @Session() session,
  ) {
    const users = global.argv.user;
    console.log(session);
    if (users.size) {
      // 需要登录
      if (users.get(username) === password) {
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
        };
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
