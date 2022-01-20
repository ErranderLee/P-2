export default function login() {
    const $ = document;
    const content = $.querySelector('.content');

    content.innerHTML = `
    <div class="content_login">
        <form class="form">
            <input class="inputid" type="text" placeholder="아이디를 입력해주세요" required/>
            <input class="inputpw" type="text" placeholder="비밀번호를 입력해주세요" required/>
            <input class="signup" type="button" value="회원가입">
            <input type="submit" value="로그인">
        </form>
    </div>`

    const loginForm = $.querySelector('.form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputId = $.querySelector('.inputid').value;
        const inputPw = $.querySelector('.inputpw').value;

        axios.post('/auth/login', {
            id: inputId,
            password: inputPw,
        })
        .then((res) => {
            if(res.data.success) {
                history.pushState(null, null, '/');
                window.dispatchEvent(new Event('locationchange'));
            } else {
                alert(res.data.msg.msg);
            }
        })
        .catch((err) => console.error(err));
    })
}