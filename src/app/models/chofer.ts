export class Chofer {
  readonly patente: string;
  readonly password: string;

  constructor({ patente, password }: { patente: string; password: string }) {
    this.patente = patente;
    this.password = password;
  }
}
