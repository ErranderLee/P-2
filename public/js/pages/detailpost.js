
export default async function detailpost() {
    const { post } = history.state;
    console.log(post);
    const $ = document;
    const content = $.querySelector('.content');

    content.innerHTML = `
    <div class="img"></div>
    <div class="info">
        <div class="circle"></div>
        <div class="store">${post.Store.name}</div>
        <div class="hp">H.P ${post.Store.hp}</div>
        <div class="numchat"></div>
        <div class="like"><button class="like_button">Like</button></div>
    </div>
    <div class="details">
        <div class="title">상세 설명</div>
        <div class="address">주소 : ${post.address}</div>
        <div class="secdeposit">보증금 : ${post.sec_deposit}만원</div>
        <div class="monthly">월세 : ${post.monthly}만원</div>
        <div class="managefee">관리비 : ${post.manage_fee}만원</div>
        <div class="options">옵션 : ${post.options}</div> 
    </div>
    `;

    const likeBtn = $.querySelector('.like_button');
    const { data: authenticatedUser } = await axios.get('/auth/getAuthenticatedUser');

    if(post.hasOwnProperty('like')) {
        likeBtn.classList.add('filllike');
    }

    likeBtn.addEventListener('click', () => {
        if(Object.keys(authenticatedUser).length) {
            likeBtn.classList.toggle('filllike');
            if(likeBtn.classList.contains('filllike')) {
                axios.post('/set/like', {
                    post: post
                });
            } else {
                axios.delete('/set/like', {
                    data : {
                        post: post
                    }
                })
            }
        } else {
            alert('좋아요 기능은 로그인 후 사용할 수 있습니다.');
        }
    })
};