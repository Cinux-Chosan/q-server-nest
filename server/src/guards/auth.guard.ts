import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse();
    const headers = req.headers;
    const args = global.argv;
    console.log('guard');
    console.log('headers', headers);
    const { authorization } = headers

    if (args.user.size) {
      if (req.session.username) {
        console.log('111111');
        return true;
      } else if (authorization) {
        const [, base64Atuh] = authorization.split(' ');
        const strAuth = new Buffer(base64Atuh, 'base64').toString();
        const [username, password] = strAuth.split(':');
        console.log(username, password);
        return true
      } else {
        console.log(401);
        res.set('WWW-Authenticate', 'Basic');
        // 抛出 401
        throw new UnauthorizedException();
      }
    } else {
      return true;
    }
  }
}
