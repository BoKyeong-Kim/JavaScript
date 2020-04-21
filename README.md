# JavaScript

### JavaScript 정의
- 객체 기반의 스크립트 프로그래밍 언어
- 웹 브라우저 내에서 주로 사용
- HTML로는 웹의 내용을 작성하고, CSS로는 웹을 디자인하며, 자바스크립트로는 웹의 동작을 구현
- 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있음
- Node.js와 같은 런타임 환경과 같이 서버 사이드 네트워크 프로그래밍에도 사용되고 있음

<br>

### JavaScript 특징
- 객체 기반의 스크립트 언어
- 동적이며, 타입을 명시할 필요가 없는 인터프리터 언어
- 객체지향형 프로그래밍과 함수형 프로그래밍 모두 표현 가능

<br>

### 바닐라 JS로 크롬 앱 만들기
- [노마드코더님의 바닐라 자바스크립트 강의](https://academy.nomadcoders.co/courses/)를 통해 제작

<br>

#### COMMIT : Making a JS Clock part One
<img src="./image/part_one.png" width="250px" height="200px" alt="structure"></img>
- 첫번째 커밋을 했을 때, 시간은 고정된 상태로 화면에 나타나게 된다.
- 그리고 예를들어 11시 30분 05초라고 한다면 11:30:05가 아닌 11:30:5로 나오게 된다.
- 이 부분을 수정하는 코드를 작성

<br>

#### COMMIT : Making a JS Clock part Two
<img src="./image/part_two.png" width="250px" height="200px" alt="structure"></img>
- 위 사진처럼 4초가 아닌 04초로 나오게 수정

<br>

#### COMMIT : Saving the User Name part One
<img src="./image/name_partone.png" width="250px" height="200px" alt="structure"></img>
- local storage(로컬 스토리지) : 정보들을 저장하는 곳
    - 세션유지와 상관없이 데이터 유지되게 함(브라우저상에서 정보를 간단히 저장해서 사용해야할 떄 유용하게 사용가능)
    - localStorage.setItem() 메서드에 key, value값을 주면 데이터가 저장된다.

<br>