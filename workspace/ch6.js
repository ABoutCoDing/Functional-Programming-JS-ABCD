// 205
QUnit.test('사람 검색 기능을 테스트 한다', function(asset) {
    const ssn = '444-44-4444';
    const p = findPerson(ssn);
    assert.equal(p.ssn, ssn);
});


// 206
function showStudent(ssn) {
    if (ssn !== null) {
        ssn = ssn.replace(/^\*|\-|\s*s*/g, '');
        if (ssn.length !== 9) {
            throw new Error('잘못된 입력');
        }

        var student = db.get(ssn);
        if (student !== null) {
            var info = 
                `${student.ssn},
                ${student.firstname},
                ${student.lastname}`;
            document.querySelector(`\#${elementId}`).innerHTML = info;
            return info;
        } else {
            throw new Error('학생을 찾을 수 없습니다.');
        }
    } else {
        return null;
    }
}


// 207
var counter = 0; // (전역)

function increment() {
    return ++counter;
}


// 208
QUnit.test("0에서 1만큼 증가시킨다. ", function (assert) {
    assert.equal(increment(), 1);
});

QUnit.test("0에서 1만큼 증가시킨다(반복)", function(assert){
    assert.equal(increment(), 1);
});


// 209
QUnit.test("0에서 1만큼 증가시킨다.", function (assert) {
    assert.equal(increment(), 1);
});

QUnit.test("음수를 1만큼 증가시킨다.", function(assert) {
    counter = -10;
    assert.equal(increment(), 1);
});

QUnit.test("양수를 1만큼 증가시킨다.", function (assert) {
    counter = 10;
    assert.equal(increment(), 1);
});

QUnit.test("음수를 1만큼 증가시킨다.", function(assert) {
    counter = -10;
    assert.equal(increment(), 1);
});

QUnit.test("0에서 1만큼 증가시킨다.", function (assert) {
    assert.equal(increment(), 1);
});

QUnit.test("양수를 1만큼 증가시킨다.", function(assert) {
    content = 10;
    assert.equal(increment(), 1);
});


// 210
QUnit.test("0에서 1만큼 증가시킨다.", function(assert) {
    assert.equal(increment(0), 1);
});

QUnit.test("0에서 1만큼 증가시킨다. (반복)", function(assert) {
    assert.equal(increment(0), 1);
});

QUnit.test("10에서 1만큼 증가시킨다.", function(assert) {
    assert.equal(increment(10), 11);
});

QUnit.test("-1에서 1만큼 증가시킨다.", function(assert) { 
    assert.equal(increment(-1), 0);
});


QUnit.test("10에서 1만큼 증가시킨다.", function(assert) {
    assert.equal(increment(10), 11);
});

QUnit.test("0에서 1만큼 증가시킨다. (반복)", function(assert) {
    assert.equal(increment(0), 1);
});

QUnit.test("-1에서 1만큼 증가시킨다.", function(assert) { 
    assert.equal(increment(-1), 0);
});

QUnit.test("0에서 1만큼 증가시킨다. (반복)", function(assert) {
    assert.equal(increment(0), 1);
});

// 211
const fork = (join, func1, func2) =>
    (val) => {
        join(func1(val), func2(val));
    };

const toLetterGrade = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
};

const computeAverageGrade = R.compose(toLetterGrade, fork(R.divide, R.sum, R.length));

QUnit.test('평균 학점을 계산', function(assert){
    assert.equal(computeAverageGrade([80, 90, 100]), 'A');
});

// 212
QUnit.test('평균 학점을 계산: toLetterGrade', function(assert) {
    assert.equal(toLetterGrade(90), 'A');
    assert.equal(toLetterGrade(200), 'A');
    assert.equal(toLetterGrade(80), 'B');
    assert.equal(toLetterGrade(89), 'B');
    assert.equal(toLetterGrade(70), 'C');
    assert.equal(toLetterGrade(60), 'D');
    assert.equal(toLetterGrade(59), 'F');
    assert.equal(toLetterGrade(-10), 'F');
});


// 212
QUnit.test('함수 조합기: fork', function(assert) {
    const timesTwo = fork((x) => x + x, R.identity, R.identity);
    assert.equal(timesTwo(1), 2);
    assert.equal(timesTwo(2), 4);
});



// 213
const showStudent = R.compose(
    map(append('#student-info')),
    liftIO,
    getOrElse('학생을 찾을 수 없습니다.'),
    map(csv),
    map(R.props(['ssn', 'firstname', 'lastname'])),
    chain(findStudent),
    chain(checkLengthSsn),
    lift(cleanInput)
);


// 214
QUnit.test('showStudent: cleanInput', function(assert) {
    const input = ['', '-44-44-', '44444', ' 4 ', ' 4-4 '];
    const assertions = ['', '4444', '44444', '4', '44'];

    expect(input.length);
    input.forEach(function (val, key) {
        assert.equal(cleanInput(val), assertions[key]);
    });
});

QUnit.test('showStudent: checkLengthSsn', function(assert) {
    assert.ok(checkLengthSsn('444444444').isRight);
    assert.ok(checkLengthSsn('').isLeft);
    assert.ok(checkLengthSsn('44444444').isLeft);
    assert.equal(checkLengthSsn('444444444').chain(R.length), 9);
});

QUnit.test('showStudent: CSV', function(assert) {
    assert.equal(csv(['']), '');
    assert.equal(csv(['Alonzo']), 'Alonzo');
    assert.equal(csv(['Alonzo', 'Church']), 'Alonzo,Church');
    assert.equal(csv(['Alonzo', '', 'Church']), 'Alonzo,,Church')
});


// 216
const studentStore = DB('students');
const mockContext = sinon.mock(studentStore);



var studentStore, mockContext;

QUnit.module('6장 모의 테스트', 
{
    beforeEach: function() {
        studentStore = DB('students');
        mockContext = sinon.mock(studentStore);
    },
    afterEach: function() {
        mockContext.verify();
        mockContext.restore();
    }
});

QUnit.test('showStudent: findStudent는 null을 반환한다.', function(assert) {
    mockContext.expects('find').once().returns(null);
    const findStudent = safefetchRecord(studentStore);

    assert.ok(findStudent('xxx-xx-xxxx').isLeft);
})

QUnit.test('showStudent: findStudent는 올바른 객체를 반환한다.', function(assert) {
    mockContext.expects('find').once().returns(new student('Alonzo', 'Church', 'Prinston').setSsn('444-44-4444'));
    const findStudent = safefetchRecord(studentStore);

    assert.ok(findStudent('444-44-4444').isRight);
})

// 217
assert.equal(computeAverageGrade([80, 90, 100]), 'A');


// 218
QUnit.test('평균 학점을 계산한다.', function(assert) {
    assert.equal(computeAverageGrade([80, 90, 100]), 'A');
    assert.equal(computeAverageGrade([80, 85, 89]), 'A');
    assert.equal(computeAverageGrade([70, 75, 79]), 'C');
    assert.equal(computeAverageGrade([60, 65, 69]), 'D');
    assert.equal(computeAverageGrade([50, 55, 59]), 'F');
    assert.equal(computeAverageGrade([-10]), 'F');
});

// 220
JSC.clear();
JSC.on_report((str) => console.log(str));

JSC.test(
    '평균 학점 계산',
    function (verdict, grades, grade) {
        return verdict(computeAverageGrade(grades) === grade);
    },
    [
        JSC.array(JSC.integer(20), JSC.number(90, 100)),
        'A'
    ],
    function (grades, grade) {
        return '평균 ' + grades + ' 학점에 관한 테스트: '  + grades;
    }
);


// 223
QUnit.test('SSN에 대한 JSCheck 커스텀 특정자', function(assert) {
    JSC.clear();

    JSC.on_report((report) => trace('Report' + str));
    JSC.on_pass((object) => assert.ok(object.pass));

    JSC.on_fail((object) => assert.ok(object.pass || object.args.length === 11, '테스트 실패: ' + object.args));
    JSC.test('SSN 길이를 체크', 
        function(verdict, ssn) {
            return verdict(checkLengthSsn(ssn));
        }, 
        [JSC.SSN(JSC.integer(100, 999), JSC.integer(10, 99), JSC.integer(1000, 9999))], 
        function (ssn) {
            return '커스텀 SSN 테스트: ' + ssn
        }
    );
});

// 223
JSC.SSN(JSC.integer(100, 999), JSC.integer(10, 999), JSC.integer(1000, 9999))

//223
SSN 길이를 체크:
100 classification, 100 cases tested, 100 pass
커스텀 SSN 테스트 : 121-75-4808 pass 1
커스텀 SSN 테스트 : 122-87-7833 pass 1
커스텀 SSN 테스트 : 134-44-6044 pass 1
커스텀 SSN 테스트 : 139-47-6224 pass 1
...
커스텀 SSN 테스트 : 992-52-3288 pass 1
커스텀 SSN 테스트 : 995-12-1487 pass 1
커스텀 SSN 테스트 : 998-46-2523 pass 1

Total pass 100



// 실패화면


// 224
/**
 * 올바른 SSN 문자열 (대시 포함)을 생성한다.
 * @param param1 지역 번호 -> JSC.integer(100, 999)
 * @param param2 그룹 번호 -> JSC.integer(10, 99)
 * @param param3 일련 번호 -> JSC.integer(1000, 9999)
 * @returns {Function} 특정자 함수
 */
JSC.SSN = function(param1, param2, param3) {
    return function generator() {
        const part1 = typeof param1 === 'function'? param1(): param1;
        const part2 = typeof prama2 === 'function'? param2(): param2;
        const part3 = typeof param3 === 'function'? param3(): param3;
        return [part1, part2, part3].join('-');
    };
};


// 226
<script src="imperative-show-student-program.js" data-cover></script>

QUnit.test('명령형 showStudent(올바른 사용자)', function(assert) {
    const result = showStudent('444-44-4444');
    assert.equal(result, '444-44-4444, Alonzo, Church');
});

// 227
<script src="functional-show-student-program.js" data-cover></script>


// 228
QUnit.test('명령형 showStudent(입력이 null 일 경우)', function(assert) {
    const result = showStudent(null);
});


// 229
QUnit.test('함수형 showStudent(입력이 null일 경우)', function(assert) {
    const result = showStudent(null).run();
    assert.ok(result.isNothing);
});











