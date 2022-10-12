import { Pipe, PipeTransform } from "@angular/core";
import QRCode from "qrcode";

@Pipe({
  name: "qrCode",
})
export class QRCodePipe implements PipeTransform {
  async transform(value: any, args?: any[]): Promise<any> {
    if (value && typeof value === "string") {
      return await QRCode.toDataURL(value);
    }
    return value;
  }
}
