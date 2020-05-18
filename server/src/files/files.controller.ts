import { Controller, Post, Get, Query } from '@nestjs/common';
import readdirp from 'readdirp'

@Controller('files')
export class FilesController {
  @Get()
  async allFiles(@Query('dir') dir) {
    const files = await readdirp.promise('./', { alwaysStat: true, depth: 0, type: "all" })
    return files
  }
}
