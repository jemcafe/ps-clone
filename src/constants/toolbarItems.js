/* Along with a name property, an option has a window, action, or options property */

export default [
  { name: 'File', 
    options: [
      { name: 'New Project', window: 'newProject' },
      { name: 'Open', action: 'openProject' },
      { name: 'Save', action: 'saveProject' },
      { name: 'Close', action: 'closeProject' },
      { name: 'Close All', action: 'closeAllProjects' }
    ] 
  },
  { name: 'Edit', 
    options: [
      { name: 'Step Forward', action: null  },
      { name: 'Step Backward', action: null  },
      { name: 'Transform', action: null }
    ] 
  },
  { name: 'Image', 
    options: [
      { name: 'Image Size', window: null },
      { name: 'Canvas Size', window: null }
    ] 
  },
  { name: 'Layer', 
    options: [
      { name: 'New', 
        options: [
          { name: 'Layer...', window: null },
          { name: 'Group...', window: null }
        ] 
      },
      { name: 'Duplicate', window: 'duplicateLayer' },
      { name: 'Delete', 
        options: [
          { name: 'Layer', action: 'deleteLayer' }
        ] 
      },
      { name: 'Rename Layer...', window: 'renameLayer' }
    ] 
  },
  { name: 'Type', 
    options: [
      { name: 'Orientation',
        options: [
          { name: 'Horizontal', action: null },
          { name: 'Vertical', action: null }
        ] 
      }
    ] 
  },
  { name: 'Select', 
    options: [
      { name: 'All', action: 'select_all' },
      { name: 'Deselect', action: 'deselect' },
      { name: 'Reselect', action: 'reselect' },
      { name: 'Inverse', action: 'inverse_select' }
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
      { name: 'Google it', link: 'https://www.google.com/' }
    ] 
  }
]