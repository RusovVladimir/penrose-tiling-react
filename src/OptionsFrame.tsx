import React, { FC } from "react";

interface OptionsFrameProps {
  options: IDrawOptions;
  onChange: (options: IDrawOptions) => void;
}

export const OptionsFrame: FC<OptionsFrameProps> = ({ options, onChange }) => {
  const onChangeNumSubdivisions = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange({ ...options, numSubdivisions: parseInt(target.value) });
  };

  const onChangeRaysCount = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange({ ...options, numRays: parseInt(target.value) });
  };

  const onChangeWheelRadius = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange({ ...options, wheelRadius: parseInt(target.value) });
  };

  return (
    <section class="parameters-section">
      <h1>Parameters</h1>
      <label>
        <input
          type="range"
          min="0"
          max="9"
          value={options.numSubdivisions}
          onChange={onChangeNumSubdivisions}
        />
        Subdivisions {options.numSubdivisions}
      </label>
      <label>
        <input
          type="range"
          min="2"
          max="50"
          step="2"
          value={options.numRays}
          onChange={onChangeRaysCount}
        />
        Rays {options.numRays}
      </label>
      <label>
        <input
          type="number"
          value={options.wheelRadius}
          onChange={onChangeWheelRadius}
        />
        Radius
      </label>
    </section>
  );
};
