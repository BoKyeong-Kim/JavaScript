### 자바스크립트로 게임만들기

[pothonprogramming님의 코드 참고](https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/rabbit-trap)

#### MVC 패턴 - 독립적
- Model : 데이터 처리
- View : 화면에 보여지는 부분 
- Controller : 제어
- MVC 패턴을 사용하여 코드를 구성하면 유지보수하기에 좋고 모듈단위로 기능에 따라 분리되므로 기능추가하기에도 용이함

<br>

### 필수개념
- [MDN web docs 공식문서 참고](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/this)

#### this 
- this 키워드는 기본적으로 전역객체(브라우저에서는 window)와 같다.
- 전역 문맥에서 this는 use strict여부에 관계없이 전역 객체를 참조한다.

```javascript
// 웹 브라우저에서는 window 객체가 전역 객체
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

<br>

- 함수 문맥에서 this의 값은 함수 호출법에 따라 달라진다.
- 단순호출(use strict가 아닌 경우)
    - this의 값이 호출에 의해 설정되지 않으므로, 기본값으로 브라우저에서는 window인 전역객체를 참조

```javascript
function f1() {
  return this;
}

// 브라우저
f1() === window; // true 
```

<br>

- use strict인 경우
    - this 값은 실행 문맥에 진입하며 설정되는 값을 유지하므로 this는 undefined로 남아있다.
    - f2()를 객체의 매서드나 속성(ex. window.f2())로써가 아닌 직접 호출했기 때문에 this는 undefined.
    
```javascript
function f2(){
  "use strict"; 
  return this;
}

f2() === undefined; // true

window.f2() === undefined //false
```

<br>

- this의 값을 한 문맥에서 다른 문맥으로 넘기려면 call()이나 apply()를 사용한다.

```javascript
// call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
var obj = {a: 'Custom'};

// 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
var a = 'Global';

function whatsThis() {
  return this.a;  // 함수 호출 방식에 따라 값이 달라짐
}

whatsThis(); // this는 'Global'. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.
whatsThis.call(obj);  // this는 'Custom'. 함수 내에서 obj로 설정한다.
whatsThis.apply(obj); // this는 'Custom'. 함수 내에서 obj로 설정한다.
```

<br>

#### constructor
- class 내에서 객체를 생성하고 초기화하기 위한 특별한 메서드
- 클래스는 constructor라는 이름을 가진 특별한 메서드를 하나씩만 가질 수 있다. 
    - 두 개 이상의 constructor 메서드는 SyntaxError를 유발



<br>


