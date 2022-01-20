const { sequelize, User, User_Region, Store, Region, Post, Likes, Image, Chatroom, Chatmessage } = require('./models');

module.exports = async () => {
    const s1 = await Store.create({name : '해피부동산', hp : '010-1234-5678' });
    const s2 = await Store.create({name : '배드부동산', hp : '010-2234-5678' });

    const p1 = await Post.create({
        sec_deposit: 500,
        monthly: 40,
        manage_fee: 5,
        num_chat: 0,
        address: '광교 푸르지오 827호',
        options: 'TV, 냉장고, 세탁기, 전기장판, 에어컨'
    })
    const p2 = await Post.create({
        sec_deposit: 1000,
        monthly: 40,
        manage_fee: 5,
        num_chat: 0,
        address: '원천 푸르지오 827호',
        options: 'TV, 냉장고, 세탁기, 전기장판'
    })
    const p3 = await Post.create({
        sec_deposit: 1500,
        monthly: 40,
        manage_fee: 5,
        num_chat: 0,
        address: '우만 푸르지오 827호',
        options: 'TV, 냉장고, 세탁기'
    })
    const p4 = await Post.create({
        sec_deposit: 2500,
        monthly: 40,
        manage_fee: 5,
        num_chat: 0,
        address: '우만주공 827호',
        options: 'TV, 냉장고'
    })

    const r1 = await Region.create({ name : '광교' });
    const r2 = await Region.create({ name : '원천' });
    const r3 = await Region.create({ name : '우만' });

    const u1 = await User.create({ id: 'test', password: 'test' });
    await u1.addRegion(r1);
    await s1.addPost(p1);
    await s1.addPost(p2);
    await s2.addPost(p3);
    await s2.addPost(p4);

    await r1.addPost(p1);
    await r2.addPost(p2);
    await r3.addPost(p3);
    await r3.addPost(p4);
}