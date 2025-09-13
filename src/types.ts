import { Complex2 } from "./Complex2";

export enum VertexColor {
  Red = 0,
  Blue,
}

export type Vertex = [
  Color: VertexColor,
  A: Complex2,
  B: Complex2,
  C: Complex2
];

export type Vertexes = Vertex[];

export interface IDrawOptions {
  numSubdivisions: number;
  numRays: number;
  wheelRadius: number;
}
