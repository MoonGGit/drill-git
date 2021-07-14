document.write('&lt;write in document&gt;', '<br>');

let tag = '<strong>let value using tag</strong>';
document.write(tag, '<br>');

Boolean(null);      //false
//false --> 0, null, '', undefined

typeof false;           // 'boolean'
typeof 100;             // 'number'
typeof 'text';          // 'string'
typeof { x: 1, y: 2 };    // 'object'
typeof [1, 2, 3, 4];    // 'object'
typeof function () { };    // 'function'

// 생성자 함수의 인스턴스, 클래스, 상속 확인은 instanceof 사용
let A = function () { };
a = new A();
console.log(a instanceof A)         // true
console.log(a.constructor == A)     // true

'123' + '421'   // 123421
10 == '10';      // true
10 === '10';     // false

5 & 3;      // 1 -> ...00001
5 | 3;      // 7 -> ...00111
//5 -> ...00101
//3 -> ...00011 


0b11;       // 2진수(binary)
0o11;       // 8진수(octal)
11;
0x11;       // 16진수(hexadecimal)

// prompt('question', 'default');
// confirm('confirm');
// alert('alert');

switch (1) {
    case 1:
        console.log('1');
        break;
    case 2:
        console.log('2');
        break;
    case 3:
        console.log('3');
        break;
}


let func3 = function () {
    arguments;              // 파라미터를 모두 배열로 가져옴
}

    (function (p1, p2) {
        console.log('즉시실행함수');
        console.log(`${p1}, ${p2}`);
    }(1, 2));


function Func4(a) {
    const innerValue = 100;

    this.a = a;
    this.func1 = function () {
        console.log('외부용', this.a, innerValue);
    }

    function func2() {
        console.log('내부용: Func4 객체 생성', innerValue);
    }

    (function () {
        func2();
    }());               // this 바인딩 안됨
}
let obj1 = new Func4(10);
obj1.func1();


class Func5 {
    constructor(a) {
        const innerValue = 100;

        this.a = a;
        this.func1 = function () {
            console.log('외부용', this.a, innerValue);
        }

        function func2(_this) {
            console.log('내부용: Func5 객체 생성', innerValue, _this.a);
        }

        (function () {
            func2(this);
        }.bind(this)());        // this 바인딩 됨
    }

    func3() {
        console.log(this.a)     // innerValue, func2 접근 불가, 
    }
}
let obj2 = new Func5(10);
obj2.func1();
obj2.func3();


// 프로토타입(객체 생성자 함수)
class Func6 {
    constructor(num) {
        this.num = num;
    }
}

Func6.prototype.func1 = function() {
    console.log('공유 함수');
}

Func6.prototype.func2 = (function() {
    console.log('Func6 프로토 객체 생성');
}());
let obj3 = new Func6(10);


// 상속은 obj.__proto__ = obj 를 사용
// 클래스인 경우 extends를 사용
class Person {
    constructor(name) {
        this.name = name;
    }
}
class Man extends Person {
    constructor(name) {
        super(name);
        this.gender = 'male';
    }
}
let man1 = new Man('moong');
console.log(man1.name, man1.gender);


function func7() {
    try {
        // ...
    } catch (position) {
        return false;
    }

    try {
        throw 'generate error'
    } catch (position) {
        // ...
    } finally {
        // ...          // 무적권 실행 
    }

    throw new Error('error');
}

function f8() {
    try {
        console.log(0);
        throw "bogus";
    } catch (position) {
        console.log(1);
        return true; // this return statement is suspended
        // until finally block has completed
        console.log(2); // not reachable
    } finally {
        console.log(3);
        return false; // overwrites the previous "return"
        console.log(4); // not reachable
    }
    // "return false" is executed now
    console.log(5); // not reachable
}
f8(); // alerts 0, 1, 3; returns fals

/* 
DOMContentLoaded - HTML 이 모두 로드되고, DOM 트리가 완성되었지만, 외부 리소스(img etc) 가 아직 로드되어지지 않았을 때
    <body onload="func()">
load - 브라우저에 모든 리소스(img, style, script, etc) 가 로드되었을 때
beforeunload / unload - 페이지를 떠날 때
*/
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

window.onload = function () {
    // ....
}

/* 
캡처링 : 상위 요소에서 하위로 이벤트 실행
버블링 : 하위 요소에서 상위로 이벤트 실행
이벤트 진행 순서 : document -> html -> body -> element ... -> body -> html -> document

이벤트 파라미터
    .stopPropagation();     // 버블링 중단, 상위 요소의 이벤트 막기
    .preventDefault();      // 기본 동작을 중지
    마우스
    .pageX
    .pageY
    키보드
    .
    .
    발생 위치
    .
    .

*/
document.onclick = () => console.log('click1');     // 버블링만 지원
document.addEventListener('click', (e) => {
    console.log('click2');
    console.log(`x: ${e.pageX}, y: ${e.pageY}`);
}, false);    // true:캡처링, false:버블링
//

let reg1 = /^1[-+].*(good)$/;
reg1.test('1- middle good');            // true

let reg2 = /\d{3}-[123]{3}/;
console.log(reg2.test('123-123'));      // true
console.log(reg2.test('999-111'));      // true
console.log(reg2.test('333-444'));      // false



/* 요청&응답&쿠키
GET /index.html HTTP/1.1 
Host: www.example.org
Cookie: name=value; name2=value2
Accept: ...

HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie:name=value
Set-Cookie:name2=value2; Expires=Wed, 날짜~
...
*/

document.cookie = 'name1=' + encodeURIComponent('이름1') + '; max-age=' + (60 * 60 * 24 * 365);
document.cookie = 'name2=' + encodeURIComponent('이름2') + '; max-age=' + (60 * 60 * 24 * 365);
// 유효기간은 초단위로 설정, 하나씩 등록
// 삭제는, 유효 기간을 재설정해 브라우저측에서 지우게함
if ('이름2' === decodeURIComponent(
    document.cookie.split('; ').find(e => e.startsWith('name2')).split('=')[1]
)) console.log('내 쿠키 발견!');


navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);     // 위도
    console.log(position.coords.longitude);    // 경도
});
