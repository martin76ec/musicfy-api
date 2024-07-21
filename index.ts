import { REST_PORT, RPC_PORT } from "./src/providers/constants/env";
import { SERVER_PORT_LOG } from "./src/providers/constants/logs-presets";
import { xlogger } from "./src/providers/logs/logger";
import { rest } from "./src/services/rest";
import { rpc } from "./src/services/rpc";

rest.listen(REST_PORT, () => xlogger.info(SERVER_PORT_LOG, ["REST", REST_PORT]));
rpc.listen(RPC_PORT, () => xlogger.info(SERVER_PORT_LOG, ["RPC", RPC_PORT]));
