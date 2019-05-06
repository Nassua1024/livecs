
export const queryVo = {
    advancePayingNo: {
        label: '预付单号',
        value: '',
        type: 'input',
        center: false
    },
    sourceOrderNo: {
        label: '采购单号',
        value: '',
        type: 'input',
        center: false
    },
    payingTimeStartStr: {
        label: '付款日期',
        value: null,
        type: 'date',
        center: false,
    },
    payingTimeEndStr: {
        label: '至',
        value: null,
        type: 'date',
        center: true,
    },
    supplierName: {
        label: '供应商名称',
        value: '',
        type: 'input',
        center: false
    },
    advanceStatus: {
        label: '单据状态',
        value: '',
        type: 'select',
        center: false,
        options: [
            { value: 0, label: '未付款' },
            { value: 1, label: '已付款' },
            { value: 2, label: '已冻结' },
            { value: 3, label: '已核销' }
        ]
    },
    advanceAmountGet: {
        label: '预付金额',
        value: '',
        type: 'input',
        center: false
    },
    advanceAmountLet: {
        label: '-',
        value: '',
        type: 'input',
        center: true
    }
}

export const fields = [
    {
        title: '预付单号',
        dataIndex: 'advancePayingNo',
        key: 'advancePayingNo',
    }, {
        title: '采购单号',
        dataIndex: 'sourceOrderNo',
        key: 'sourceOrderNo',
    }, {
        title: '付款单号',
        dataIndex: 'paymentApplyCode',
        key: 'paymentApplyCode',
    }, {
        title: '供应商名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
    }, {
        title: '预付单金额',
        dataIndex: 'advanceAmount',
        key: 'advanceAmount',
    }, {
        title: '实付金额',
        dataIndex: 'actualAmount',
        key: 'actualAmount',
    }, {
        title: '已核销金额',
        dataIndex: 'usedAmount',
        key: 'usedAmount',
    }, {
        title: '已冻结金额',
        dataIndex: 'freezingAmount',
        key: 'freezingAmount',
    }, {
        title: '剩余预付金额',
        dataIndex: 'balanceAmount',
        key: 'balanceAmount',
    },  {
        title: '单据状态',
        dataIndex: 'advanceStatus',
        key: 'advanceStatus',
    }, {
        title: '预付提交人',
        dataIndex: 'advanceEmpName',
        key: 'advanceEmpName',
    }, {
        title: '预付单提交日期',
        dataIndex: 'submissionTime',
        key: 'submissionTime',
    }, {
        title: '收银员',
        dataIndex: 'cashierEmpName',
        key: 'cashierEmpName',
    }, {
        title: '付款日期',
        dataIndex: 'payingTime',
        key: 'payingTime',
    }
]
