
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
        // params에서 지역에 맞는 게시글 보여주기.
    }

}