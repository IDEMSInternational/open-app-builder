import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
// import { drive_v3, google } from "googleapis";

const FILE_KEY = "files";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  donwnloadUrl = "";
  myFiles = [];
  downloadProgress = 0;
  // driveService = google.drive({version: 'v3'})

  imageUrl = "https://drive.google.com/file/d/1WXbI_r-pcqVb5CDauDitDyYXXGjWjkrs/view?usp=sharing";

  constructor(private http: HttpClient) {
    this.loadFiles();
  }

  custom(url?) {
    this.downloadFile(this.imageUrl);
  }

  async loadFiles() {
    const imageList = await Storage.get({ key: FILE_KEY });
    this.myFiles = JSON.parse(imageList.value) || [];
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  downloadFile(url?) {
    this.donwnloadUrl = url || this.donwnloadUrl;
    const fileId = "1WXbI_r-pcqVb5CDauDitDyYXXGjWjkrs";
    this.http
      .get("https://www.googleapis.com/drive/v3/files/" + fileId, {
        responseType: "blob",
        reportProgress: true,
        observe: "events",
      })
      .subscribe(async (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.downloadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.downloadProgress = 0;

          const name = this.donwnloadUrl.substring(this.donwnloadUrl.lastIndexOf("/") + 1);
          const base64 = (await this.convertBlobToBase64(event.body)) as string;

          console.log("name: ", name);
          // const file = await this.driveService.files.get({
          //   fileId: "1WXbI_r-pcqVb5CDauDitDyYXXGjWjkrs",
          //   alt: "media"
          // });
          // console.log(file.status)
        }
      });
  }
}
