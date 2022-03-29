export class Booking {
  readonly number: number;
  readonly date: string;
  readonly from: string;
  readonly to: string;
  readonly distance: number;
  readonly price: number;

  constructor({ number, date, from, to, distance, price }: { number: number, date: string, from: string, to: string, distance: number, price: number }) {
    this.number = number;
    this.date = date;
    this.from = from;
    this.to = to;
    this.distance = distance;
    this.price = price;
  }
}
