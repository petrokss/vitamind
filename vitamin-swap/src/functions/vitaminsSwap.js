const getBufferColor = (a, b) => {
  const allColors = ["W", "B", "G"];
  const next = allColors.find(color => color !== a && color !== b);
  return next;
};

const swap = (line, source, target, max, min) => {
  const operations = [];
  if (min <= max) {
    const bufferColor = getBufferColor(source, target);

    const ops1 = swap(line, source, bufferColor, max, min + 1);
    const result = {edges:min, from: line[min - 3].color, color: target};
    
    line[min - 3].color = target;
    const ops2 = swap(line, bufferColor, target, max, min + 1);

    operations.push(...ops1);
    operations.push(result);
    operations.push(...ops2);
  }

  return operations;
};

// get another color side from vitamins line if there such exists
const getOtherSide = (line, color) => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i].color !== color) {
      return line[i];
    }
  }
};

export const getColor = color => {
  return color === "W" ? "white" : color === "B" ? "black" : "grey"
}

const getMaxColors = line => {
  const byColor = {
    B: 0,
    W: 0,
    G: 0
  };
  let maxColor = "W";

  line.forEach(vitamin => {
    const { edges, color } = vitamin;
    const current = byColor[color];
    if (edges > current) {
      byColor[color] = edges;
    }
    if (edges > byColor[maxColor]) {
      maxColor = color;
    }
  });

  return {
    ...byColor,
    maxColor
  };
};

const swapVitamins = line => {

  const maxByColor = getMaxColors(line);
  
  const maxColor = maxByColor.maxColor;
  const maxEdge = Math.max(maxByColor.W, maxByColor.G, maxByColor.B);

  const differentEdge = getOtherSide(line, maxColor);

  if (differentEdge) {
    const prev = swap(
      line,
      maxColor,
      differentEdge.color,
      maxEdge,
      differentEdge.edges + 1
    );
    return prev.concat(swapVitamins(line));
  } else {
    return swap(line, maxColor, "W", maxEdge, 3);
  }
};

export const transformLine = rawLine => {
  let values = rawLine.toUpperCase().split(" ");
  return values.map(puzzle => {
    let side, color;
    if (puzzle[0] > 2 && puzzle[0] < 7) {
      side = puzzle[0];
    }
    if (["W", "B", "G"].includes(puzzle[1])) {
      color = puzzle[1];
    } else {
      console.error('You must include only B G W colours');
    }
    return {
      edges: Number.parseInt(side),
      color,
    };
  })
}

export const makeAllWhite = rawLine => {
  let line = transformLine(rawLine);
  return swapVitamins(line);
};
