import {ObjectGeo} from './ObjectGeo';

export class Square extends ObjectGeo{
  composition: number;

  constructor(length: number) {
    super();
    this.length = length;
  }
}
