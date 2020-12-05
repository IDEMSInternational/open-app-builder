import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { CameraService } from "src/app/shared/services/camera/camera.service";

@Component({
  selector: "plh-gallery",
  templateUrl: "./gallery.page.html",
  styleUrls: ["./gallery.page.scss"],
})
export class GalleryPage implements OnInit {
  photoFrames: IPhotoFrame[] = [
    { title: "One-on-one time" },
    { title: "Praise & Positive Reinforcement" },
    { title: "Managing Anger & Stress" },
    { title: "Family Budgeting" },
    { title: "Rules & Routines" },
    { title: "Accepting Responsibilities" },
    { title: "Problem Solving" },
    { title: "Risk Mapping & Dealing with Crisis" },
  ];
  constructor(
    private cameraService: CameraService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  async takePhoto(frame: IPhotoFrame, frameIndex: number) {
    console.log("taking photo", frame, frameIndex);
    try {
      const image = await this.cameraService.takePhoto();
      console.log("photo", image);
      frame.src = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(error);
  }
}

interface IPhotoFrame {
  title: string;
  src?: SafeUrl;
}
