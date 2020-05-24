import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';
import { SysConfController } from './modules/sysConf/sysConf.controller';
import { UploadController } from './modules/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DownloadController } from './modules/download/download.controller';
import { DownloadService } from './modules/download/download.service';

@Module({
  controllers: [
    AppController,
    SysConfController,
    UploadController,
    DownloadController,
  ],
  providers: [AppService, DownloadService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../www'),
    }),
    FilesModule,
    AuthModule,
  ],
})
export class AppModule {}
