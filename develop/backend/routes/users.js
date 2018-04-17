import express from 'express';

import Response from '../entities/response-data'
import {isEmpty} from '../utils/commons'
import {createNewUser} from '../controllers/users-ctrl'

const router = express.Router();

router.get('/query', function (req, res, next) {
    let response = new Response();


});

router.post('/create', function (req, res, next) {
    let response = new Response(),
        userId = req.body.userId,
        userName = req.body.userName;

    if (isEmpty(userId) || isEmpty(userName)) {
        response.setReturnCode('N');
        response.setReturnDesc('参数为空');
        response.setReturnData('');
    } else {
        if (createNewUser(userId, userName)) {
            response.setReturnCode('Y');
            response.setReturnDesc('设置成功');
            response.setReturnData('');
        } else {
            response.setReturnCode('N');
            response.setReturnDesc('逻辑错误');
            response.setReturnData('');
        }
    }

    res.send(response);
});

module.exports = router;
