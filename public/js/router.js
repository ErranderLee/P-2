import signup from './pages/signup.js';
import queryparser from './utils/queryparser.js'

const router = () => {
    const params = queryparser(location.search);
    const pages = ['main', 'likelist', 'chatlist', 'login', 'signup', 'setregion', 'post', 'chatroom'];
    const page = pages.filter(item => item === params.page).join("");

    switch(page) {
        case "main":
            console.log("main");
            break;
        case "likelist":
            console.log("likelist");
            break;
        case "chatlist":
        
        case "login":
        
        case "signup":
            signup();
            break;
        case "setregion":
        
        case "post":
        
        case "chatroom":
            
    }
};

window.addEventListener('DOMContentLoaded', router());

window.addEventListener('locationchange', () => {
    console.log("locationchanged");
    router();
});

window.addEventListener('popstate', () => router());


