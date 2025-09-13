import { Complex2 } from "./Complex2";
import { VertexColor, Vertexes } from "./types";

const goldenRatio = (1 + Math.sqrt(5)) / 2;

// A + (B - A) / goldenRatio
const subdividePoint = (A: Complex2, B: Complex2): Complex2 =>
  B.clone().sub(A).divScalar(goldenRatio).add(A);

export function subdivide(triangles: Vertexes): Vertexes {
  const result: Vertexes = [];
  for (const [color, A, B, C] of triangles) {
    if (color === VertexColor.Red) {
      // Subdivide red triangle
      const P = subdividePoint(A, B);
      result.push([VertexColor.Red, C, P, B], [VertexColor.Blue, P, C, A]);
    } else {
      // Subdivide blue triangle
      const Q = subdividePoint(B, A);
      const R = subdividePoint(B, C);
      result.push(
        [VertexColor.Blue, R, C, A],
        [VertexColor.Blue, Q, R, B],
        [VertexColor.Red, R, Q, A]
      );
    }
  }
  return result;
}

export function drawPenroseTiles(
  ctx: CanvasRenderingContext2D,
  numSubdivisions: number,
  raysCount: number
): void {
  // Create wheel of red triangles around the origin
  let triangles: Vertexes = [];
  for (let i = 0; i < raysCount; ++i) {
    let B = Complex2.fromPolar(1, ((2 * i - 1) * Math.PI) / raysCount);
    let C = Complex2.fromPolar(1, ((2 * i + 1) * Math.PI) / raysCount);
    if (i % 2 === 0) {
      // Make sure to mirror every second triangle}
      const Z = B;
      B = C;
      C = Z;
    }
    triangles.push([VertexColor.Red, Complex2.zero(), B, C]);
  }

  // Perform subdivisions
  for (let i = 0; i < numSubdivisions; ++i) {
    triangles = subdivide(triangles);
  }

  // Draw red triangles
  ctx.fillStyle = "rgb(255, 89, 89)";
  for (const [color, A, B, C] of triangles) {
    if (color == VertexColor.Red) {
      ctx.beginPath();
      ctx.moveTo(A.real, A.imag);
      ctx.lineTo(B.real, B.imag);
      ctx.lineTo(C.real, C.imag);
      ctx.fill();
    }
  }

  // Draw blue triangles
  ctx.fillStyle = "rgb(102, 102, 255)";
  for (const [color, A, B, C] of triangles) {
    if (color == VertexColor.Blue) {
      ctx.beginPath();
      ctx.moveTo(A.real, A.imag);
      ctx.lineTo(B.real, B.imag);
      ctx.lineTo(C.real, C.imag);
      ctx.fill();
    }
  }

  // Determine line width from size of first triangle
  const [color, A, B, C] = triangles[0];
  ctx.lineWidth = B.clone().sub(A).abs() / 10.0;
  ctx.lineJoin = "round";

  // Draw outlines
  ctx.fillStyle = "rgb(51, 51, 51)";
  for (const [color, A, B, C] of triangles) {
    ctx.beginPath();
    ctx.moveTo(C.real, C.imag);
    ctx.lineTo(A.real, A.imag);
    ctx.lineTo(B.real, B.imag);
    ctx.stroke();
  }
}
