import { Logger } from "@tsed/logger";

const loggerGenerator = (name: string) => {
  let logger = new Logger(name);
  logger.appenders
    .set("std-log", {
      type: "stdout",
      levels: ["debug", "info", "trace"],
      layout: {
        type: "colored",
      },
    })
    .set("error-log", {
      type: "stderr",
      levels: ["fatal", "error", "warn"],
      layout: {
        type: "colored",
      },
    });
  return logger;
};

export default loggerGenerator;
