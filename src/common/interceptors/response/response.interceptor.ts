// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// export type Response<T> = {
//   status: boolean;
//   statusCode: number;
//   path: string;
//   message: string;
//   data: T;
//   timestamp: string;
// };

// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
//   constructor(private reflector: Reflector) {}
//   intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
//     return next.handle().pipe(map(res)=> {
//       const request = context.switchToHttp().getRequest();
//       const statusCode = context.switchToHttp().getResponse().statusCode;
//       const message = this.reflector.get<string>('message', context.getHandler()) || 'Success';
//       return {
//         status: true,
//         statusCode,
//       }}
//   );
//   }
// }
