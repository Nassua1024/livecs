const URL = {
    // 登录
    getLoginInfo: '/v1/login.htm', 
    // 菜单、按钮权限
    queryPostUsableGroupResourceInfo: '/v2/systemfoundation/grouppost/queryPostUsableGroupResourceInfo.htm',

    // sequence
    getSequence: '/v1/sys/seq/getSequence.htm',
    // refCode
    get: '/systemFoundation_service/v1/sys/ref/get',

    /* 预付*  查询预付列表 */ 
    queryAdvancePayingOrderInfosExt: '/v2/crps/advance/queryAdvancePayingOrderInfosExt.htm',
    // 查询供应商
    querySupplierInfo: '/v2/supplychain/supplier/querySupplierInfo.htm',
    // 新增预付单
    insertAdvancePayingOrderInfo: '/v2/crps/advance/insertAdvancePayingOrderInfo.htm',
    // 编辑预付单
    updateAdvancePayingOrderInfo: '/v2/crps/advance/updateAdvancePayingOrderInfo.htm',

    /* 工单*  查询工单列表 */
    queryOrderInfoPageForPicking: '/v2/clearingSettlement/order/queryOrderInfoPageForPicking.htm',
    // 查询工单详情
    queryAllOrderInfo: '/v2/aftersales/order/queryAllOrderInfo.htm' 
}

export default URL
