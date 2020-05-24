import path from 'path'
import readdirp from 'readdirp'
import { Injectable } from '@nestjs/common';
import { iterate } from 'iterare'
import { isHidden } from '../../lib/util'

@Injectable()
export class FilesService {
  async getSubFiles(parent: string) {
    const files = await readdirp.promise(parent, { alwaysStat: true, depth: 0, type: "all" })
    const args = global.argv;
    return iterate(files)
      .filter(file => args.hidden || !isHidden(args.dir, file.fullPath))
      .map(file => {
        const isDir = file.stats.isDirectory();
        return {
          ...file,
          fileExt: path.extname(file.fullPath),
          fullPath: path.relative(args.dir, file.fullPath),
          isDir
        };
      })
      .toArray();
  }
}
