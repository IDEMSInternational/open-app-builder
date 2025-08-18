import { Component, computed, inject, model, OnInit, signal } from "@angular/core";
import { RemoteFunctionService } from "../../remote-function.service";
import { IonicModule } from "@ionic/angular";
import { JsonPipe } from "@angular/common";
import { FirebaseFunctionProvider } from "../../providers/firebase";
import { FormsModule } from "@angular/forms";

@Component({
  templateUrl: "remote-function-debug.page.html",
  styleUrl: "remote-function-debug.page.scss",
  standalone: true,
  imports: [IonicModule, JsonPipe, FormsModule],
})
export class RemoteFunctionDebugPage implements OnInit {
  public service = inject(RemoteFunctionService);

  public targetFunctionName = model<string>("rapidproUserData"); // TODO - change to empty

  public response = signal({ error: undefined, data: undefined });

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

  public async triggerFunction(name: string) {
    this.response.set({ error: undefined, data: undefined });
    const res = await this.service.provider.invoke(name, {});
    this.response.set(res);
  }
}
