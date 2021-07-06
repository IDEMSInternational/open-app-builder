import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getUserData(user_id: string): any {
    return { user_id, contact_fields: { example: "hellow" } };
  }
  setUserData(user_id: string, data: any) {
    return { user_id, contact_fields: data };
  }
}
