export default function signup() {
    const $ = document;
    const content = $.querySelector('.content');

    content.innerHTML = `
    <div class="content_signup">
        <form class="form">
            <input class="inputid" type="text" placeholder="아이디를 입력해주세요" required/>
            <input class="inputpw" type="text" placeholder="비밀번호를 입력해주세요" required/>
            <input class="inputregion" type="text" placeholder="지역을 입력해주세요" required/>
            <input class="cancel" type="button" value="취소">
            <input type="submit" value="회원가입">
        </form>
    </div>`

    const loginForm = $.querySelector('.form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputId = $.querySelector('.inputid').value;
        const inputPw = $.querySelector('.inputpw').value;
        const inputRegion = $.querySelector('.inputregion').value;

        axios.post('/auth/signup', {
            id: inputId,
            password: inputPw,
            region: inputRegion
        })
        .then((res) => {
            const result = res.data
            if(result.success) {
                history.pushState(null, null, '?page=login');
                window.dispatchEvent(new Event('locationchange')); 
            } else {
                alert(`msg : ${result.msg}`);
            }
        })
        .catch((err) => console.error(err));
    })
}