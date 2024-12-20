import { Component, computed, effect } from "@angular/core";
import QRCode from "qrcode";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"],
})
export class TmplQRCodeComponent extends TemplateBaseComponent {
  /**
   * Computed signal used to generate QR code from value input
   *
   * NOTE - as computed signals do not accept async values this method
   * returns a promise which should be handled via async pipe
   * */
  public qrCodeData = computed((): Promise<string> => {
    const value = this.value();
    if (value && typeof value === "string") {
      return QRCode.toDataURL(value);
    }
  });
}
