import { Controller, Post, Body, Get, Next, Query, Response } from '@nestjs/common';
import { DownloadService } from './download.service'

@Controller('download')
export class DownloadController {

  constructor(private downloadService: DownloadService) { }

  @Get()
  download(@Query('isDownload') isDownload, @Query('downloadId') localId, @Next() next, @Response() res) {
    if (isDownload !== undefined && localId) {
      // 下载
      return this.downloadService.runTask(localId, res)
    } else {
      return next();
    }
  }

  @Post()
  addDownloadTask(@Body('downloadList') downloadList: string[]) {
    const donwloadId = this.downloadService.createTask(downloadList);
    return { success: true, result: donwloadId };
  }
}
