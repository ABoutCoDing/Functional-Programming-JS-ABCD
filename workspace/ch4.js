const _ = require('lodash');
const R = require('ramda');
var log4js = require('log4js');

const db = require('./helper').db;

let names = ['alonzo church', 'Haskell curry', 'stephen_kleene', 
        'John Von Neumann', 'stephen_kleene'];
        
const isValid = val => !_.isUndefined(val) && !_.isNull(val);

// 122
let result = _.chain(names)
    .filter(isValid)
    .map(s => s.replace(/_/, ' '))
    .uniq()
    .map(_.startCase)
    .sort()
    .value();



// 125
// trim :: String -> String
const trim = (str) => str.replace(/^\s*|\s*$/g, '');

// normalize :: String -> String
const normalize = (str) => str.replace(/\-/g, '');
normalize(trim(' 444-44-44444 '));


// 127
const Tuple = function ( /* 형식 */ ) {
    const typeInfo = Array.prototype.slice.call(arguments);
    const _T = function( /* 값 */ ) {
        const values = Array.prototype.slice.call(arguments);
        if (values.some(val => val === null || val === undefined)) {
                throw new ReferenceError('튜플은 null 값을 가질 수 없습니다!');
        }
        if (values.length !== typeInfo.length) {
            throw new TypeError('튜플 항수가 프로토타입과 맞지 않습니다.')
        }
        values.forEach((val, index) => {
            this['_' + (index + 1)] = checkType(typeInfo[index])(val);
        }, this);
        Object.freeze(this);
    };
    _T.prototype.values = () => {
        return Object.keys(this).map(k => this[k], this);
    };
    return _T;
};

const Status = Tuple(Boolean, String);


// 127
// trim :: String -> String
const trim = (str) => str.replace(/^\s*|\s*$/g, '')

// normalize :; String -> String
const normalize = (str) => str.replace(/\-/g, '')

// isValid :: String -> Status
const isValid = function (str) {
    if (str.length === 0) {
        return new Status(false, '잘못된 입력입니다. 빈 값일 리 없지요!');
    } else {
        return new Status(true, '성공');
    }
}

isValid(normalize(trim('444-44-4444')));   //-> (true, '성공!')

// 128
const StringPair = Tuple(String, String);
const name = new StringPair('Barkley', 'Rosser');

[first, last] = name.value();
first;
last;

const fullname = new StringPair('3', 'Barkley', 'Rosser');


// 130
function curry2(fn) {
    return function(firstArg) {
        return function(secondArg) {
            return fn(firstArg, secondArg);
        }
    }
}

const name = curry2((last, first) => new StringPair(last, first));

[first, last] = name('Curry')('Haskell').values();
first;
last;

name('Curry');  //-> Function


// 131
// checkType :: Type -> Object -> Object
const checkType = R.curry((typeDef, obj) => {
    if (!R.is(typeDef, obj)) {
        let type = typeof obj;
        throw new TypeError(`형식 불일치 : [ ${typeDef}]이어야 하는데, [${type}]입니다.`);
    }
    return obj;
});

checkType(String)('Curry'); //-> 'Curry'
checkType(Number)(3); //-> 3
checkType(Number)(3.5) //-> 3.5

let now = new Data();
checkType(Date)(now); //-> now
checkType(Object({})); //-> {}
checkType(String)(42);  //-> TypeError


// 132
// fullname :: (String, String) -> String
const fullname = function(first, last) {
    //...
}

// fullname :: String -> String -> String
const fullname = 
    function (first) {
        return function(last) {
            //...
        }
    }


// 134
const logger = new log4js.getLogger('StudentEvents');
logger.info('학생이 정상적으로 추가되었습니다.');


logger.addAppender(new Log4js.JSAlertAppender());
appender.setLayout(new Log4js.JSONLayout());


// 136
// function partial() {
//     let fn = this, boundArgs = Array.prototype.slice.call(arguments);
//     let placeholder = <<placeholder object>>;
//     let bound = function() {
//         let position = 0, length = boundArgs.length;
//         let args = Array(length);
//         for (let i = 0; i < length; i++) {
//             args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
//         }

//         while(position < arguments.length) {
//             args.push(arguments[position++]);
//         }
//         return fn.apply(this, args);
//     };
//     return bound;   
// }

// 137
// const consoleLog = _.partial(logger, 'console', 'json', 'FJS 부분적용');

// const consoleInfoLog = _.partial(consoleLog, 'INFO');
// consoleInfoLog('INFO 로거를 부분 적용으로 구성했습니다.');


// 137
var curriedFn = function(a) {
    return function(b) {
        return function(c) {
            return a + ", " + b + ", " + c + "는 좋은 친구들입니다.";
        };
    };
};

// 부분적용
var partialAppliedFn = function(a) {
    return function(b, c) {
        return a + ", " + b + ", " + c + "는 좋은 친구들입니다.";
    }
}


const log = _.bind(logger, 'console', 'json', 'FJS 바인딩');
log('WARN', '함수형 프로그래밍...')



// 138 
String.prototype.first = _.partial(String.prototype.substring, 0, _);
'Functional Programming'.first(3);

String.prototype.asName = _.partial(String.prototype.replace, /(\w+)\s(\w+)/, '$2, $1');
'Alonzo Church'.asName(); //-> 'Church, Alonzo"

String.prototype.explode = _.partial(String.prototype.match, /[\w]/gi);
'ABC'.explode(); //-> ['A', 'B', 'C']

String.prototype.parseUrl  = _.partial(String.prototype.match, /(http[s]?|ftp):\/\/([^:\/\s]+)\.([^:\/\s]{2, 5})/);
'http://example.com'.parseUrl(); //-> ['http://example.com', 'http', 'example', 'com']


if (!String.prototype.explode) {
    String.prototype.explode =  _.partial(String.prototype.match, /[\w]/gi);
}

// 139
const Scheduler = (function() {
    const delayedFn = _.bind(setTimeout, undefined, _, _);

    return {
        delay5: _.partial(delayedFn, _, 5000),
        delay10: _.partial(delayedFn, _, 10000),
        delay: _.partial(delayedFn, _, _)
    };
})();

Scheduler.delay5(function(){
    console.log('5초후에 실행합니다.');
});


// 141
const Node = Tuple(Object, Tuple);
const element = R.curry((val, tuple) => new Node(val, tuple));
// 142
var grades = element(1, element(2, element(3, element(4, null))));


// 142
const str = "WE can only...";

const explode = (str) => str.split(/\s+/);
const count = (arr) => arr.length;
const countWords = R.compose(count, explode);
countWords(str); //-> 19


// 144
f g = f(g) = compose :: ((B -> C), (A -> B)) -> (A -> C)



// 144
function compose(/* 함수 */) {
    let args = arguments;
    let start = args.length - 1;
    return function() {
        let i = start;
        let result = args[start].apply(this, arguments);
        while(i--)
            result = args[i].call(this, result);
        return result;
    }
}



const trim = (str) => str.replace(/^\s*|\s*$/g, '')
const normalize = (str) => str.replace(/\-/g, '');
const validLength  = (param, str) => str.length === param;
const checkLengthSsn = _.partial(validLength, 9);

const cleanInput = R.compose(normalize, trim);
const isValidSsn = R.compose(checkLengthSsn, cleanInput);

cleanInput(' 444-44-4444 '); //-> '444444444'
isValidSsn(' 444-44-4444 '); //-> true


// 145
Function.prototype.compose = R.compose;

const cleanInput = checkLengthSsn.compose(normalize).compose(trim);


// 146
const students = ['Rosser', 'Turing', 'Kleene', 'Church'];
const grades = [80, 100, 90, 99];

const smartestStudent = R.compose(
    R.head,
    R.pluck(0),
    R.reverse,
    R.sortBy(R.prop(1)),
    R.zip);

smartestStudent(students, grades);



// 146
const first = R.head;
const getName = R.pluck(0);
const reverse = R.reverse;
const sortByGrade = R.sortBy(R.prop(1));
const combine = R.zip;

R.compose(first, getName, sortByGrade, combine);



// 148
const showStudent = compose(append, csv, findStudent);

// 149

const find = R.curry((db, id) => db.find(id));
// findObject :: DB -> String -> Object
const findObject = R.curry(function (db, id) {
    const obj = find(db, id);
    if (obj === null) {
        throw new Error(`Object with ID [${id}] not found`);
    }
    return obj;
});
// findStudent :: String -> Student
const findStudent = findObject(db);
const csv = ({ ssn, firstname, lastname }) => `${ssn}, ${firstname}, ${lastname}`;
// append :: String -> String -> String
const append = R.curry(function (elementId, info) {
    console.log(info);
    return info;
});
// showStudent :: String -> Integer
const showStudent = R.compose(
    append('#student-info'),
    csv,
    findStudent,
    normalize,
    trim);
showStudent('44444-4444'); //-> 444-44-4444, Alonzo, Church


// 150
R.pipe(
    trim,
    normalize,
    findStudent,
    csv,
    append('#student-info')
);

// 151
const runProgram = R.pipe(
    R.map(R.toLower),
    R.uniq,
    R.sort(R.identity)
);

runProgram(['Functional', 'Programming', 'Curry', 'Memoization', 'Partial', 'Curry', 'Programming']);
//-> [curry, functional, memoization, partial, programming]

// 153
// const debugLog = _.partial(logger, 'console', 'basic', 'MyLogger', 'DEBUG');


// const debug = R.tap(debugLog);
// const cleanInput = R.compose(normalize, debug, trim);
// const isValidSsn = R.compose(debug, checkLengthSsn, debug, cleanInput);


// isValidSsn('444-44-4444');


// 153
const alt = function(func1, func2) {
    return function(val) {
        return func1(val) || func2(val);
    }
};


const alt = R.curry((func1, func2, val) => func1(val) || func2(val));


const showStudent = R.compose (
    append('#student-info'),
    csv,
    alt(findStudent, createNewStudent)
);

showStudent('444-44-4444')



var student = findStudent('444-44-4444');
if(student !== null) {
    let info = csv(student);
    append('#student-info', info);
} else {
    let newStudent = createNewStudent('444-44-4444');
    let info = csv(newStudent);
    append('#student-info', info);
}


// 154
const seq = function(/* 함수 */) {
    const funcs = Array.prototype.slice.call(arguments);
    return function(val) {
        funcs.forEach(function (fn) {
            fn(val);
        });
    };
};



const showStudent = R.compose(
    seq(append('#student-info'), consoleLog),
    csv,
    findStudent
);



// 156
const fork = function(join, func1, func2) {
    return function(val) {
        return join(func1(val), func2(val));
    }
}



const computeAverageGrade = R.compose(getLetterGrade, fork(R.divide, R.sum, R.length));

computeAverageGrade([99, 80, 89]); //-> 'B'


const eqMedianAverage = fork(R.equals, R.median, R.mean);
eqMedianAverage([80, 90, 100]); //-> True
eqMedianAverage([81, 90, 100]); //-> False







