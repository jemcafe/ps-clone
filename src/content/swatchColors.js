const RGBcolors = [
  {
    name: 'RGB red',
    rgb: { r: 255, g: 0, b: 0 }
  },
  {
    name: 'RGB yellow',
    rgb: { r: 255, g: 255, b: 0 }
  },
  {
    name: 'RGB green',
    rgb: { r: 0, g: 255, b: 0 }
  },
  {
    name: 'RGB cyan',
    rgb: { r: 0, g: 255, b: 255 }
  },
  {
    name: 'RGB blue',
    rgb: { r: 0, g: 0, b: 255 }
  },
  {
    name: 'RGB magenta',
    rgb: { r: 255, g: 0, b: 255 }
  },
];

const shades = (start, end, max) => {
  let increment = 0;
  let rgbValues = [];

  if (!end && !max) {
    max = start;
    end = max;
    start = 0;
  } else if (!max) {
    max = end;
    end = end - start;
    start = 0;
  } else if (!end) {
    end = start;
    max = end;
    start = 0;
  }

  if (end > start) {
    increment = +(255/max).toFixed(2);
    for (let i = end; i >= start; i--) {
      const value = Math.round(i * increment);
      const percent = 100 - Math.round(i/max * 100);
      const name = value === 0 ? 'black' : value === 255 ? 'white' : `%${percent} gray`;
      const rgb = { r: value, g: value, b: value };
      rgbValues.push({ name, rgb });
    }
  }

  return rgbValues;
}

const colors = [
  ...RGBcolors,
  ...shades(11, 20, 20),
  ...shades(0, 10, 20)
]

// console.log('shades: ', colors);

export default colors;