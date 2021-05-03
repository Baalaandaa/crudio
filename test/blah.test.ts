import {Crudio, DBField, Resource} from "../src/index";
import { describe, expect, it } from "@jest/globals";
import * as joi from 'joi';
import { BaseResource } from "../src/Resource";

describe('sample', () => {
  it('works', () => {

      @Resource("test")
      class test extends BaseResource {

        @DBField(joi.number().required())
        lol: string;
        kek: number;

        constructor() {
          super();
          this.lol = "kek";
          this.kek = 0;
        }

      }

      let t = new test();
      expect(t.lol).toBe("kek");
      let l = new Crudio([t]);
      expect(l).toBeDefined();
  });
});
