
### PaintBoard

#### COMMIT : 1)project setup

- 환경셋팅 해주기

<br>

#### COMMIT : 2)Styles part One

<img src="./image/paintBoard(1).png" width="700px" height="550px" alt="structure"></img>

<br>

#### COMMIT : 3)Styles part Two

<img src="./image/paintBoard(2).png" width="700px" height="550px" alt="structure"></img>

<br>

#### COMMIT : 4)Canvas Events

- offset x와 y에 대해서 가져온다.
- canvas event에 대해 log를 찍어보면 가져오고자 하는 부분을 확인할 수 있다.

<img src="./image/paintBoard(3).png" width="700px" height="550px" alt="structure"></img>

<img src="./image/paintBoard(4).png" width="700px" height="550px" alt="structure"></img>

<br>

#### COMMIT : 5) 2D context

- 기본적으로 Canvas는 HTML의 한 요소인데, 다른점은 `context`를 갖는다는 점이다.
- `context`란 canvas란 요소안에서 픽셀에 접근할 수 있는 방법을 말한다.

<br>

#### COMMIT : 6)Draw lines on the painting board

- `moveTo` 함수는 path를 나타내고,`lineTo` 함수는 선을 그리는 x,y 를 나타낸다.
- 현재 console.log를 찍어보면 마우스를 클릭하여 움직일때(선을 그릴때)와, 클릭하지 않은 상태에서 마우스를 움직일 때가 다르게 나타난다.

<img src="./image/paintBoard(5).png" width="700px" height="550px" alt="structure"></img>