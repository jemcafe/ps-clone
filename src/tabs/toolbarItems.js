export default [
  { name: 'File', 
    options: [
      { name: 'New Project', window: 'newProject' },
      { name: 'Open' },
      { name: 'Save' },
      { name: 'Close' },
      { name: 'Close All'}
    ] 
  },
  { name: 'Edit', 
    options: [
      { name: 'Step Forward' },
      { name: 'Step Backward' },
      { name: 'Transform' }
    ] 
  },
  { name: 'Image', 
    options: [
      { name: 'Image Size' },
      { name: 'Canvas Size' }
    ] 
  },
  { name: 'Layer', 
    options: [
      { name: 'New', 
        options: [
          { name: 'Layer...' },
          { name: 'Group...' }
        ] 
      },
      { name: 'Duplicate' },
      { name: 'Delete', 
        options: [
          { name: 'Layer' }
        ] 
      },
      { name: 'Rename Layer...' }
    ] 
  },
  { name: 'Type', 
    options: [
      { name: 'Orientation' }
    ] 
  },
  { name: 'Select', 
    options: [
      { name: 'All' },
      { name: 'Deselect' },
      { name: 'Reselect' },
      { name: 'Inverse' }
    ] 
  },
  { name: 'Filter', 
    options: [
      { name: 'Filters' }
    ] 
  },
  { name: '3D', 
    options: [
      { name: 'Not an option' }
    ] 
  },
  { name: 'View', 
    options: [
      { name: 'Zoom In' },
      { name: 'Zoom out' },
      { name: 'Fit on Screen' }
    ] 
  },
  { name: 'Window', 
    options: [
      { name: 'Workspace', 
        options: [
          { name: 'Essentials (Default)' },
          { name: 'Graphic and Web' },
          { name: 'Photography' },
          { name: 'Painting' },
          { name: 'Motion' },
          { name: '3D' }
        ] 
      }
    ] 
  },
  { name: 'Help', 
    options: [
      { name: 'Google it' }
    ] 
  }
]