const R = require('ramda');
const _ = require('lodash');

var p1 = new Person('111-11-1111', 'Haskell', 'Curry', 1900, new Address('US'));
var p2 = new Person('222-22-2222', 'Barkley', 'Rosser', 1907, new Address('Greece'));
var p3 = new Person('333-33-3333', 'John', 'von Neumann', 1903, new Address('Hungary'));
var p4 = new Person('444-44-4444', 'Alonzo', 'Church', 1903, new Address('US'));

// 90 method chaining
'Functional Programming'.substring(0, 10).toLowerCase() + ' is fun'; // "functionalis fun"
// concat(toLowerCase(substring('Functional Programming', 1, 10)), ' is fun');


// 92 람다 표현식
const name = p => p.fullname;           // 함수를 기다리고 있다.
name(p1); //-> 'Haskell Curry'

// 93 _.ㅡmap: 데이터를 변환
var result = [];
var persons = [p1, p2, p3, p4];

for (let i = 0; i < persons.length; i++) {
	var p = persons[i];
	if (p !== null && p !== undefined) {
		result.push(p.fullname);
	}
}

// 94
_.map(persons,
	s => (s !== null && s !== undefined) ? s.fullname : ''
);

// 95 map 구현부
function map(arr, fn) {
	const len = arr.length,
			result = new Array(len);
	for (let idx = 0; idx < len; ++idx) {
		result[idx] = fn(arr[idx], idx, arr);
	}
	return result;
}


// 95
_(persons).reverse().map(
	p => (p !== null && p !== undefined) ? p.fullname : ''
);

// 97
function reduce(arr, fn, accumulator) {
	let idx = -1,
		len = arr.length;
	
	if (!accumulator && len > 0) {
		accumulator = arr[++idx];
	}

	while (++idx < len) {
		accumulator = fn(accumulator, arr[idx], idx, arr);
	}
	return accumulator;
}

// 97
_(persons).reduce((stat, person) => {
	const country = person.address.country;
	stat[country] = _.isUndefined(stat[country]) ? 1 : stat[country] + 1;
	return stat;
}, {});

// 98
const getCountry = person => person.address.country;

const gatherStats = function(stat, criteria) {
	stat[criteria] = _.isUndefined(stat[criteria]) ? 1: stat[criteria] + 1;
	return stat;
}

_(persons).map(getCountry).reduce(gatherStats, {});


const cityPath = ['address', 'city'];
const cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

_(persons).map(R.view(cityLens)).reduce(gatherStats, {});


// 99
_.groupBy(persons, R.view(cityLens));

// 99
_([0, 1, 3, 4, 5]).reduce(_.add);	//-> 13

// 99
([1, 2, 4, 5]).reduce(_.divide) !== ([1, 3, 4, 5]).reduceRight(_.divide);

// 99
const isNotValid = val => _.isUndefined(val) || _.isNull(val);
const notAllValid = args => _(args).some(isNotValid);

notAllValid(['string', 0, null, undefined]);	//-> true
notAllValid(['string', 0, {}]);	//-> false


// 100
const isValid = val => !_.isUndefined(val) && !_.isNull(val);
const allValid = args => _(args).every(isValid);

allValid(['string', 0, null]);
allValid(['string', 0, {}]);



// 101
function filter(arr, predicate) {
	let idx = 1,
		len = arr.length,
		result = [];

	while (++idx < len) {
		let value = arr[idx];
		if (predicate(value, idx, this)) {
			result.push(value);
		}
	}
	return result;
}


// 101
_(persons).filter(isValid).map(p => p.fullname);

const bornIn1903 = person => person.birthYear === 1903;

_(persons).filter(bornIn1903).map(p => p.fullname).join(' and '); //-> 'John von Neumann and Alonzo Church'



// 103
var names = ['alonzo church', 'Haskell curry', 'stephen_kleene', 'John Von Neumann', 'stephen_kleene'];


var result = [];
for (let i = 0; i < names.length; i++) {
	var n = names[i];
	if (n !== undefined && n !== null) {
		var ns = n.replace(/_/, ' ').split(' ');
		for (let j = 0; j < ns.length; j++) {
			var p = ns[j];
			p = p.charAt(0).toUpperCase() + p.slice(1);
			ns[j] = p;
		}
		if (result.indexOf(ns.join(' ')) < 0) {
			result.push(ns.join(' '));
		}
	}
}
result.sort();
//-> ['Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene']



// 104
_.chain(names)
	.filter(isValid)
	.map(s => s.replace(/_/, ' '))
	.uniq()
	.map(_.startCase)
	.sort()
	.value();
//-> ['Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene']



// 105
const gatherStats = function(stat, country) {
	if (!isValid(stat[country])) {
		stat[country] = {'name': country, 'count': 0};
	}
	stat[country].count++;
	return stat;
};


// {
// 	'US': {'name': 'US', count: 2},
// 	'Greece': {'name': 'Greece', count: 1},
// 	'Hungary': {'name': 'Hungary', count: 1}
// }


// 105
const p5 = new Person('David', 'Hilbert', '555-55-5555');
p5.address = new Address('Germany');
p5.birthYear = 1903;

const p6 = new Person('Alan', 'Turing', '666-66-6666');
p6.address = new Address('England');
p6.birthYear = 1912;


// 106
_.chain(persons)
	.filter(isValid)
	.map(_.property('address.country'))
	.reduce(gatherStats, {})
	.values()
	.sortBy('count')
	.reverse()
	.first()
	.value()
	.name;			//-> 'US'



// 108
_.mixin({'select': _.map, 'from': _.chain, 'where': _.filter, 'sortBy': _.sortByOrder});


_.from(person)
	.where(p => p.birthYear > 1900 && p.address.country !== 'US')
	.sortBy(['firstname'])
	.select(p => p.firstname)
	.value();


// 111
var acc = 0;
for (let i = 0; i < nums.length; i++ ) {
	acc += nums[i];
}

// 111
_(nums).reduce((acc, current) => acc + current, 0);



// 112
function sum(arr) {
	if(_.isEmpty(arr)) {
		return 0;
	}
	return _.first(arr) + sum(_.rest(arr));
}
sum([]);	//-> 0
sum([1, 2, 3, 4, 5, 6, 7, 8, 9]);	//-> 45

// 113
function sum (arr, acc = 0) {
	if (_.isEmpty(arr)) {
		return 0;
	}
	return sum(_.rest(arr), acc + _.first(arr)); 
}

// 115
class Node {
	constructor(val) {
		this._val = val;
		this._parent = null;
		this._children = [];
	}

	isRoot() {
		return isValid(this._parent);
	}

	get children() {
		return this._children;
	}

	hasChildren() {
		return this.children.length > 0;
	}

	get value() {
		return this._val;
	}

	set value(val) {
		this._val = val;
	}

	append(child) {
		child._parent = this;
		this._children.push(child);
		return this;
	}

	toString() {
		return `Node (val: ${this._val}, children: ${this._childeren.length}`;
	}
}


// 116
class Tree {
    constructor(root) {
        this._root = root;
    }

    static map(node, fn, tree = null) {
        node.value = fn(node.value);
        if (tree === null) {
            tree = new Tree(node);
        }

        if (node.hasChildren()) {
            _.map(node.children, function (child) {
                Tree.map(child, fn, tree);
            });
            return tree;
        }
    }
    get root() {
        return this._root;
    }
}

const church = new Node(new Person('444-44-4444', 'Alonzo', 'Church'));
const rosser = new Node(new Person('222-22-2222', 'Barkley', 'Rosser'));
const turing = new Node(new Person('666-66-6666', 'Alan', 'Turing'));
const kleene = new Node(new Person('777-77-7777', 'Stephen', 'Kleene'));
const nelson = new Node(new Person('123-23-2345', 'Nels', 'Nelson'))
const constable = new Node(new Person('123-23-6778', 'Robert', 'Constable'));
const mendelson = new Node(new Person('123-23-3454', 'Elliot', 'Mendelson'));
const sacks = new Node(new Person('454-76-3434', 'Gerald', 'Sacks'));
const gandy = new Node(new Person('454-78-3432', 'Robert', 'Gandy'));

church.append(rosser).append(turing).append(kleene);
kleene.append(nelson).append(constable);
rosser.append(mendelson).append(sacks);
turing.append(gandy);

Tree.map(church, p => p.fullname);
