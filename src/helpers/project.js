import uuidv4 from 'uuid/v4';

export const newProject = ({id, project, imgData}) => ({
  ...project,
  id: uuidv4(), // using uuid for now instead of the parameter
  canvasLayer: 1,
  layerIndex: 0,
  layers: [newLayer({id: 1, imgData})],
  zoom: '100%',
  scroll: { x: 0, y: 0 },
  dateCreated: new Date()
});

export const newLayer = ({id, imgData}) => ({ 
  id: id, 
  name: `Layer ${id}`, 
  imgData: imgData ? imgData : null,
  visible: true, 
  locked: false,
  opacity: '100%'
});

export const newId = (ids) => {
  if ( Array.isArray(ids) ) {
    const array = [...ids];

    if (!array.length || !array[0]) { 

      return 1;

    } else if (array.length === 1) {

      if (array[0] === 1) return array.length + 1;
      return array.length;

    } else {

      array.sort((a, b) => a - b);
      if (array[0] > 1) return 1;
      for (let i = 0; i < array.length; i++) {
        if (array[i] !== (i + 1)) return array[i-1] + 1;
      }
      return array.length + 1;

    }
  }
  return 0;
}