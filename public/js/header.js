const header = async () => {
    const $ = document;
    const header = $.querySelector('.header');
    
    header.innerHTML = 
    `<div class="header_sidebutton">사이드버튼</div>
    <div class="header_title">아주대 직방</div>
    <div class="header_login">LogIn</div>`

    // header_title, header_login에 대한 이벤트리스너 추가.
}

header();