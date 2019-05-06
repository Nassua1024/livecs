import React from 'react' 
import { Card, Row, Col, DatePicker, Select, Input, Table } from 'antd'
import QueryBtn from '@/components/btn/query'
import { queryVo, fields } from './config'
import API from '@/utils/config'
import Http from '@/utils/http'
import { ORDERBUSINESSTYPE } from '@/utils/constant'

class WorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queryVo, // 查询条件
            tableList: [] // 查询列表
        }
        this.orderNo = {
            title: '工单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            render: orderNo => <a href="javascript: ;" onClick={ () => this.handleRedirect() }>{ orderNo }</a>
        }
    }

    componentWillMount() {
        this.initBusinessType()
    }

    // 业务类型
    initBusinessType() {

        const params = { refCode: ORDERBUSINESSTYPE }

        Http(API.get, params).then(res => {
            if (res && res.code == 'success') {
                const refList = res.obj.referenceDetailInfos || []
                const list = refList.map(({ refDetailName: label, refDetailCode: value }) => ({ label, value }))
                this.setState(state => { return state.queryVo['businessTypeCode'].options = list })
            }
        })
    }

    // select 
    handleChange(val, key) {
        this.setState(state => {
            state.queryVo[key].value = val
            return state.queryVo
        })
    }

    // input
    handleInput(event, key) {
        
        const { value } = event.target
        
        this.setState(state => {
            state.queryVo[key].value = value
            return state.queryVo
        })
    }

    // 重置
    handleClear() {
        this.setState(state => {
            Object.values(state.queryVo).forEach(item => item.value = item.type == 'date' ?  null : '')
            return state.queryVo
        })
    }

    // 查询
    queryTableInfo() {
        
        const { queryVo } = this.state
        const params = { pageStart: 1, pageNums: 10 }

        for (let [key, item] of Object.entries(queryVo))
            params[key] = item.type == 'date' ? (item.value ? new Date(item.value).Format('yyyy-MM-dd') : '') : item.value
        
        Http(API.queryOrderInfoPageForPicking, params).then(res => {
            if (res && res.code == 'success') this.setState({ tableList: res.obj.list || [] })
        })
    }

    // 跳转页面
    handleRedirect() {
        console.log(1)
    }

    render() {

        const { queryVo, tableList } = this.state

        return (
            <div className="work-order">
                <Card title="查询">
                    <Row className="query">
                        {
                            Object.keys(queryVo).map(key => (
                                <Col span={ 6 } key={ key }>
                                    <label>{ queryVo[key].label }</label>
                                    {
                                        queryVo[key].type == "date" &&
                                        <DatePicker value={ queryVo[key].value } onChange={ val => this.handleChange(val, key) } placeholder="" />
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
                                    {
                                        queryVo[key].type == "input" && 
                                        <Input value={ queryVo[key].value } onChange={ event => this.handleInput(event, key) } />
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                    <QueryBtn clear={ () => this.handleClear() } query={ () => this.queryTableInfo() } />
                </Card>
                <div className="table">
                    <Table
                        bordered
                        rowKey="orderNo"
                        pagination={ false } 
                        columns={ [this.orderNo, ...fields] }
                        dataSource={ tableList }
                    />
                </div>
            </div>
        )
    }
}

export default WorkOrder
