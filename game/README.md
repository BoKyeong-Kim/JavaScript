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
- [zerocho님 블로그 참고](https://www.zerocho.com/category/JavaScript/post/573c2acf91575c17008ad2fc)

<br>

---

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

----

#### constructor
- class 내에서 객체를 생성하고 초기화하기 위한 특별한 메서드
- 클래스는 constructor라는 이름을 가진 특별한 메서드를 하나씩만 가질 수 있다. 
    - 두 개 이상의 constructor 메서드는 SyntaxError를 유발
- new를 붙이고 함수처럼 호출, 객체를 생성하는 함수를 생성자 함수라고 부른다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    alert(this.name + ' said "hello"');
  }
  this.... // 사람의 속성과 메소드를 더 정의할 수 있음
}
```

<br>

- 사용방법 : **new 생성자(인자)**

```javascript
var boka = new Person('Boka', '25');
boka.sayHello(); //'Boka said Hello'
```


<br>

---

#### prototype
- Person의 prototype 객체에 sayHello라는 메소드를 넣으면 Person 생성자로 만든 모든 객체는 이 메소드 사용이 가능
- this.sayHello보다 prototype에 Person.prototype.sayHello로 넣는 게 더 효율적
    - this에 넣은 것은 객체 하나를 만들 때마다 메소드도 하나씩 만들어지기 때문에 불필요한 메모리 낭비가 발생하기 때문


```javascript
function Person(name, age) {
  this.name = name;
  this.age = age; 
}

Person.prototype.sayHello = function() {
  console.log(this.name + ' said "hello"');
};

```

<br>

---

### 01
#### 기능
- main.js 
    - controller, display, game, engine의 생성자를 만듦.
    - 코드가 시작되는 부분
- controller.js 
    - 키보드 화살표의 keycode를 활용하여 이벤트가 발생할 때마다 입력을 받음 
- display.js
    - resize()로 전체화면보다 조금 작게 구성
    - canvas에 일정시간이 지날때마다 화면색이 변경(renderColor())
- game.js
    - 게임 화면의 전체적인 색과, 업데이트 될때마다의 색을 구성
- engine.js
    - 시간을 계산하는 부분
    - 프레임 출력 : 1초마다 30프레임 출력 (main에서 생성자 만들 때 1000/30로 지정)


---


<br>

### 02
#### 기능
- main.js 
    - keyDownUp() 적용 
- controller.js 
    - keycode로 받은 화살표 아래버튼 조건 제거
- display.js
    - drawRectangle(), fill() 추가
    - resize에서 고정값이 아니라 인자값을 받아오게 수정됨
- game.js
    - this.world를 만들어 하위항목에
    - 중력(gravity), 마찰력(friction) 추가
    - player 생성자 추가
    - collideObject()를 만들어 벽면에 충돌하게끔 구성
    - update() 함수도 중력과 마찰력으로 계산하여 재구성
- engine.js
    - 01에서 사용한 그대로 사용


---


<br>

### 03
#### 기능

- main.js 
    - display에 tile_sheet image를 추가한것을 main에 작성
- controller.js 
    - 02에서 사용한 그대로 사용
- display.js
    - Tile_sheet 생성
    - drawMap() 구현 : 이미지 내(source)에 있는 인자를 가져와 화면(destination)에 그리도록 코드 작성
    - drawPlayer() 구현 : squre가 움직이도록 -> 네모박스 그릴때 Math.floor로 내림해줌(잔상 현상 방지) 
    - render를 prototype내에 포함
- game.js
    - Game.World(객체 생성 -> World로 정의 후 인스턴스 생성)로 변경
    - columns, rows, tile_size, map을 그려줌
- engine.js
    - 01에서 사용한 그대로 사용
    
---

