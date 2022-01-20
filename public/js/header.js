const header = async () => {
    const $ = document;
    const header = $.querySelector('.header');
    
    header.innerHTML = 
    `<div class="header_sidebutton">사이드버튼</div>
    <div class="header_title">아주대 직방</div>
    <div class="header_login">LogIn</div>
    <div class="menu hidden">
        <li id=1>좋아요 목록</li>
        <li id=2>채팅 목록</li>
        <li id=3>지역 설정</li>
    </div>`

    const title = $.querySelector('.header_title');
    const headerLogin = $.querySelector('.header_login');

    title.addEventListener('click', () => {
        history.pushState(null, null, '/');
        window.dispatchEvent(new Event('locationchange'));
    })

    headerLogin.addEventListener('click', () => {
        if (headerLogin.innerText !== 'LogIn') {
            const menu = $.querySelector('.menu');
            console.log(menu);
            menu.classList.toggle('hidden');
        } else {
            history.pushState(null, null, '?page=login');
            window.dispatchEvent(new Event('locationchange'));
        }
    })
}

header();