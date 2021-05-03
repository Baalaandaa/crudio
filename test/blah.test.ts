import {Crudio, DBField, Resource} from "../src/index";
import { describe, expect, it } from "@jest/globals";
import * as joi from "joi";
import 'reflect-metadata';
import {getValidationErrors} from "../src/Resource";

@Resource("test")
class TestResource {
  @DBField(joi.string().min(3).required())
  lol: any;
  @DBField(joi.number().required())
  kek: number;
  
  constructor() {
    this.lol = "kek";
    this.kek = 0;
  }
}


describe("sample", () => {
  it("works", () => {
    //@ts-ignore
    
    let t = new TestResource();
    // console.log(getValidationErrors(t));
    expect(t.lol).toBe("kek");
    let l = new Crudio([t]);
    expect(l).toBeDefined();
  });
});
