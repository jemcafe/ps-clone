export const newId = (ids) => {
  const array = [...ids];
  array.sort((a, b) => a - b);

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== i+1) return array[i-1]+1;
  }

  return array.length+1;
}