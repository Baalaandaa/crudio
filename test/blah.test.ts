import {Crudio, DBField, Resource} from "../src/index";
import { describe, expect, it } from "@jest/globals";

describe('sample', () => {
  it('works', () => {

      @Resource("test")
      class test{

        @DBField("lol")
        lol: string;
        kek: number;

        constructor() {
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
