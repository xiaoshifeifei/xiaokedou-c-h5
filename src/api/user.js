import request from '@/utils/request';
const user = {
    getInfo(params) {
        return request({
            url: `/zlActivity/findRemarks/${params.id}`,
            method: 'get',
            params,
        });
    },
    //查看视频
    getVideoData(params) {
        return request({
            url: `/dyuser/detail`,
            method: 'post',
            data: params
        });
    },
    //查看视频(test)
    getVideoTestData(params) {
        return request({
            url: `/dyuser/clerk/getvideo`,
            method: 'get',
            params
        });
    },
    //发布视频(test)
    sendVideoTestData(params) {
        return request({
            url: '/dyuser/clerk/send',
            method: 'post',
            data: params,
        });
    },
    //发布视频
    sendVideoData(params) {
        return request({
            url: '/dyuser/publish',
            method: 'post',
            data: params,
        });
    },
    //登录
    login(params) {
        return request({
            url: '/dyuser/login',
            method: 'post',
            data: params,
        });
    },
    // 短信
    getCode(params) {
        return request({
            url: '/sms/res',
            method: 'post',
            data: params,
        });
    },
    // 注册
    signUp(params) {
        return request({
            url: '/user/spread',
            method: 'post',
            data: params,
        });
    },
    // 注册
    signUpCopy(params) {
        return request({
            url: '/user/invite',
            method: 'post',
            data: params,
        });
    },

    // 下载
    down(params) {
        return request({
            url: `/version/new`,
            method: 'get',
            params
        });
    },

    // 用户协议
    getXieyiData(params) {
        return request({
            url: `/treaty/hide`,
            method: 'get',
            params
        });
    },
    getFindLotteryById(params) {
        return request({
            url: '/lottery/findLotteryById/ysfPayHtml',
            method: 'get',
        });
    },
    getWinning(params) {
        return request({
            url: '/lottery/getLotterys',
            method: 'get',
            params,
        });
    },
    getGoLottery(params) {
        return request({
            url: '/lottery/goLottery/ysfPayHtml',
            method: 'get',
        });
    },
    getUpdateAdd(params) {
        return request({
            url: '/lottery/updateAddress',
            method: 'put',
            data: params,
        });
    },

    goToPay(params) {
        return request({
            url: '/zlActivity/getPayAddress',
            method: 'get',
            params,
        });
    },
    gozlActivity(params) {
        return request({
            url: '/zlActivity/getPayAddress',
            method: 'get',
            params,
        });
    },
    goOtherJoin(params) {
        return request({
            url: '/zlActivity/otherJoin',
            method: 'get',
            params,
        });
    },

    getCjData(params) {
        return request({
            url: '/zlActivity/findActivitesLuck',
            method: 'get',
            params,
        });
    },
    getUrl(params) {
        return request({
            url: '/zlActivity/getIntermeYsfLink',
            method: 'get',
            params,
        });
    },
};
export default user;