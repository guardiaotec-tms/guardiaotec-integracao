export class Vehicle {
  year: string;
  constructor(readonly serialNumber: number, year: string) {
    console.log(year.length, Number(year));
    if (year.length !== 4 || !Number(year)) throw new Error('Ano inválido!');
    this.year = year;
  }
}
