// 일반 함수 : 호이스팅 호출가능
// var는 호이스팅 되지만 undefined
// const과 let은 TDZ(Temporal Dead Zone)으로 에러

// Computed property
let a = 1;
let b = {
    [a]: 1,
    [1 + 1]: 2,
};
let c = Object.assign({ 3: 3 }, b, { 4: 4 });
console.log(c['4']);         // 키가 문자형으로 변환


// 심볼
const id1 = Symbol('id');
const id2 = Symbol('id');
const func = Symbol('func');
console.log(id1.description);           // id
console.log(id1 == id2, id1 === id2)    // false false
const user = {
    name: 'mg',
    age: 10,
    [id1]: 'ID1 mg',
    [id2]: 'ID2 mg',
    [func]: () => { }
};
console.log(user[id1], user[id2]);      // ID1 mg ID2 mg
console.log(Object.entries(user))       // Symbol은 표시안됨, for in에도 안뜸

console.log(Object.getOwnPropertySymbols(user)) // Symbol만 표시됨
console.log(Reflect.ownKeys(user))      // 키를 포함한 심볼 표시

// 전역심볼
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');
console.log(id1 == id2, id1 === id2)   // true true
console.log(Symbol.keyFor(id1))         // id

// Destructuring assignment, 구조 분해 할당
let [a, b, c = 3] = [1, 2];
let d = 4, e = 5;
[d, e] = [e, d];

let man = { name: 'mg', age: 10 };
let { name: myName, age: myAge, human: myHuman = true } = man;       // 새 변수이름으로 할당
console.log(myName, myAge, myHuman);

// Rest parameters
function func(...rest) {
    console.log(rest);
};
func(1, 2, 3, 4);

// Spread syntax
let a = [1, 2, 3];
let b = { 1: 1, 2: 2, 3: 3 };
console.log(...a);
console.log({ ...b });


/* this

일반 함수 : 생성자 함수, 객체의 메소드를 제외하고 전역을 가르킴
    function A(){
        this.func = function(){
            this
        }
    }
    A.prototype.func2 = function(){this}
* addEventListener는 currentTarget에 바인딩 되어서, 콜백 함수의 this도 바인딩됨 

화살표 함수 : 상위 스코프를 가르킴, 선언 후 바인딩 안됨

 */

// call : this를 지정, 매개를 직접 받음
function callTest(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    console.log(this);
};
callTest.call({ name: 'name' }, 1, 2)
callTest.call({ name: 'name' }, ...[1, 2])

// apply : this를 지정, 매개를 배열로 받음
function applyTest(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    console.log(this);
};
applyTest.apply({ name: 'name' }, [1, 2])

// bind : this를 지정한 함수를 반환
function t() {
    console.log(this)
}
t.bind({ name: 'mg' })()


// Promise
const pr = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('ok');
        reject(new Error('error'));
    }, 2000);
});
/* 
pr.then(
    function(result){ 
        console.log(result);
    },
    function(err){
        console.log(err);
    }
)
 */
pr.then(
    function (result) {
        console.log(result);
    }
).catch(
    function (err) {
        console.log(err);
    }
).finally(
    function () {
        console.log('끝');
    }
)
// promise.all([pr1(), pr2(), ...]).then((res)=>{...});
// 모든 pr이 실행 후 then이 실행됨


// 시간 테스트
console.time('test');
let num = 0;
for (let index in Array(10000).fill()) {       // 0~9999
    num += parseInt(index);
}
console.log(num)
console.timeEnd('test');

// async안에서 await사용 가능 - promise에만 적용가능
function receiveName() {
    return new Promise((res, err) => {
        setTimeout(() => {
            return res('moong');
        }, 2000);
    });
}

async function getName() {
    let result = await receiveName();
    return result;
}

// getName().then(result => {
//     console.log(result)
// });

async function printName(){
    try {
        let myName = await getName();
        console.log(myName);
    } catch (e) {
        console.log(e);
    }
}

printName();


// generator
function* ge1() {
    for (let num of [...Array(100)].map((e, i) => i + 1)) {      // 1~100
        yield num;
    }
}

let count = 0;
for (let num of ge1()) {
    count += num;
}

console.log(count);

function* g2() {
    let num = 0;
    while (true) {
        yield num++;
    }
}
// yield* gene 로 다른 generator을 호출 가능 