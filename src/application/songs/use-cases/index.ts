import { CreateUC } from "@src/application/songs/use-cases/create";

let Create: CreateUC | undefined;
if (Create === undefined) Create = new CreateUC();

export { Create };
