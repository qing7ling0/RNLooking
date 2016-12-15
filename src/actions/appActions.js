/**
 *  app全局相关action
 */
import {AsyncStorage} from 'react-native'
import Http from '../utils/Http'
import Utils from '../utils/Utils'
import * as ActionTypes from '../constants/ActionTypes'

const Users = [ 
        {id:1, name:'张飞', lastChatMessage:'我们又不关心你是什么星座，只关心你是哪些星座的缺点的结合点而已', lastChatMessageDate:'2016-12-5', unreadMessageCount:2, icon:1},
        {id:2, name:'关羽', lastChatMessage:'群里做短信的可以报数看看有你们多少同行', lastChatMessageDate:'11:06', unreadMessageCount:4, icon:2},
        {id:3, name:'赵云', lastChatMessage:'是龙哥的经理人，向龙哥提问先到我这里交钱', lastChatMessageDate:'20:11', unreadMessageCount:16, icon:3},
        {id:4, name:'王寒', lastChatMessage:'我想问问看 公司有个APP端想嵌入LBS定位 谁能做？', lastChatMessageDate:'2013-11-06', unreadMessageCount:5, icon:4},
        {id:5, name:'薛之谦', lastChatMessage:'当一个人说别人扯淡的时候，往往疏忽了自己也是在扯淡', lastChatMessageDate:'2014-10-16', unreadMessageCount:8, icon:5},
        {id:6, name:'范冰冰', lastChatMessage:'好比这样，想知道我什么星座，看我资料就知道是巨蟹', lastChatMessageDate:'2016-05-22', unreadMessageCount:3, icon:6},
        {id:7, name:'李晨', lastChatMessage:'群里有人玩过龙族这游戏吗？dragonraja', lastChatMessageDate:'08:22', unreadMessageCount:2, icon:7},
        {id:8, name:'刘恺威', lastChatMessage:'确实，跟后来棒子走唯美路线的其他游戏完全不是一类', lastChatMessageDate:'21:39', unreadMessageCount:0, icon:8},
        {id:9, name:'杨幂', lastChatMessage:'我把本群号给这牛逼哥了', lastChatMessageDate:'2015-04-17', unreadMessageCount:7, icon:9},
    ];

const Friends = [
    {id:1, name:'墨香', signature:'我有一个想法做一件有意义的事即使没人', lastChatMessageDate:'2016-12-5', unreadMessageCount:2, icon:1},
    {id:2, name:'西瓜挂瓜', signature:'这里发生火灾', lastChatMessageDate:'11:06', unreadMessageCount:4, icon:2},
    {id:3, name:'赵云', lastChatMessage:'是龙哥的经理人，向龙哥提问先到我这里交钱', lastChatMessageDate:'20:11', unreadMessageCount:16, icon:3},
    {id:4, name:'学会+简单', signature:'好好上班！加油！', lastChatMessageDate:'2013-11-06', unreadMessageCount:5, icon:4},
    {id:5, name:'佛爷', signature:'曾经无话不说的朋友 现在也变的无话不说', lastChatMessageDate:'2014-10-16', unreadMessageCount:8, icon:5},
    {id:6, name:'风平浪静', signature:'拥有快乐心情，才能欣赏', lastChatMessageDate:'2016-05-22', unreadMessageCount:3, icon:6},
    {id:7, name:'浅灰色', signature:'多经历一些是好事噻。。。', lastChatMessageDate:'08:22', unreadMessageCount:2, icon:7},
    {id:8, name:'伤心女孩', signature:'记忆里太好是一种负担', lastChatMessageDate:'21:39', unreadMessageCount:0, icon:8},
    {id:9, name:'张宇', signature:'今天的风儿有点喧嚣~', lastChatMessageDate:'2015-04-17', unreadMessageCount:7, icon:9},
];

const FriendGroups = [
    {id:1, name:'特别关心', friendIDS:[1,2,3] },
    {id:2, name:'常用群聊', friendIDS:[6,7] },
    {id:3, name:'我的好友', friendIDS:[9,6,4,3] },
    {id:4, name:'大学校友', friendIDS:[5,7,8] },
    {id:5, name:'高中同学', friendIDS:[2,9,1,5,8,7] },
]

const getUserInfoFN = (id) => {
    for (var i = 0; i < Users.length; i++) {
        let user = Users[i];
        if (user.id === id) return user;
    }

    return null;
}

/**
 * 获取users
 */
export const getUsers = (page, pageCount) => {
    let list = [0,1,2,3,4,5,6,7,8];
    let count = list.length;
    let ret = [];
    for(let i=count-1; i>=0; i--) {
        if (i < 1) {
            ret.push(Users[list[i]]);
        } else {
            let ind = Utils.randomInt(i+1);
            ret.push(Users[list[ind]]);
            list[ind] = list[i];
        }
    }

    return (dispatch) => {
        dispatch({ type: ActionTypes.REQ_USER_LIST, page:page })
        setTimeout(() => {
            dispatch({ type: ActionTypes.RES_USER_LIST, users: ret, page:page, pageCount:pageCount })
        }, 500)
    };
}
/**
 * 获取user info
 */
export const getUserInfo = (id) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.REQ_USER_INFO })
        setTimeout(() => {
            dispatch({ type: ActionTypes.RES_USER_INFO, info: getUserInfoFN(id) })
        }, 50)
    };
}

export const getAllFriends = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.REQ_ALL_FRIENDS })
        setTimeout(() => {
            dispatch({ type: ActionTypes.RES_ALL_FRIENDS, friendGroups:FriendGroups, friends:Friends })
        }, 50)
    };
}

export const showMoreMenu = (menuRenderFn) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SHOW_MORE_MENU, maskRender: menuRenderFn })
    };
}

export const hideMoreMenu = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.HIDE_MORE_MENU})
    };
}

export const showMainNav = (navID) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SHOW_MAIN_NAV, navID:navID})
    };
}