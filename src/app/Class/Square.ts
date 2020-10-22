import {ObjectGeo} from './ObjectGeo';

export class Square extends ObjectGeo{
  private color: string;
  private length: number;
  private x: number;
  private y: number;
  composition: number;

  constructor(length: number) {
    super();
    this.length = length;
  }
}
