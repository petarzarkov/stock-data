import { HotLogger } from "hot-utils";
import { connect } from "@db/connector";
import { startServer } from "@app/server";
import { startHealtcheck } from "./healthcheck";

const log = HotLogger.createLogger("@stock-data");

const main = async () => {
    const sequelizeInstance = await connect();
    await startServer(log, sequelizeInstance);
    void startHealtcheck();
};

main().catch((err: Error) => {
    log.error("Exception raised while starting Stock Data.", { err });
    setTimeout(() => process.exit(1), 1000);
});