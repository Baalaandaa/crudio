import loggerGenerator from "./Logger";
const logger = loggerGenerator("Crudio");

export default class Crudio{

  resources: [Object];
  
  constructor(resources_: [Object]) {
    this.resources = resources_;
    logger.debug("test");
  }

}
