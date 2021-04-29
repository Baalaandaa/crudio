import loggerGenerator from "./Logger";
const logger = loggerGenerator("Resource");

export const DBField = (validationOptions: any) => {
  return (target: Object, propertyKey: string) => {
    if(!propertyKey){
      logger.fatal("unknown propertyKey: ", propertyKey);
    }
    const descriptor = {
      get(this: any){
        let name: string = "__" + propertyKey;
        return this[name];
      },
      set(this: any, value: any){
        let name: string = "__" + propertyKey;
        logger.debug(value, validationOptions)
        this[name] = value;
      },
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, propertyKey, descriptor);
  }
}

const Resource = (name: string) => {
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    //@ts-ignore
    return class extends target {
      
      constructor() {
        console.log(`Resource ${name} constructor called`);
        super();
      }
      
      __apply(){
      
      }
      
    }
  }
}

export default Resource;