import path from 'path'
import fs from 'fs';
import archiver from "archiver";

/**
 * 检查 root 之后的路径是否是隐藏文件或目录
 */

export const isHidden = (root: string, filePath: string | string[]) => {
  filePath = (<string>filePath).substr(root.length).split(path.sep);
  for (let i = 0; i < filePath.length; i++) {
    const firstChar = filePath[i] && filePath[i].trim()[0];
    if (firstChar === ".") return true;
  }
  return false;
};

export const isDir = (filePath: string, sync: boolean) => {
  if (sync) return fs.statSync(filePath).isDirectory();
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(err);
      resolve(stats.isDirectory());
    });
  });
};

export const appendToArchiver = (downloadList = []) => {
  const args = global.argv
  const archive = archiver("zip");
  downloadList.forEach(filePath => {
    // 对每个路径进行越权校验
    // if (isAccessible(args.dir, filePath)) {
    const cwd = path.join(filePath, "..");
    const basename = path.basename(filePath);
    const globConf = { cwd, dot: args.hidden };
    archive
      .glob(basename, globConf) // 匹配文件
      .glob(`${basename}/**/*`, globConf); // 匹配目录和内容
    // } else {
    //   throw new Error("访问越权");
    // }
  });
  archive.finalize();
  return archive;
};