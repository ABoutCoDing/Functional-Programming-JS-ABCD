
const _ = require('lodash');

let enrollment = [
    {enrolled: 2, grade: 100},
    {enrolled: 2, grade: 80},
    {enrolled: 1, grade: 89}
];

_.chain(enrollment)
    .filter(student => student.enrolled > 1)
    .pluck('grade')
    .average()
    .value();

_.chain([1, 2, 3])
    .map(x => [x, x*2])
    .flatten()
    .sort()
    .value();