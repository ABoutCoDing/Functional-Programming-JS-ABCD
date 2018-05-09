import { Address } from "./model/Address";
const R = require('ramda');
const _ = require('lodash');

// 165
class Wrapper {
    constructor(value) {
        this._value = value;
    }

    // map :: (A -> B) -> A -> B
    map(f) {
        return f(this._value);
    };

    toString() {
        return 'Wrapper (' + this._value + ')';
    }
}

// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val)




// 166
const wrappedValue = wrap('Get Functional');
wrappedValue.map(R.identity); //-> 'Get Functional'


wrappedValue.map(console.log);
wrappedValue.map(R.toUpper);    //-> 'GET FUNCTIONAL'

// const wrappedNull = wrap(null);
// wrappedNull.map(doWork);

// 168
const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);

const two = wrap(2);

const five = two.fmap(plus3);
five.map(R.identity); //-> 5


two.fmap(plus3).fmap(plus10);   //-> Wrapper(15)


// 169
const two = wrap(2);
two.fmap(plus3).fmap(R.tap(infoLogger)); //-> Wrapper(5)


// 170
wrap('Get Functional').fmap(R.identity); //-> Wrapper('Get Functional')

two.fmap(R.compose(plus3, R.tap(infoLogger))).map(R.identity); //-> 5


$('#student-info').fadeIn(3000).text(student.fullname());


// 171
const findStudent = R.curry((db, ssn) => 
    wrap(find(db, ssn))
);

const getAddress = student => 
    wrap(student, fmap(R.prop('address')));

const studentAddress = R.compose(
    getAddress,
    findStudent(DB('student'))
);

studentAddress('444-44-4444'); //-> Wrapper(Wrapper(address))

studentAddress('444-44-4444').map(R.identity).map(R.identity);


// 172
Wrapper(2).fmap(half); //-> Wrapper(1)
Wrapper(3).fmap(half); //-> Wrapper(1.5)




class Empty {
    map(f) {
        return this;
    }

    // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B]
    fmap (_) {
        return new Empty();
    }

    toString() {
        return 'Empty ()';
    }
};



// 173
const empty = () => new Empty();

const isEven = (n) => Number.isFinite(n) && (n % 2 == 0);
const half = (val) => isEven(val) ? wrap(val / 2) : empty();

half(4);    //-> Wrapper(2)
half(3);    //-> Empty




half(4).fmap(plus3); //-> Wrapper(5)
half(3).fmap(plus3); //-> Empty



// 174
class Wrapper {
    constructor(value) {
        this._value = value;
    }

    static of (a) {
        return new Wrapper(a);
    }

    map(f) {
        return Wrapper.of(f(this._value));
    }

    join() {
        if(!(this._value instanceof Wrapper)) {
            return this;
        }
        return this._value.join();
    }

    get() {
        return this._value;
    }

    toString() {
        return `Wrapper (${this._value})`;
    }
}


// 175
Wrapper.of('Hello Monads!')
    .map(R.toUpper)
    .map(R.identity);   //-> Wrapper('HELLO MONADS')


// 175
// findObject :: DB -> String -> Wrapper
const findObject = R.curry((db, id) => Wrapper.of(find(db, id)));

// getAddress :: Student -> Wrapper
const getAddress = student => Wrapper.of(student.map(R.prop('address')));

const studentAddress = R.compose(getAddress, findObject(DB('student')));
studentAddress('444-44-4444').join().get();



// 176
Wrapper.of(Wrapper.of(Wrapper.of('Get Functional'))).join();
//-> Wrapper('Get Functional')


R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


class Maybe {
    static just(a) {
        return new Just(a);
    }

    static nothing() {
        return new Nothing();
    }

    static fromNullable(a) {
        return a !== null ? Maybe.just(a) : Maybe.nothing();
    }

    static of (a) {
        return just(a);
    }

    get isNothing() {
        return false;
    }

    get isJust() {
        return false;
    }
}

class Just extends Maybe {
    constructor(value) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    map(f) {
        return Maybe.fromNullable(f(this._value));
    }

    getOrElse() {
        return this._value;
    }

    filter(f) {
        Maybe.fromNullable(f(this._value) ? this._value : null);
    }

    chain(f) {
        return f(this._value);
    }

    toString() {
        return `Maybe.Just(${this._value})`;
    }
}

class Nothing extends Maybe {
    map(f) {
        return this;
    }

    get value () {
        throw new TypeError("Nothing 값을 가져올 수 없습니다.");
    }

    getOrElse(other) {
        return other;
    }

    filter(f) {
        return this._value;
    }

    chain(f) {
        return this;
    }

    toString() {
        return 'Maybe Nothing';
    }
}

// 180
// safeFindObject :: DB -> String -> Maybe
const safeFindObject = R.curry((db, id) => Maybe.fromNullable(find(db, id)));

// safeFindStudent :: String -> Maybe(student)
const safeFindStudent = safeFindObject(DB('student'));

const address = safeFindStudent('444-44-4444').map(R.prop('address'));
address; //-> Just(Address(...)) 또는 Nothing


const safeFindStudent = function(model, id){
    let student = model.find(id);
    return Maybe.fromNullable(student)
}
const address = safeFindStudent('444-44-4444').map(R.prop('address'));
address; //-> Just(Address(...)) or Nothing

// 181



const userName = findStudent('444-44-4444').map(R.prop('firstname'));

document.querySelector('#student-firstname').value = userName.getOrElse('이름을 입력하세요');


// 181
function getCountry(student) {
    let school = student.school();
    if (school !== null) {
        let addr = school.address();
        if (addr !== null) {
            return addr.country();
        }
    }
    return '존재하지 않는 국가입니다.';
}


// 182
const country = R.compose(getCountry, safeFindStudent);


const getCountry = (Student) => student
    .map(R.prop('school'))
    .map(R.prop('address'))
    .map(R.prop('country'))
    .getOrElse('존재하지 않는 국가입니다.');



// 182
const safeFindObject = R.curry((db, id) => Maybe.fromNullable(find(db, id)));



const lift = R.curry((f, value) => Maybe.fromNullable(value).map(f));


const findObject = R.curry((db, id) => find(db, id));

const safeFindObject = R.compose(lift(console.log), findObject);
safeFindObject(DB('student'), '444-44-4444');


// 183
class Either {
    constructor(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    static left(a) {
        return new Left(a);
    }

    static right(a) {
        return new Right(a);
    }

    static fromNullable(val) {
        return val != null && val !== undefined ? 
            Either.right(val) : Either.left(val);
    }

    static of(a) {
        return Either.right(a);
    }
}

class Left extends Either {
    map(_) {
        return this;
    }

    get value() {
        throw new TypeError("Left(a) 값을 가져올 수 없습니다.");
    }

    getOrElse(other) {
        return other;
    }

    orElse(f) {
        return f (this._value);
    }

    chain(f) {
        return this;
    }

    getOrElseThrow(a) {
        throw new Error(a);
    }
    
    filter(f) {
        return this;
    }

    toString() {
        return `Either.Left(${this._value})`;
    }
}


class Right extends Either {
    map(f) {
        return Either.of(f(this._value));
    }

    getOrElse(other) {
        return this._value;
    }

    orElse() {
        return this; // 쓰지 않음
    }

    chain(f) {
        return f(this._value);
    }

    getOrElseThrow(_) {
        return this._value;
    }

    filter(f) {
        return Either.fromNullable(f(this._value) ? this._value : null);
    }

    toString() {
        return `Either.Right(${this._value})`;
    }
}


// 185
const safeFindObject = R.curry((db, id) => {
    const obj = find(db, id);
    if (obj) {
        return Either.of(obj);
    }
    return Either.left(`ID가 ${id}인 객체를 찾을 수 없습니다.`);
});


// 186
const findStudent = safeFindObject('student');
findStudent('444-44-4444').getOrElse(new Student()); //-> Right(Student)


const errorLogger = _.partial(logger, 'console', 'basic', 'MyErrorLogger', 'ERROR');
findStudent('444-44-4444').orElse(errorLogger);


// 187
function decode(url) {
    try {
        const result = decodeURIComponent(url);
        return Either.of(result);
    } catch (uriError) {
        return Either.Left(uriError);
    }
}


const parse = (url) => url.parseUrl();
decode('%').map(parse); //-> Left(Error('URI malformed'))
decode('http%3A%2F%2Fexample.com').map(parse);  // Right(true)




// 188
const read = (document, selector) => document.querySelector(selector).innerHTML;
const write = (document, selector, val) => { 
    document.querySelector(selector).innerHTML = val;
    return val;
};



// 189
class IO {
    constructor (effect) {
        if (!_.isFunction(effect)) {
            throw 'IO 사용법: 함수는 필수 입니다.';
        }
        this.effect = effect;
    }

    static of (a) {
        return new IO( () => a );
    }

    static from (fn) {
        return new IO(fn);
    }

    map(fn) {
        let self = this;
        return new IO(()=> fn(self.effect()));
    }

    chain(fn) {
        return fn(this.effect());
    }

    run() {
        return this.effect();
    }
}



// 190
const read = (document, selector) => {
    () => document.querySelector(selector).innerHTML;
};

const write = (document, selector) => {
    return (val) => {
        document.querySelector(selector).innerHTML = val;
        return val;
    };
};



const readDom = _.partial(read, document);
const writeDom = _.partial(write, document);

<div id = "student-name">alonzo church</div>

const changeToStartCase = 
    IO.from(readDom('#student-name'))
    .map(_.startCase)
    .map(writeDom('#student-name'));



// 191
changeToStartCase.run();

<div id="student-name">Alonzo Church</div>


// 193
// validLength :: Number, String -> Boolean
const validLength = (len, str) => str.length === len;

// checkLengthSsn :: String -> Either(String)
const checkLengthSsn = ssn => 
    validLength(9, ssn) ? Either.right(ssn)
                        : Either.left('잘못된 SSN입니다.');

// safeFindObject :: Store, String -> Either(Object)
const safeFindObject = R.curry((db, id) => {
    const val = find(db, id);
    return val ? Either.right(val) : Either.left(`ID가 ${id}인 객체를 찾을 수 없습니다.`);
});

// findStudent :: String -> Either(Student)
const findStudent = safeFindObject(DB('students'));

// csv :: Array => String
const csv = arr => arr.join(',');



const debugLog = _.partial(logger, 'console', 'basic', 'Monad 예제', 'TRACE');
const errorLog = _.partial(logger, 'console', 'basic', 'Monad 예제', 'ERROR');
const trace = R.curry((msg, val) => debugLog(msg + ':' + val));


const showStudent = (ssn) => Maybe.fromNullable(ssn)
    .map(cleanInput)
    .chain(checkLengthSsn)
    .chain(findStudent)
    .map(R.prop(['ssn', 'firstname', 'lastname']))
    .map(append('#student-info'));


showStudent('444-44-4444').orElse(errorLog);



// map :: (ObjectA -> ObjectB), Monad -> Monad[ObjectB]
const map = R.curry((f, container) => container.map(f));


// chain :: (ObjectA -> ObjectB), Monad -> ObjectB
const chain = R.curry((f, container) => container.chain(f));



// 195
const showStudent = R.compose(
    R.tap(trace('HTML 페이지에 학생 정보 추가')),
    map(append('#student-info')),
    R.tap(trace('학생 정보를 CSV 형식으로 변환')),
    map(csv),
    map(R.prop(['ssn', 'firstname', 'lastname'])),
    R.tap(trace('레코드 조회 성공!')),
    chain(findStudent),
    R.tap(trace('입력값이 정상입니다.')),
    chain(checkLengthSsn),
    lift(cleanInput));


// 197
map(append('#student-info'))


const liftIO = function (val) {
    return IO.of(val);
}




const getOrElse = R.curry((message, container) => container.getOrElse(message));

const showStudent = R.compose(
    map(append('#student-info')),
    liftIO,
    getOrElse('학생을 찾을 수 없습니다.'),
    map(csv),
    map(R.prop(['ssn', 'firstname', 'lastname'])),
    chain(findStudent),
    chain(checkLengthSsn),
    lift(cleanInput)
);


showStudent(studentId).run(); //-> 444-44-4444, Alonzo, Church




function showStudent(ssn) {
    if (ssn != null) {
        ssn = ssn.replace(/^s*|\-|\s*$/g, '');
        if (ssn.length !== 9) {
            throw new Error('잘못된 입력입니다.');
        }
        let student = db.get(ssn);
        if (student) {
            document.querySelector(`#${elementId}`).innerHTML = 
                `${student.ssn}`,
                `${student.firstname}`,
                `${student.lastname}`;
        } else {
            throw new Error('잘못된 SSN입니다.');
        }
    }
}

