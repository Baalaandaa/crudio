import loggerGenerator from "./Logger";
import { AnySchema } from "joi";
import "reflect-metadata";
const logger = loggerGenerator("Resource");

export const DBField = (validationOptions?: AnySchema) => {
  return (target: Object, propertyKey: string) => {
    if (!propertyKey) {
      logger.fatal("unknown propertyKey: ", propertyKey);
    }
    const descriptor = {
      get(this: any) {
        let name: string = "__" + propertyKey;
        return this[name];
      },
      set(this: any, value: any) {
        let name: string = "__" + propertyKey;
        const validationResult = validationOptions?.validate(value);
        if(validationResult?.error) {
          let metadata = Reflect.getMetadata("validationErrors", target);
          if (!metadata) metadata = [];
          metadata.push(validationResult?.error);
          Reflect.defineMetadata("validationErrors", metadata, target);
        }
        this[name] = value;
      },
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, propertyKey, descriptor);
  };
};

const Resource = (name: string) => {
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    //@ts-ignore
    return class extends target {
      
      constructor() {
        super();
        console.log(`Resource ${name} constructor called`);
        Object.defineProperty(this, "errors", {
          value: [],
          enumerable: true,
          configurable: true
        })
      }

      __apply() {}
    };
  };
};

export const getValidationErrors = (t: Object) => {
  return Reflect.getMetadata("validationErrors", t);
}

export default Resource;
