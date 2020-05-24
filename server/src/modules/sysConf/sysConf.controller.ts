import { Controller, Post } from '@nestjs/common';

@Controller('sysConf')
export class SysConfController {
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
