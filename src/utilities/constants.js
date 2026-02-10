const persoStats = ['temp','char','attspan','mind','handle','nerves','int'];
const confoStats = ['head','baseneck','neck','back','f_camp','f_base','f_toe','b_camp','b_base','b_toe'];
const baseStats = persoStats.concat(confoStats);
                    
/* const persoMap = new Map([
  ['Temperament','temp'],
  ['Charisma','char'],
  ['Attention span','attspan'],
  ['Mind','mind'],
  ['Handling','handle'],
  ['']'nerves','int'
]) */

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


export {disciplineMap, defaultHideColumns,combiDisciplinesMap, persoStats, confoStats, baseStats}