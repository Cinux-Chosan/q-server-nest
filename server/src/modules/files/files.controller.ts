import path from 'path';
import { Controller, Post, Body, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  test() {
    throw new UnauthorizedException()
  }
  @Post()
  async allFiles(@Body('dir') dir: string = '.') {
    try {
      const args = global.argv;
      const parent = path.join(args.dir, dir);
      const files = await this.filesService.getSubFiles(parent);
      return { result: files, success: true };
    } catch (error) {
      return { result: [], success: false, message: '获取文件列表失败' };
    }
  }
}
