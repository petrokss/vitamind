import React from 'react';

export default function ShapeFigure({
  points,
  drawColor
}) {
  return(
    <svg className="figure" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon points={points} fill={drawColor} stroke={drawColor === "white" ? "black" : drawColor} />
    </svg>
  );
}