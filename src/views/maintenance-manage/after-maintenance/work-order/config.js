import React from 'react'

// 查询页
export const queryVo = {
    businessTypeCode: {
        label: '业务类型',
        value: '',
        type: 'select',
        options: []
    },
    orderSourceType: {
        label: '工单来源',
        value: '',
        type: 'select',
        options: [ 
            { label: '全部', value: null },
            { label: '门店散客', value: 0 },
            { label: '售后预约', value: 1 },
            { label: '销售预约', value: 2 },
            { label: '客服预约', value: 3 }
        ]
    },
    createTimeFrom: {
        label: '创建时间',
        value: null,
        type: 'date'
    },
    createTimeTo: {
        label: '至',
        value: null,
        type: 'date'
    },
    closingFlag: {
        label: '交车状态',
        value: '',
        type: 'select',
        options: [
            { label: '全部', value: null },
            { label: '未交车', value: 0} , 
            { label: '可交车', value: 1 }
        ]
    },
    orderStatus: {
        label: '维修状态',
        value: '',
        type: 'select',
        options: [
            { label: '全部', value: null },
            { label: '待处理', value: 0 }, 
            { label: '处理中', value: 1 },
            { label: '已竣工', value: 8 },                    
            { label: '待结算', value: 9 },
            { label: '已结清', value: 10 }
        ]
    },
    closingDateFrom: {
        label: '结算时间',
        value: null,
        type: 'date'
    },
    closingDateTo: {
        label: '至',
        value: null,
        type: 'date'
    },
    paymentStatus: {
        label: '支付状态',
        value: '',
        type: 'select',
        options: [ 
            { label: '全部', value: null },
            { label: '未支付', value: 0 }, 
            { label: '已支付', value: 1 }
        ]
    },
    invoiceStatus: {
        label: '是否开票',
        value: '',
        type: 'select',
        options: [ 
            { label: '全部', value: null },
            { label: '未开票', value: 0 }, 
            { label: '已开票', value: 1 }
        ]
    },
    orderNo: {
        label: '工单号',
        value: '',
        type: 'input'
    },
    externalOrderNo: {
        label: '外部工单号',
        value: '',
        type: 'input'
    },
    custPlates: {
        label: '车牌',
        value: '',
        type: 'input'
    },
    custName: {
        label: '客户姓名',
        value: '',
        type: 'input'
    },
    custMobile: {
        label: '客户手机',
        value: '',
        type: 'input'
    },
    vinCode: {
        label: '车架号',
        value: '',
        type: 'input'
    },
    salesEmpName: {
        label: '开单人',
        value: '',
        type: 'input'
    }
}

export const filters = {
    closingFlag: {
        '0': '未交车',
        '1': '可交车'
    },
    orderStatus: {
        '-1': '已作废',
        '0': '待处理',
        '1': '处理中',
        '8': '已竣工',
        '9': '待结算',
        '10': '已结算'
    },
    pickingStatus: {
        '-1': '无需领料',
        '0': '未领料',
        '1': '部分领料',
        '2': '全部领料',
    },
    paymentStatus: {
        '0': '未支付',
        '1': '已支付'
    },
    invoiceStatus: {
        '0': '未开票',
        '1': '已开票'
    },
    orderSourceType: {
        '0': '门店散客',
        '1': '售后预约',
        '2': '销售预约',
        '3': '客服预约'
    }
}

export const fields = [
    {
        title: '工单业务类型',
        dataIndex: 'businessTypeName',
        key: 'businessTypeName',
    }, {
        title: '交车状态',
        dataIndex: 'closingFlag',
        key: 'closingFlag',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '维修状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '领料状态',
        dataIndex: 'pickingStatus',
        key: 'pickingStatus',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '门店名称',
        dataIndex: 'storeName',
        key: 'storeName'
    }, {
        title: '开单人',
        dataIndex: 'salesEmpName',
        key: 'salesEmpName'
    }, {
        title: '客户姓名',
        dataIndex: 'custName',
        key: 'custName'
    }, {
        title: '客户类型',
        dataIndex: 'custTypeName',
        key: 'custTypeName'
    }, {
        title: '手机',
        dataIndex: 'custMobile',
        key: 'custMobile'
    }, {
        title: '车架号',
        dataIndex: 'vinCode',
        key: 'vinCode'
    }, {
        title: '车牌',
        dataIndex: 'custPlates',
        key: 'custPlates'
    }, {
        title: '车型',
        dataIndex: 'carDisplayName',
        key: 'carDisplayName'
    }, {
        title: '工单金额',
        dataIndex: 'actualPriceTotal',
        key: 'actualPriceTotal'
    }, {
        title: '支付状态',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '是否开票',
        dataIndex: 'invoiceStatus',
        key: 'invoiceStatus',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '工单创建时间',
        dataIndex: 'createTimeStr',
        key: 'createTimeStr'
    }, {
        title: '工单结算时间',
        dataIndex: 'closingDateStr',
        key: 'closingDateStr'
    }, {
        title: '工单来源',
        dataIndex: 'orderSourceType',
        key: 'orderSourceType',
        render: val => <span>{ filters.orderStatus[val] }</span>
    }, {
        title: '外部工单号',
        label: 'externalOrderNo',
        key: 'externalOrderNo'
    }, {
        title: '检查单',
        dataIndex: 'precheckOrderNos',
        key: 'precheckOrderNos'
    }
]

// 详情页
export const workDetailQuery = {
    businessTypeCode: {
        label: '*业务类型',
        value: '',
        type: 'select',
        options: []
    },
    inStoreFlag: {
        label: '*车辆进店标签',
        value: '',
        type: 'select',
        options: [
            { label: '普通', value: 0 },
            { label: '紧急', value: 1 },
            { label: '预约', value: 2 },
            { label: '返工', value: 3 }
        ]
    },
    bookingClosingDate: {
        label: '*预计交车时间',
        value: '',
        type: 'date',
    },
    externalOrderNo: {
        label: '外部工单号',
        value: '',
        type: 'input'
    }
}

export const maintenanceFields = [
    {
        title: '进场日期',
        dataIndex: 'createTimeString',
        key: 'createTimeString'
    }, {
        title: '进场门店',
        dataIndex: 'storeName',
        key: 'storeName'
    }, {
        title: '工单号',
        dataIndex: 'orderNo',
        key: 'orderNo'
    }, {
        title: '工单类型',
        dataIndex: 'businessTypeName',
        key: 'businessTypeName'
    }, {
        title: '消费金额',
        dataIndex: 'displayAmount',
        key: 'displayAmount'
    }, {
        title: '送修人',
        dataIndex: 'repairCustomName',
        key: 'repairCustomName'
    }, {
        title: '送修人电话',
        dataIndex: 'repairMobilePhone',
        key: 'repairMobilePhone'
    }, {
        title: '服务顾问',
        dataIndex: 'salesEmpName',
        key: 'salesEmpName'
    }
]
