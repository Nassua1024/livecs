import React from 'react'
import { Card, Row, Col, Input, DatePicker, Select, Table, message } from 'antd'
import QueryBtn from '@/components/btn/query'
import GroupBtn from '@/components/btn/group'
import Dialog from './dialog'
import Http from '@/utils/http'
import URL from '@/utils/config'
import { queryVo, fields } from './config'
import './index.less'

class AdvancePay extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            queryVo, // 查询条件
            selectedRow: [], // 当前选中的预付明细
            selectedRowKeys: [], // table key
            tableList: [], // 查询列表
            visible: false // 是否显示新增、编辑弹窗
        }
    }

    // 查询条件Input
    // 不要在setState回调中直接使用event.target
    handleInput(event, key) {
        const { value } = event.target
        this.setState(state => {
            state.queryVo[key].value = value
            return state.queryVo
        })
    }

    // 查询条件DatePicker Select
    handleChange(val, key) {
        this.setState(state => {
            state.queryVo[key].value = val
            return state.queryVo
        })
    }

    // disabled日期
    disabledStartDate(val, key) {
        
        const { payingTimeEndStr, payingTimeStartStr } = this.state.queryVo
        const field = key == 'payingTimeStartStr' ? payingTimeEndStr : payingTimeStartStr

        if (!val || !field.value) return
        if (key == 'payingTimeStartStr') return val.valueOf() > (field.value).valueOf()
        else return val.valueOf() < (field.value).valueOf()
    }

    // 查询预付列表
    queryTableInfo() {
        
        const { queryVo } = this.state
        const params = { pageNums: 10, pageStart: 1 }

        for (let [key, item] of Object.entries(queryVo)) 
            params[key] = item.type == 'date' ? (item.value ? new Date(item.value).Format('yyyy-MM-dd') : '') : item.value

        Http(URL.queryAdvancePayingOrderInfosExt, params).then(res => {
            if (res && res.code == 'success') this.setState({ tableList: res.obj.list || [] })
        })
    }

    // 清空查询列表
    handleClear() {
        this.setState(state => {
            Object.values(state.queryVo).forEach(item => item.value = '')
            return state.queryVo
        })
    }

    // 新增
    handleInsert() {
        this.setState({ selectedRowKeys: [], selectedRow: [], visible: true })
    }

    // 编辑
    handleEdit() {

        if (!this.state.selectedRowKeys.length) {
            message.warning('请选择一条预付明细', 1)
            return
        }

        this.setState({ visible: true })
    }

    render () {

        const { queryVo, tableList, selectedRowKeys, selectedRow, visible } = this.state
        const rowSelection = { 
            type: 'radio',
            columnTitle: '选择',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRow) => this.setState({ selectedRowKeys, selectedRow })
        }

        return (
            <div className="advance-pay">
                <Card title="查询">
                    <Row className="query">
                        {
                            Object.keys(queryVo).map(key => (
                                <Col span={ 6 } key={ key }>
                                    <label>{ queryVo[key].label }</label>
                                    {   
                                        queryVo[key].type == "input" && 
                                        <Input value={ queryVo[key].value } onChange={ event => this.handleInput(event, key) } /> 
                                    }
                                    { 
                                        queryVo[key].type == "date" && 
                                        <DatePicker 
                                            value={ queryVo[key].value }
                                            onChange={ val => this.handleChange(val, key) } 
                                            disabledDate={ val => this.disabledStartDate(val, key) } 
                                            placeholder='' 
                                        /> 
                                    }
                                    {   
                                        queryVo[key].type == "select" && 
                                        <Select value={ queryVo[key].value } onChange={ val => this.handleChange(val, key) }>
                                            {
                                                queryVo[key].options.map(dataItem => (
                                                    <Select.Option key={ dataItem.value }>{ dataItem.label }</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                    <QueryBtn clear={ () => this.handleClear() } query={ () => this.queryTableInfo() } />
                </Card>
                <div className="table">
                    <GroupBtn insert={ () => this.handleInsert() } edit={ () => this.handleEdit() } />
                    <Table 
                        bordered 
                        rowKey="advancePayingNo" 
                        pagination={ false } 
                        rowSelection={ rowSelection } 
                        dataSource={ tableList } 
                        columns={ fields } 
                    />
                </div>
                <Dialog 
                    visible={ visible }
                    advancePayInfo={ selectedRow } 
                    handleSuccess={ () => this.queryTableInfo() }
                />
            </div>
        )
    }
}

export default AdvancePay
