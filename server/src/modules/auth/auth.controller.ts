import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body('username') username, @Body('password') password) {
    const users = global.argv.user;
    if (users.size) {
      // 需要登录
      if (users.get(username) === password) {
        ctx.session.username = username;
        return (ctx.body = {
          success: true,
          result: true,
          message: "登录成功!"
        });
      } else {
        return (ctx.body = {
          success: false,
          result: "",
          message: "登录失败：用户名或密码错误!"
        });
      }
    } else {
      return next();
    }
  }
}

