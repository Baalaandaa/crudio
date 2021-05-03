import MongoDB from "../src/database/Mongo";
describe("MongoDB class test", () => {
  test("CRUD", async (done) => {
    let db = new MongoDB("mongodb://localhost:27017", "test");
    await db.connect();
    
    
    let insert = await db.insert("test", {
      lol: true,
      meme: "test",
      obj: {
        test: 123
      }
    });
    expect(insert._id).toBeDefined();
    expect(insert.lol).toBeTruthy();
    
    let getOne = await db.getOne("test", {
      _id: insert._id
    });
    expect(getOne).toBeTruthy();
    expect(getOne._id.toString()).toBe(insert._id.toString());
    
    let rem = await db.deleteId("test", insert._id);
    expect(rem).toBeTruthy();
    
    await db.disconnect();
    done();
  });
});