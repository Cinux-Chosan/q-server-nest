import { Controller, Post, Get } from '@nestjs/common';

@Controller('sysConf')
export class SysConfController {
  @Get()
  test() {
    return 1
  }
  @Post()
  getSysConfData() {
    const args = global.argv;
    return {
      result: {
        uploadable: !!args.upload,
        login: !!args.user.size,
        limit: args.limit,
        title: args.title
      },
      success: true
    }
  }
}
