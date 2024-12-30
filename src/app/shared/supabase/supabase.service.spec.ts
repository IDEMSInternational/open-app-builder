import { TestBed } from "@angular/core/testing";
import { SupabaseService } from "./supabase.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/supabase.service.spec.ts
 */
describe("SupabaseService", () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(SupabaseService);
  });
});
