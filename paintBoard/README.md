
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

<br>

#### COMMIT : 7)Changing Color

- event에 대해 console.log를 출력해서 가져와야하는 부분을 확인한다.
- 가져온 event에 대해 target >> style >> backgroundColor 부분을 가져온 후, color에 대입.
- backgroundColor부분에 rgb가 있기때문.

<img src="./image/paintBoard(6).png" width="700px" height="550px" alt="structure"></img>

- 그 부분을 가져와서 기본값으로 설정해두었던 strokeStyle에 color를 대입해준다.
- 그럼 아래와 같이 색을 변경하여 사용 가능

<img src="./image/paintBoard(7).png" width="700px" height="550px" alt="structure"></img>

<br>

#### COMMIT : 8)Brush Size

- Brush 기본 사이즈 (2.5)
<img src="./image/paintBoard(8).png" width="700px" height="550px" alt="structure"></img>

- Brush min 사이즈 (0.1)
<img src="./image/paintBoard(9).png" width="700px" height="550px" alt="structure"></img>

- Brush max 사이즈 (5)
<img src="./image/paintBoard(10).png" width="700px" height="550px" alt="structure"></img>

<br>

- 전체의 board를 선택한 색상으로 채우기 위해 만들어두었던 fill 버튼을 누르면 paint버튼이 나오도록 코드를 작성.
<img src="./image/paintBoard(11).png" width="700px" height="550px" alt="structure"></img>