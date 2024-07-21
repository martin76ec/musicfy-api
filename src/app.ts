import { REST_PORT, RPC_PORT } from "./providers/constants/env";
import { xlogger } from "./providers/logs/logger";
import { SERVER_PORT_LOG } from "./providers/logs/logs-presets";
import { rest } from "./services/rest";
import { rpc } from "./services/rpc";

rest.listen(REST_PORT, () => xlogger.info(SERVER_PORT_LOG, ["REST", REST_PORT]));
rpc.listen(RPC_PORT, () => xlogger.info(SERVER_PORT_LOG, ["RPC", RPC_PORT]));
