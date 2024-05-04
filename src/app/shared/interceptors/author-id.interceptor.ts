import { HttpInterceptorFn } from '@angular/common/http';

export const authorIdInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    headers: req.headers.set('authorId', '196')
  });

  return next(clonedRequest);
};