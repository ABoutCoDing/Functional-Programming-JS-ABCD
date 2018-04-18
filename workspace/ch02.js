class Person {
    constructor(firstname, lastname, ssn) {
        this._firstname = firstname;
        this._lastname  =lastname;
        this._ssn = ssn;
        this._address = null;
        this._birthYear = null;
    }

    get ssn() {
        return this._ssn;
    }

    get firstname() {
        return this._firstname;
    }

    get lastname() {
        return this._lastname;
    }

    get address() {
        return this._address;
    }

    get birthYear() {
        return this._birthYear;
    }

    set birthYear(year) {
        this._birthYear = year;
    }

    set address(addr) {
        this._address = addr;
    }

    toString() {
        return `Person(${this._firstname}, ${this._lastname})`;
    }
}

class Student extends Person {
    constructor(firstname, lastname, ssn, school) {
        super(firstname, lastname, ssn);
        this._school = school;
    }

    get school() {
        return this._school;
    }
}

class Address {

	constructor(country, state = null, city = null, zip = null, street = null) {
		this._country = country;
		this._state = state;
		this._city = city;
		this._zip = zip;
		this._street = street;
	}
	
	get street() {
		return this._street;
	}

	get city() {
		return this._city;
	}

	get state() {
		return this._state;
	}
	
	get zip() {
		return this._zip;
	}
	
	get country() {
		return this._country;
	}

	set country(country) {
		this._country = country;
		return this;
	}
};

// 58
const gravity_ms = 9.806;
gravity_ms = 20;


const student = new Student('Alonzo', 'Church', '666-66-6666', 'Prinston');
student.lastname = 'Mourning';


// 58
function zipCode(code, location) {
    let _code = code;
    let _location = location || '';

    return {
        code: function() {
            return _code;
        },
        location: function() {
            return _location;
        },
        fromString: function(str) {
            let parts = str.split('-');
            return zipCode(parts[0], parts[1]);
        }
    };
}
const princetonZip = zipCode('68544', '3345');
princetonZip.toString();    //-> 68544-3345


// 59
function coordinate(lat, long) {
    let _lat = lat;
    let _long = long;

    return {
        latitude: function() {
            return _lat;
        },
        longitude: function() {
            return _long;
        },
        translate: function(dx, dy) {
            return coordinate(_lat + dx, _long + dy);
        },
        toString: function() {
            return '(' + _lat + ',' + _long + ')';
        }
    };
}

const greenwich = coordinate(51.4788,0.0015);
greenwich.toString(); //-> '(51.4788, 0.0015)'


greenwich.translate(10, 10).toString(); //-> '61.4778, 10.0015')


// 60
const person = Object.freeze(new Person('Haskell', 'Curry', '444-44-44444'));
person.firstname = 'Bob';


// 61
class Address {
    constructor(country, state, city, zip, street) {
        this._country = country;
        this._state = state;
        this._city = city;
        this._zip = zip;
        this._street = street;
    }

    get street() {
        return this._street;
    }

    get city() {
        return this._city;
    }

    get state() {
        return this._state;
    }

    get zip() {
        return this._zip;
    }

    get country() {
        return this._country;
    }
}

var person = new Person('Haskell', 'Curry', '444-44-4444');
person.address = new Address ('US', 'NJ', 'Prinston', zipCode('08544', '1234'), 'Alexander St. ');

person = Object.freeze(person);

person.address._country = 'France';
person.address.country; 


// 62
var isObject = (val) => val && typeof val === 'object';

function deepFreeze(obj) {
    if(isObject(obj) && !Object.isFrozen(obj)) {
        Object.keys(obj).forEach(name => deepFreeze(obj[name]));
        Object.freeze(obj);
    }
    return obj;
}


// 63
var person = new Person('Alonzo', 'Church', '444-44-4444');
var lastnameLens = R.lensProp('lastname');


// 64
const newPerson = R.set(lastnameLens, 'Mourning', person);
R.view(lastnameLens, person); //-> 'Church'


var newPerson = R.set(lastnameLens, 'Mourning', person);
newPerson.lastname; //-> Mourning
person.lastname; //-> Church


person.address = new Address('US', 'NJ', 'Princeton', zipCode('08544', '1234'), 'Alexander st. ');

const zipPath = ['address', 'zip'];
const zipLens = R.lens(R.path(zipPath), R.assocPath(zipPath));
R.view(zipLens, person);    //-> zipCode('08544', '1234)


var newPerson = R.set(zipLens, zipCode('90210', '5678'), person);
var newZip = R.view(zipLens, newPerson);    //-> zipCode('90210', '5678')
var originalZip = R.view(zipLens, person);
newZip.toString() !== originalZip.toString();


// 65
// function multiplier(a, b) {
//     return a * b;
// }

// const square = function(x) {
//     return x * x;
// }

// const square = x => x * x;  // 람다 

// const obj = {
//     method: function(x) {
//         return x * y;
//     }
// };

// square;
// function(x) {
//     return x * x;
// }

// 66
// const multiplier = new Function('a', 'b', 'return a * b');
// multiplier(2, 3);   //-> 6


// const fruit = ['Coconut', 'apples'];    
// fruit.sort();   //-> ['Coconut', 'apples']

// const ages = [1, 10, 21, 2];
// ages.sort(); //-> [1, 10, 2, 21]



// people.sort((p1, p2) => p1.getAge() - p2.getAge());


// 67 
// function applyOperation(a, b, opt) {
//     return opt(a, b);
// }

// const multiplier = (a, b) => a * b;

// applyOperation(2, 3, multiplier); //-> 6

// function add(a) {
//     return function(b) {
//         return a + b;
//     }
// }
// add(3)(3);

// // 70
// // 전역 함수로 호출  this 는 전역 객체(window), undefined
// function doWork() {
//     this.myVar = '어떤 값';
// }

// // 메서드로 호출 this 레퍼런스는 해당 메서드를 소유한 객체
// var obj = {
//     prop: '어떤 조건',
//     getProp: function() {
//         return this.prop
//     }
// };

// // 앞에 new 를 붙여 생성자로 호출 : 새로만든 객체의 레퍼런스를 암시적으로 반환
// function MyType(arg) {
//     this.prop = arg;
// }

// var someVal = new MyType('어떤 인수');


// // 71
// function negate(func) {
//     return function() {
//         return !func.apply(null, arguments);
//     }
// }

// function isNull (val) {
//     return val === null;
// }

// const isNotNull = negate(isNull);

// isNotNull(null);    //-> false
// isNotNull({});      //-> true


// // 72
// const princetonZip = zipCode('08544', '3345');
// princetonZip.code(); //-> 08544

// // 73
// function makeAddFunction(amount) {
//     function add(number) {
//         return number + amount;
//     }
//     return add;
// }

// function makeExponentialFunction(base) {
//     function raise(exponent) {
//         return Math.pow(base, exponent);
//     }
//     return raise;
// }

// var addTenTo = makeAddFunction(10);
// addTenTo(10); //-> 20

// var raiseThreeTo = makeExponentialFunction(3);
// raiseThreeTo(2); //-> 9



// // 75
// var outerVar = 'Outer';
// function makeInner(params) {
//     var innerVar = 'Inner';

//     function inner() {
//         console.log(`${outerVar}, ${innerVar}, ${params} 이 (가) 보여요!`);
//     }
//     return inner;
// }

// var inner = makeInner('Params');
// inner();


// 77
// var x = '어떤값';
// function parentFunction() {
//     function innerFunction() {
//         console.log(x);
//     }
//     return innerFunction;
// }
// var inner = parentFunction();
// inner();


// // 78
// function doWork() {
//     if (!myVar) {
//         var myVar = 10;
//     }
//     console.log(myVar); //-> 10
// }
// doWork();


// // 78
// var arr = [1, 2, 3, 4];

// function processArr() {
//     function multipleBy10(val) {
//         i = 10;
//         return val * i;
//     }

//     for (var i = 0; i < arr.length; i++ ) {
//         arr[i] = multipleBy10(arr[i]);
//     }

//     return arr;
// }

// processArr(); //-> [10, 2, 3, 4]


// // 79
// for(let i=0; i < arr.length; i++) {
//     // ...
// }
// i; // i === undefined


// // 79
// for (var i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log('숫자: ' + i);
//     }, 1000);
// }



// for (let i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log('숫자: ' + i)
//     }, 1000);
// }