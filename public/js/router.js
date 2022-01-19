
import login from './pages/login.js';
import main from './pages/main.js';
import signup from './pages/signup.js';
import queryparser from './utils/queryparser.js'

const router = async () => {
    const params = queryparser(location.search);
    const pages = ['main', 'likelist', 'chatlist', 'login', 'signup', 'setregion', 'post', 'chatroom'];
    const page = pages.filter(item => item === params.page).join("");

    if (Object.keys(params).length === 0) {
        const regionsData = await axios.get('/region');
        const regions = regionsData.data;
        history.pushState(null, null, `?page=main&region=${regions[0].name}`);
        window.dispatchEvent(new Event('locationchange'));
    }

    switch(page) {
        case "main":
            main(params);
            break;
        case "likelist":
            console.log("likelist");
            break;
        case "chatlist":
        
        case "login":
            login();
            break;
        case "signup":
            signup();
            break;
        case "setregion":
        
        case "post":
        
        case "chatroom":
            
    }
};

window.addEventListener('DOMContentLoaded', () => router());

window.addEventListener('locationchange', () => {
    console.log("locationchanged");
    router();
});

window.addEventListener('popstate', () => router());


