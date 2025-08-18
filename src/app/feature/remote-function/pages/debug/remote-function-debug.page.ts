import { Component, computed, inject, OnInit } from "@angular/core";
import { RemoteFunctionService } from "../../remote-function.service";
import { IonicModule } from "@ionic/angular";
import { JsonPipe } from "@angular/common";
import { FirebaseFunctionProvider } from "../../providers/firebase";

@Component({
  templateUrl: "remote-function-debug.page.html",
  styleUrl: "remote-function-debug.page.scss",
  standalone: true,
  imports: [IonicModule, JsonPipe],
})
export class RemoteFunctionDebugPage implements OnInit {
  public service = inject(RemoteFunctionService);

  public appCheckToken = computed(() => {
    const provider = this.service.provider;
    // TODO
  });

  private firebaseProvider = computed(() => {
    if (this.config.provider === "firebase") {
      return this.service.provider as FirebaseFunctionProvider;
    }
    return undefined;
  });

  public firebaseToken = computed(() => this.firebaseProvider()?.["appCheckToken"]());
  public firebaseTokenError = computed(() => this.firebaseProvider()?.["appCheckTokenError"]());

  public config = this.service["config"];

  async ngOnInit() {
    await this.service.ready();
  }
}
