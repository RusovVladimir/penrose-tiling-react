import "./styles.css";
import { IDraw, IDrawOptions } from "./types";
import { drawPenroseTiles } from "./PenroseTiles";
import { createRoot } from "react-dom/client";
import React, { FC, useState, useRef, useEffect } from "react";
import { OptionsFrame } from "./OptionsFrame";

const App: FC = () => {
  // ------ Configuration --------
  const [options, setOptions] = useState<IDrawOptions>(() => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const wheelRadius =
      1.2 * Math.sqrt((width / 2.0) ** 2 + (height / 2.0) ** 2);
    return {
      numSubdivisions: 5,
      numRays: 10,
      wheelRadius,
    };
  });
  const canvasRef = useRef(null);
  useEffect(function init() {
    const canvas = canvasRef.current;
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  }, []);
  useEffect(
    function draw() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2.0, canvas.height / 2.0);
      ctx.scale(options.wheelRadius, options.wheelRadius);
      drawPenroseTiles(ctx, options.numSubdivisions, options.numRays);
      ctx.restore();
    },
    [options]
  );
  return (
    <>
      <canvas ref={canvasRef} />
      <OptionsFrame options={options} onChange={setOptions} />
    </>
  );
};

function main() {
  const rootNode = document.getElementById("root");
  const root = createRoot(rootNode);
  root.render(<App />);
}

main(); // addEventListener("DOMContentLoaded", main);
