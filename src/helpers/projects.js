export const newId = (ids) => {
  if ( Array.isArray(ids) ) {
    const array = [...ids];

    if (!array.length) { 

      return 1;

    } else if (array.length === 1) {

      if (array[0] === 1) return array.length + 1;
      else return array.length;

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