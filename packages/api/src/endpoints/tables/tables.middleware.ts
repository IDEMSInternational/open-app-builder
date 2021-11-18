import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const ALLOWED_TABLES = ["contact_fields"];

@Injectable()
/** Temp middleware to limit operation to specific tables only */
export class TablesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const [table_name, ...rest] = req.params?.[0]?.split("/");
    console.log(table_name, ALLOWED_TABLES.includes(table_name));
    if (!ALLOWED_TABLES.includes(table_name)) {
      throw new HttpException(
        `Operations only permitted on tables [${ALLOWED_TABLES}]`,
        HttpStatus.FORBIDDEN
      );
    }
    next();
  }
}
