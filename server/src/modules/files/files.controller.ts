import path from 'path'
import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from './files.service'
@Controller('files')
export class FilesController {

  constructor(private filesService: FilesService) { }

  @Post()
  async allFiles(@Body('dir') dir: string = '.') {
    try {
      const args = global.argv
      const parent = path.join(args.dir, dir);
      const files = await this.filesService.getSubFiles(parent)
      return { result: files, success: true }
    } catch (error) {
      return { result: [], success: false, message: '获取文件列表失败' }
    }
  }
}
