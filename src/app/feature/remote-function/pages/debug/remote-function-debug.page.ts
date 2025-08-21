import { Component, computed, inject, model, OnInit, signal } from "@angular/core";
import { RemoteFunctionService } from "../../remote-function.service";
import { IonicModule } from "@ionic/angular";
import { JsonPipe } from "@angular/common";
import { FirebaseFunctionProvider } from "../../providers/firebase";
import { FormsModule } from "@angular/forms";

interface ParamSignal {
  key: ReturnType<typeof signal<string>>;
  value: ReturnType<typeof signal<string>>;
}

@Component({
  templateUrl: "remote-function-debug.page.html",
  styleUrl: "remote-function-debug.page.scss",
  standalone: true,
  imports: [IonicModule, JsonPipe, FormsModule],
})
export class RemoteFunctionDebugPage implements OnInit {
  public service = inject(RemoteFunctionService);

  public targetFunctionName = model<string>("");

  public paramPairs = signal<ParamSignal[]>([]);

  public response = signal({ error: undefined, data: undefined });

  public requestPending = signal(false);

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

  // --- Param management ---
  public addParam(key: string = "", value: string = "") {
    this.paramPairs.update((pairs) => [...pairs, { key: signal(key), value: signal(value) }]);
  }
  public removeParam(index: number) {
    this.paramPairs.update((pairs) => pairs.filter((_, i) => i !== index));
  }

  private buildParams(): Record<string, any> {
    const params: Record<string, any> = {};
    for (const { key, value } of this.paramPairs()) {
      const k = key().trim();
      const v = value().trim();
      if (k) {
        params[k] = v;
      }
    }
    return params;
  }

  // --- Function ---
  public async triggerFunction(name: string) {
    this.requestPending.set(true);
    this.response.set({ error: undefined, data: undefined });
    const params = this.buildParams();
    console.log("[Remote Function] Run", { name, params });
    const res = await this.service.provider.invoke(name, params);
    this.response.set(res);
    this.requestPending.set(false);
  }
}
