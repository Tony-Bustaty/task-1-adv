import { Book, IBook } from "./Book.js";
 export interface IReferenceBook extends IBook {
locationCode:string
 }
export class ReferenceBook extends Book {
  constructor(
    private locationCode: string,
    ...args: ConstructorParameters<typeof Book>
  ) {
    super(...args);
  }
  override displayInfo() {
    super.displayInfo();
    console.log(`also you can find this using this code: ${this.locationCode}`);
  }
  getLocationCode() {
    return this.locationCode;
  }
  setLocationCode(locationCode: string) {
    this.locationCode = locationCode;
  }
}
