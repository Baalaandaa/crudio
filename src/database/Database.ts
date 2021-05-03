export default interface Database {
  getAll(schema: string, filterOptions?: any): Promise<any[]>;
  getOne(schema: string, filterOptions?: any): Promise<any>;
  insert(schema: string, data: Object): Promise<any>;
  updateId(schema: string, id: any): Promise<any>;
  update(schema: string, newData: Object, filterOptions?: any): Promise<any>;
  deleteId(schema: string, id: any): Promise<boolean>;
  delete(schema: string, filterOptions?: any): Promise<boolean>;
}
