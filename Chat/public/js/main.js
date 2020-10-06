const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//서버에 메세지 보내기
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //아래로 스크롤하여 DOM에서 채팅 가져오기
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//메세지 제출 -> 채팅양식 가져와서 원하는 이벤트리스너 추가
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); //기본동작 방지

    //메세지 텍스트 가져오기
    const msg = e.target.elements.msg.value;

    //서버에 메세지 보내기
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//DOM에 출력 메세지 만들기
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12</span></p>
    <p class="text">
     ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}