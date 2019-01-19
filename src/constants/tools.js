const toolList = [
  { 
    name: 'move', 
    icon: 'icon-move',
    cursor: 'cursor-move',
    select: 'Layer' 
  },
  { 
    name: 'eyedropper', 
    icon: 'icon-eyedropper',
    cursor: 'cursor-eyedropper',
    sampleSize: 'Point Sample' 
  },
  { 
    name: 'paintBrush', 
    icon: 'icon-paint-brush',
    // cursor: '',
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Normal'
  },
  { 
    name: 'eraser', 
    icon: 'icon-eraser',
    // cursor: '',
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Brush' 
  },
  { 
    name: 'paintBucket', 
    icon: 'icon-paint-bucket',
    cursor: 'cursor-paint-bucket',
    opacity: '100%'
  },
  { 
    name: 'pen', 
    icon: 'icon-pen',
    cursor: 'cursor-pen',
    type: 'Path',
    strokeWidth: '1px'
  },
  { 
    name: 'shape', 
    icon: 'icon-shape-circle',
    cursor: 'cursor-crosshair',
    type: 'Path',
    strokeWidth: '1px'
  },
  { 
    name: 'magnify', 
    icon: 'icon-magnify',
    cursor: 'cursor-zoom-in',
    zoom: 'in'
  },
  { 
    name: 'hand', 
    icon: 'icon-hand',
    cursor: 'cursor-hand',
    grabbing: false
  },
  { 
    name: 'ellipsis', 
    icon: 'icon-ellipsis',
    cursor: 'cursor-default'
  }
];

// A list of tool icons
export const toolIcons = toolList.map(({ name, icon }) => ({ 
  name, 
  icon 
}));

// Object containing all the tools
const tools = {};
toolList.forEach(tool => {
  const t = {...tool};
  delete t.name;
  tools[tool.name] = t;
});

console.log('toolList', toolList, 'tools', tools);

export default tools;