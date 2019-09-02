export default function getPointsByEdges(edge) {
  let points;
  if (edge === 3) {
    points="100 40, 160 160, 40 160";
  } else if(edge === 4) {
    points="40 40, 160 40, 160 160, 40 160";
  } else if(edge === 5) {
    points="100 40, 160 80, 140 140, 60 140, 40 80";
  } else if(edge === 6) {
    points="80 40, 120 40, 160 80, 160 120, 120 160, 80 160, 40 120, 40 80";
  } else {
    console.error('from triangle to hexagon');
  }
  return points;
}