
import chatlist from './pages/chatlist.js';
import chatroom from './pages/chatroom.js';
import detailpost from './pages/detailpost.js';
import likelist from './pages/likelist.js';
import login from './pages/login.js';
import main from './pages/main.js';
import signup from './pages/signup.js';
import queryparser from './utils/queryparser.js'

const router = async () => {
    const params = queryparser(location.search);
    const pages = ['main', 'likelist', 'chatlist', 'login', 'signup', 'setregion', 'post', 'chatroom'];
    const page = pages.filter(item => item === params.page).join("");
    const $ = document;

    const { data: authenticatedUser } = await axios.get('/auth/getAuthenticatedUser');
    const divLogin = $.querySelector('.header_login');

    if(Object.keys(authenticatedUser).length) {
        divLogin.innerText = authenticatedUser.id;
    }

    if (Object.keys(params).length === 0) {
        if(Object.keys(authenticatedUser).length === 0) {
            history.pushState(null, null, `?page=main`);
            window.dispatchEvent(new Event('locationchange'));
        } else {
            history.pushState({'userid': authenticatedUser.userid}, null, `?page=main`);
            window.dispatchEvent(new Event('locationchange'));
        }
    }

    switch(page) {
        case "main":
            main(params);
            break;
        case "likelist":
            likelist();
            break;
        case "chatlist":
            chatlist();
            break;
        case "login":
            login();
            break;
        case "signup":
            signup();
            break;
        case "setregion":
            console.log('setregion');
            break;
        case "post":
            detailpost();
            break;
        case "chatroom":
            chatroom(params);
            break;
    }
};

window.addEventListener('DOMContentLoaded', () => router());

window.addEventListener('locationchange', () => {
    console.log("locationchanged");
    router();
});

window.addEventListener('popstate', () => {
    router();
});


