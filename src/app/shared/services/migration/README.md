# Migration Service

The `MigrationService` provides a mechanism to execute one-time scripts during the application's startup. This is useful for data transformations, schema updates, or configuration changes that must happen before the user interacts with the app.

## Key Concepts

1.  **Explicit Execution**: Migrations are not auto-discovered. Services must explicitly call `handleMigrations` to run their specific migrations.
2.  **State Tracking**: Execution status is tracked by ID in `LocalStorage` (`MIGRATION_HISTORY`).
    - We track: `RUN`, `SKIPPED`, and `FAILED`.
    - Timestamps of execution are also recorded.
3.  **Run-All Strategy**: By default, **all** migrations are executed unless they are already in the history.
    - This ensures existing users always get updates.
    - It implies that fresh installs will run the entire history of migrations. **Migrations must be fast and robust.**
4.  **Preconditions**: Migrations can define a `preconditions()` function.
    - If it returns `false`, the migration is marked as `SKIPPED` and will **not** automatically retry later.

## Usage

### 1. Define Migrations

Create a migration object. Use a sortable date string for the ID.

```typescript
import { Migration } from "./migration.types";
import { MyService } from "./my.service";

export const MyMigration: Migration<MyService> = {
  // Additional migration info can be included in comments
  id: "2026-02-01_fix_user_data",
  
  // Optional: Only run if specific conditions are met
  preconditions: async (ctx: MyService) => {
    return ctx.hasLegacyData();
  },

  run: async (ctx: MyService) => {
    // Perform migration logic
    await ctx.fixData();
  }
};
```

### 2. Run Migrations

Inject `MigrationService` and call `handleMigrations`.

**Service-Specific Migrations:**

```typescript
export class MyService {
  private migrationService = inject(MigrationService)

  async init() {
    await this.migrationService.handleMigrations(
      MY_SERVICE_MIGRATIONS, 
      this, // Pass 'this' as context if needed
      "my_service" // Unique source namespace
    );
  }
}
```

## Best Practices

- **Idempotency**: While the service prevents re-running, try to make migration scripts idempotent (safe to run twice) where possible.
- **Error Handling**: If a migration throws an error, the app startup is **halted** with a critical alert. Ensure migrations are tested thoroughly.
- **Performance**: Migrations run during startup. Keep them fast.
- **Context**: Use the `context` argument to inject dependencies strictly (e.g., `Injector` or specific service instances).
