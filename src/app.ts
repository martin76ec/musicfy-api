import { REST_PORT } from "@constants/env";
import { xlogger } from "@providers/logs/logger";
import { SERVER_PORT_LOG } from "@providers/logs/logs-presets";
import { v1 } from "@routes/v1";
import Elysia from "elysia";

const api = new Elysia({ prefix: "/api" }).use(v1);
api.listen(REST_PORT, () => xlogger.info(SERVER_PORT_LOG, ["REST", REST_PORT]));

//const x = treaty<typeof api>("");
//const res = await x.api.v1.auth.login.post({
//  email: "",
//  password: "",
//});
