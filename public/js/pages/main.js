
export default async function main(params) {    
    if(Object.keys(params).length === 1) {
        const state = history.state;
        let regionsTemp;
        if(state) {
            const userid = state.userid;
            regionsTemp = await axios.get('/data/region', { params: { userid: userid } });
        } else {
            regionsTemp = await axios.get('/data/region');
        }
        const { data: regions } = regionsTemp;
        history.pushState(null, null, `?page=main&region=${regions[0].name}`);
        window.dispatchEvent(new Event('locationchange'));
    } else {
        const region = params.region;
        const { data : { posts, likePosts } } = await axios.get('/data/post', { params: { region: region }});

        const likePostsIds = likePosts !== null ? likePosts.map(post => post.postid) : [];

        const $ = document;
        const content = $.querySelector('.content');
        const { data: authenticatedUser } = await axios.get('/auth/getAuthenticatedUser');

        content.innerHTML = `
        <div class="posts">
            ${posts.map((post, index) => {
                return `<div class="post" id=${index}>
                        <div class="post_region">위치 : ${region}</div>
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
                    console.log(btn.id);
                    btn.classList.add('filllike');
                }
            })
        }
        
        const postsDiv = $.querySelector('.posts');
        postsDiv.addEventListener('click', async (event) => {
            if(event.target.tagName === 'BUTTON') {
                if(Object.keys(authenticatedUser).length) {
                    const btn = event.target;
                    const parent = event.target.parentElement
                    const id = parent.id;
                    btn.classList.toggle('filllike');
                    if(btn.classList.contains('filllike')) {
                        axios.post('/set/like', {
                            post: posts[id]
                        });
                    } else {
                        axios.delete('/set/like', {
                            data : {
                                post: posts[id]
                            }
                        })
                    }
                } else {
                    alert('좋아요 기능을 사용하려면 로그인 하세요.');
                }
            } else {
                // 상세게시글
            } 
        });
    }
}