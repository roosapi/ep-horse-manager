
const disciplineMap = new Map([
  ['Dressage', 'DR'],
  ['Show Jumping', 'SJ'],
  ['Cross Country', 'XC'],
  ['Horse Driving', 'HD'],
  ['Gaited Competitions', 'GC'],
  ['Reining', 'RE'],
  ['Endurance', 'EN'],
  ['Flat Racing', 'FR'],
  ['Baroque Riding', 'BR'],
  ['Trail', 'TR'],
  ['Horse Logging', 'HL']
]);

const defaultHideColumns = new Set(['Dressage','Show Jumping', 'Cross Country','Horse Driving',
                                    'Gaited Competitions','Reining','Endurance','Flat Racing','Horse Logging']);


export {disciplineMap, defaultHideColumns}