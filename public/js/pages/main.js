
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
        const regions = regionsTemp.data;
        history.pushState(null, null, `?page=main&region=${regions[0].name}`);
        window.dispatchEvent(new Event('locationchange'));
    } else {
        const region = params.region;
        const postsTemp = await axios.get('/data/post', { params: { region: region }});
        const posts = postsTemp.data;
        const $ = document;
        const content = $.querySelector('.content');
        const authenticatedUserTemp = await axios.get('/auth/getAuthenticatedUser');
        const authenticatedUser = authenticatedUserTemp.data;

        content.innerHTML = `
        <div class="posts">
            ${posts.map((post, index) => {
                return `<div class="post" id=${index}>
                        <div class="post_region">위치 : ${region}</div>
                        <div class="post_sec_deposit">보증금 : ${post.sec_deposit}만원</div>
                        <div class="post_monthly">월세 : ${post.monthly}만원</div>
                        <div class="post_manage_fee">관리비 : ${post.manage_fee}만원</div>
                        <div class="post_store">${post.Store.name}</div>
                        <div class="like" id=${index}><button>like</button></div>
                        </div>`
            }).join('')}
        </div>
        `;
        
        const postsDiv = $.querySelector('.posts');
        postsDiv.addEventListener('click', async (event) => {
            console.log(authenticatedUser);
            if(Object.keys(authenticatedUser).length) {
                if(event.target.tagName === 'BUTTON') {
                    const parent = event.target.parentElement
                    const id = parent.id;
                    parent.classList.toggle('filllike');
                    if(parent.classList.contains('filllike')) {
                        // authenticatedUser.userid 사용하여 좋아요 추가
                    } else {
                        // 좋아요 삭제
                    }
                    // posts[id].postid
                } else {
                    // 상세게시글
                }
            } else {
                alert('좋아요 기능을 사용하려면 로그인 하세요.');
            }
        })
    }
}