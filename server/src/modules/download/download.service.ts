import path from 'path'
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { isDir, appendToArchiver } from '../../lib/util'
import { Response } from 'express'

@Injectable()
export class DownloadService {

  static downloadMap = {};

  runTask(localId: string, res: Response) {
    const args = global.argv;
    const downloadMap = DownloadService.downloadMap;
    const downloadInfo = downloadMap[localId] || {};
    const { downloadList } = downloadInfo;
    this.removeTask(localId);
    if (downloadList && downloadList.length > 0) {
      const [firstFilePath] = downloadList;
      const isMultiple = downloadList.length > 1;
      if (!isMultiple && !isDir(path.join(args.dir, firstFilePath), true)) {
        // 只有一个文件并且是非目录，直接下载，不走 zip 压缩
        const fullPath = path.join(args.dir, firstFilePath);
        res.download(fullPath)
      } else {
        // 批量下载，适用于目录或者多个文件打包下载
        const archive = appendToArchiver(downloadList.map((fullPath) => path.join(args.dir, fullPath)));
        const baseName = path.basename(firstFilePath);
        const downloadName = isMultiple ? "batch" : baseName;
        res.set({ "Content-Disposition": `attachment;filename=${downloadName}.zip`, });
        archive.pipe(res);
      }
    } else {
      res.json({ success: false, result: "无需要下载的文件" })
    }
  }

  createTask(downloadList: string[]) {
    return this.addTask(downloadList);
  }

  private addTask(downloadList: string[]) {
    const loaclId = uuidv4();
    DownloadService.downloadMap[loaclId] = { downloadList };
    return loaclId;
  }

  private removeTask(taskId: string) {
    return delete DownloadService.downloadMap[taskId];
  }

}
