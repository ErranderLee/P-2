
export default async function chatlist() {
    const { data : { chatPosts, likePosts } } = await axios.get('/data/getChatPosts');
    console.log(chatPosts);
    const $ = document;
    const content = $.querySelector('.content');
    const likePostsIds = likePosts !== null ? likePosts.map(post => post.postid) : [];

    if(chatPosts.length === 0) {
        content.innerHTML = `
        <div class="title">채팅 목록</div>
        <div class="posts">채팅을 신청한 게시글이 존재하지 않습니다.</div>
        `;
    } else {
        content.innerHTML = `
            <div class="title">채팅 목록</div>
            <div class="posts">
            ${chatPosts.map((post, index) => {
                return `<div class="post", id=${index}>
                            <div class="post_region">위치 : ${post.Region.name}</div>
                            <div class="post_sec_deposit">보증금 : ${post.sec_deposit}만원</div>
                            <div class="post_monthly">월세 : ${post.monthly}만원</div>
                            <div class="post_manage_fee">관리비 : ${post.manage_fee}만원</div>
                            <div class="post_store">${post.Store.name}</div>
                            <div class="like" id=${index}><button class="like_button" id=${post.postid}>Like</button></div>
                        </div>`
            }).join('')}
            </div>
            `;
        
        if(likePostsIds.length > 0) {
            const btns = $.querySelectorAll('button');
            btns.forEach((btn) => {
                if(likePostsIds.includes(parseInt(btn.id))) {
                    const index = btn.parentElement.id;
                    chatPosts[index].like = true;
                    btn.classList.add('filllike');
                }
            });
        }

        const postsDiv = $.querySelector('.posts');
        postsDiv.addEventListener('click', async (event) => {
            if(event.target.tagName === 'BUTTON') {
                const btn = event.target;
                const parent = event.target.parentElement;
                const id = parent.id;
                btn.classList.toggle('filllike');
                if(btn.classList.contains('filllike')) {
                    axios.post('/set/like', {
                        post: chatPosts[id]
                    });
                } else {
                    axios.delete('/set/like', {
                        data : {
                            post: chatPosts[id]
                        }
                    });
                }
            } else {
                const index = event.target.parentElement.id;
                history.pushState({ 'post': chatPosts[index] }, null, `?page=post&postid=${index}`);
                window.dispatchEvent(new Event('locationchange'));
            } 
        });
    }
}
