
export default async function chatroom() {
    const { postid } = history.state;
    const temp = await axios.get('/chat/getChatroom', {
        params: {
            postid: postid
        }
    });
    console.log(temp);
}