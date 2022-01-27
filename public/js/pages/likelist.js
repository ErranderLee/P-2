
export default async function likelist() {
    const { data : likePosts } = await axios.get('/data/getLikePosts');
    const $ = document;
    const content = $.querySelector('.content');
    
    if(likePosts.length === 0) {
        content.innerHTML = `
        <div class="title">좋아요 목록</div>
        <div class="posts">좋아요를 누른 게시글이 존재하지 않습니다.</div>
        `;
    } else {
        content.innerHTML = `
            <div class="title">좋아요 목록</div>
            <div class="posts">
            ${likePosts.map((post, index) => {
                return `<div class="post", id=${index}>
                            <div class="post_region">위치 : ${post.Region.name}</div>
                            <div class="post_sec_deposit">보증금 : ${post.sec_deposit}만원</div>
                            <div class="post_monthly">월세 : ${post.monthly}만원</div>
                            <div class="post_manage_fee">관리비 : ${post.manage_fee}만원</div>
                            <div class="post_store">${post.Store.name}</div>
                            <div class="like" id=${index}><button class="like_button filllike" id=${post.postid}>Like</button></div>
                        </div>`
            }).join('')}
            </div>
            `;
    }
    const postsDiv = $.querySelector('.posts');
    postsDiv.addEventListener('click', async (event) => {
        if(event.target.tagName === 'BUTTON') {
            const btn = event.target;
            const parent = event.target.parentElement;
            const id = parent.id;
            btn.classList.toggle('filllike');
            if(btn.classList.contains('filllike')) {
                likePosts[id].like = true;
                axios.post('/set/like', {
                    post: likePosts[id]
                });
            } else {
                delete likePosts[id].like;
                axios.delete('/set/like', {
                    data : {
                        post: likePosts[id]
                    }
                });
            }
        } else {
            const index = event.target.parentElement.id;
            history.pushState({ 'post': likePosts[index] }, null, `?page=post&postid=${index}`);
            window.dispatchEvent(new Event('locationchange'));
        } 
    });
}