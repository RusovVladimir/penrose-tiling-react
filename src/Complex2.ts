export class Complex2 {
  constructor(public real: number, public imag: number) {}
  clone() {
    return new Complex2(this.real, this.imag);
  }
  // cmath.rect
  static fromPolar(r: number, phi: number): Complex2 {
    return new Complex2(r * Math.cos(phi), r * Math.sin(phi));
  }
  static zero(): Complex2 {
    return new Complex2(0, 0);
  }
  add(x: Complex2): Complex2 {
    this.real += x.real;
    this.imag += x.imag;
    return this;
  }
  sub(x: Complex2): Complex2 {
    this.real -= x.real;
    this.imag -= x.imag;
    return this;
  }
  mulScalar(x: number): Complex2 {
    this.real *= x;
    this.imag *= x;
    return this;
  }
  divScalar(x: number): Complex2 {
    this.real /= x;
    this.imag /= x;
    return this;
  }
  abs(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }
}
