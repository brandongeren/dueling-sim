import * as  httpError from 'http-errors';

export function requireAdmin(req: any, res: any, next: any): any {
  if (req.user && req.user.roles.indexOf('admin') > -1) 
    return next();
  const err = new httpError(401);
  return next(err);
};