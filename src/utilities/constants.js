
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
  ['Horse Logging', 'HL'],
  ['Eventing','EV'],
  ['Working Equitation','WE'],
  ['Steeplechase','SC'],
  ['Endurance Driving','ED'],
]);

const combiDisciplinesMap = new Map([
  ['Eventing', ['DR','SJ','XC']],
  ['Working Equitation', ['BR','TR']],
  ['Steeplechase', ['FR','XC']],
  ['Endurance Driving', ['EN','HD']],
])

const defaultHideColumns = new Set(['Dressage','Show Jumping', 'Cross Country','Horse Driving',
                                    'Gaited Competitions','Reining','Endurance','Flat Racing','Horse Logging',
                                    'Eventing', 'Steeplechase','Endurance Driving']);


export {disciplineMap, defaultHideColumns,combiDisciplinesMap}