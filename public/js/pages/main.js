
export default async function main(params) {    
    if(Object.keys(params).length === 1) {
        const state = history.state;
        let regionsTemp;
        if(state) {
            const userid = state.userid;
            regionsTemp = await axios.get('/region', { params: { userid: userid} });
        } else {
            regionsTemp = await axios.get('/region');
        }
        const regions = regionsTemp.data;
        history.pushState(null, null, `?page=main&region=${regions[0].name}`);
        window.dispatchEvent(new Event('locationchange'));
    } else {
        const region = params.region;
        const postsTemp = await axios.get('/post', { params: { region: region }});
        const posts = postsTemp.data;
        
        const $ = document;
        const content = $.querySelector('.content');
        content.innerHTML = `
        <div class="posts">
            ${posts.map((post, index) => {
                return `<div class="post" id=${index}>
                        <div class="post_region">${region}</div>
                        <div class="post_sec_deposit">${post.sec_deposit}</div>
                        <div class="post_monthly">${post.monthly}</div>
                        <div class="post_manage_fee">${post.manage_fee}</div>
                        <div class="post_store">${post.Store.name}</div>
                        </div>`
            }).join('')}
        </div>
        `;
    }

}