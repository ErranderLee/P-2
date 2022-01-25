
export default async function chatroom(params) {
    const { post } = history.state;
    const $ = document;
    const content = $.querySelector('.content');
    const { data : chatmessages } = await axios.get('/chat/getChatmessages', {
        params : {
            chatroomid: params.chatroomid
        }
    });
    content.innerHTML = 
    `<div class="store_info_exit">
        <div class="circle"></div>
        <div class="store_name">${post.Store.name}</div>
        <div class="store_hp">${post.Store.hp}</div>
        <div class="exit"><button class="exit_button">나가기</button></div>
        <div class="chat">
            ${chatmessages.map((chatmessage) => {
                if(chatmessage.UserUserid) {
                    return `<p class="user">${chatmessage.message}</p>`;
                } else {
                    return `<p class="other">${chatmessage.message}</p>`;
                }
            }).join('')}
        </div>
        <form class="msg_form">
            <input class="msg_input" type="text" placeholder="메세지를 입력해주세요."/>
            <input class="send_button" type="submit" value="전송">
        </form>
    </div>`
    const socket = io();
    socket.emit('join', { chatroomid: params.chatroomid });

    const msgForm = $.querySelector('.msg_form');
    const msgInput = $.querySelector('.msg_input');
    const chat = $.querySelector('.chat');
    const exitBtn = $.querySelector('.exit_button');

    msgForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (msgInput.value) {
            socket.emit('chat message', {
                chatroomid: params.chatroomid,
                msg: msgInput.value
            });
            msgInput.value = '';
        }
    });

    exitBtn.addEventListener('click', () => {
        const confirm = window.confirm('채팅방을 종료하시겠습니까?');
        if(confirm) {
            // 채팅 기록 삭제.
        }
    });

    socket.on('chat message', (msg) => {
        chat.innerHTML += `<p class="user">${msg.msg}</p>`;
        axios.post('/chat/setChatmessage', {
            message: msg.msg,
            chatroomid: params.chatroomid
        });
    });
}