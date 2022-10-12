import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import QRCode from "qrcode";

@Component({
  selector: "plh-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"],
})
export class TmplQRCodeComponent extends TemplateBaseComponent implements OnInit {
  value: string;
  QRCodeDataURL: string;

  ngOnInit() {
    this.value = this._row.value;
    this.generateQR(this.value);
  }

  async generateQR(inputString: string) {
    try {
      this.QRCodeDataURL = await QRCode.toDataURL(inputString);
    } catch (err) {
      console.error(err);
    }
  }
}
