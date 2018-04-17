import UserInfo from '../entities/user-info'

const createNewUser = function (userId, userName) {
    let userInfo = new UserInfo();
    userInfo.setUserId(userId);
    userInfo.setUserName(userName);
    return true;
};

export {
    createNewUser
}