## Use Case Request

### Context

#### Rules

1. Throw when something is wrong
2. Use case should define message and status for responses if needed, otherwise let the base use case handle it with default values
3. Keep things simple, dont make long functions
4. DS classes should not do complex verifications except specific things

#### Base Use Case

```typescript
import { logger } from "@providers/logs/logger";
import { HTTPCode, safeGenericResponse, SafeResponse } from "@src/domain/http/response";

export abstract class BaseUseCase<P, R = undefined> {
  protected resSuccess: SafeResponse = { message: "successful", status: HTTPCode.OK };
  protected resError: SafeResponse = { message: "internal server error", status: HTTPCode.INTERNAL_SERVER_ERROR };

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async process(_p: P): Promise<SafeResponse<R> | void> {
    throw new Error("process function not implemented");
  }

  public async run(p: P): Promise<SafeResponse<R>> {
    try {
      const response = await this.process(p);
      return response || safeGenericResponse(this.resSuccess);
    } catch (error) {
      logger.error(error, "RUN PROCESS UNHANDLED ERROR:");
      return safeGenericResponse(this.resError);
    }
  }
}
```

#### Data Store Example

```typescript
import { Transaction } from "@constants/types";
import { db } from "@providers/database/drizzle/drizzle";
import { songs } from "@providers/database/drizzle/schema";
import { CreateSongSchema } from "@src/domain/songs/schemas";
import { eq } from "drizzle-orm";
import { Static } from "elysia";

export abstract class SongsDS {
  public static getByID(id: number) {
    return db.select().from(songs).where(eq(songs.id, id)).execute();
  }

  public static insert(song: Static<typeof CreateSongSchema>, tx?: Transaction) {
    return (tx ?? db).insert(songs).values(song).execute();
  }
}
```

#### Schema example 

```typescript
import { t } from "elysia";

export const LoginSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({
    minLength: 1,
    readOnly: true,
  }),
});
```

#### Use case example

```typescript
import { CreateSongSchema } from "@src/domain/songs/schemas";
import { BaseUseCase } from "@src/domain/use-cases/use-case";
import { SongsDS } from "@src/infrastructure/database/SongsDS";

type P = typeof CreateSongSchema.static;

export class CreateUC extends BaseUseCase<P> {
  protected async process(p: P) {
    await SongsDS.insert(p);
  }
}

```

#### Use case singleton export

```typescript
import { CreateUC } from "@src/application/songs/use-cases/create";

let Create: CreateUC | undefined;
if (Create === undefined) Create = new CreateUC();

export { Create };

```

#### Route example

```Route
import { UseCases } from "@src/application/songs";
import { CreateSongSchema } from "@src/domain/songs/schemas";
import Elysia from "elysia";

export const songs = new Elysia({ prefix: "/songs" });

const create = { body: CreateSongSchema };
songs.post(
  "/",
  async ({ body, set }) => {
    const response = await UseCases.Create?.run(body);
    set.status = response?.status;
    return response;
  },
  create,
);
```

### Use Case Name
`<Name of the use case>`

### Description
`<Brief description of what the use case should do>`

### Input Schema
\`\`\`typescript
// Provide the fields and types for the input schema
{
  field1: string;
  field2: number;
  field3: boolean;
}
\`\`\`

### Output (Optional)
\`\`\`typescript
// Define the structure of the output if applicable, or specify `void` if no output is needed
{
  field1: string;
  field2: number;
}
\`\`\`

### Data Store (DS) Operations
- `getByID(id: number)`: `<Expected operation>`  
- `insert(data: InputSchema)`: `<Expected operation>`  
- `<Add any additional required operations>`

---

### Example Request Usage
\`\`\`http
POST /<endpoint>
Content-Type: application/json

{
  "field1": "example",
  "field2": 42,
  "field3": true
}
\`\`\`

### Expected Response
\`\`\`json
{
  "field1": "result",
  "field2": 24
}
\`\`\`
