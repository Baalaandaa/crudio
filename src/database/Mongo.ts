import Database from "./Database";
import { MongoClient, MongoClientOptions } from "mongodb";
import loggerGenerator from "../Logger";
const logger = loggerGenerator("MongoDB");

export default class MongoDB implements Database {
  client: MongoClient;
  dbName: string;

  constructor(
    uri: string,
    dbName: string,
    connectionOptions?: MongoClientOptions
  ) {
    this.dbName = dbName;
    this.client = new MongoClient(uri, connectionOptions);
  }

  async connect(): Promise<boolean> {
    try {
      await this.client.connect();
      logger.info("MongoDB connection established");
      return true;
    } catch (e) {
      logger.fatal("MongoDB connection failed \n%s", JSON.stringify(e));
      return false;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  delete(schema: string, filterOptions?: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client
        .db(this.dbName)
        .collection(schema)
        .findOneAndDelete(
          {
            ...filterOptions,
          },
          err => {
            if (err) reject(err);
            else resolve(true);
          }
        );
    });
  }

  deleteId(schema: string, id: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client
        .db(this.dbName)
        .collection(schema)
        .findOneAndDelete(
          {
            _id: id,
          },
          err => {
            if (err) reject(err);
            else resolve(true);
          }
        );
    });
  }

  getAll(schema: string, filterOptions?: any): Promise<any[]> {
    return new Promise<any[]>(async resolve => {
      let result = await this.client
        .db(this.dbName)
        .collection(schema)
        .find({
          ...filterOptions,
        });
      resolve(await result.toArray());
    });
  }

  getOne(schema: string, filterOptions?: any): Promise<any> {
    return new Promise<any>(async resolve => {
      let temp = await this.getAll(schema, filterOptions);
      resolve(temp[0]); //TODO: change to normal query
    });
  }

  insert(schema: string, data: Object): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let result = await this.client
          .db(this.dbName)
          .collection(schema)
          .insertOne(data);
        resolve(result.ops[0]);
      } catch (e) {
        reject(e);
      }
    });
  }

  //@ts-ignore
  update(schema: string, newData: Object, filterOptions?: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  //@ts-ignore
  updateId(schema: string, id: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}
