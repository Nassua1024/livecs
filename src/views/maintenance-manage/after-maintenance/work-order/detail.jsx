/**
* @author: Nassua
* @description: 工单详情
* @see: 2018-04-25
*/

import React from 'react'
import { Select, DatePicker, Input } from 'antd'
import CustomVehicle from './custom-vehicle'
import moment from 'moment'
import Http from '@/utils/http'
import API from '@/utils/config'
import { workDetailQuery } from './config'
import { ORDERBUSINESSTYPE } from '@/utils/constant'
import './index.less'

class WorkDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workDetailQuery,
            orderInfo: {}, // 工单信息 
            maintenanceList: [], // 维修记录
        }
    }

    componentWillMount() {
        this.queryOrderInfo()
        this.initBusinessType()
    }

    // 业务类型
    initBusinessType() {

        const params = { refCode: ORDERBUSINESSTYPE, scene: 4 }

        Http(API.get, params).then(res => {
            if (res && res.code == 'success') {
                const refList = res.obj.referenceDetailInfos || []
                const list = refList.map(({ refDetailName: label, refDetailCode: value }) => ({ label, value }))
                this.setState(state => { return state.workDetailQuery['businessTypeCode'].options = list })
            }
        })
    }


    // 查询工单明细
    queryOrderInfo() {
        
        const params = { orderNo: 'OR20190417018288' }

        Http(API.queryAllOrderInfo, params).then(res => {
            if (res && res.code == 'success') {
                
                const Vo = res.obj || {}
                const fields = ['businessTypeCode', 'inStoreFlag', 'bookingClosingDate', 'externalOrderNo']
                
                this.setState({ orderInfo: Vo })
                this.setState(state => {
                    fields.forEach(key => state.workDetailQuery[key].value = Vo[key])
                    return state.workDetailQuery
                })
            }
        })
    }

    render() {

        const { workDetailQuery, orderInfo } = this.state

        return (
            <div className="work-detail">
                <div className="header">
                    <ul>
                        <span>工单号：{ orderInfo.orderNo }</span>
                        <span>状态：已竣工</span>
                    </ul>
                    <ul>
                        {
                            Object.keys(workDetailQuery).map(key => (
                                <li key={ key }>
                                    <label>{ workDetailQuery[key].label }</label>
                                    {
                                        workDetailQuery[key].type == 'input' && 
                                        <Input value={ workDetailQuery[key].value } />
                                    }
                                    {
                                        workDetailQuery[key].type == 'select' && 
                                        <Select value={ workDetailQuery[key].value }>
                                            {
                                                workDetailQuery[key].options.map(item => (
                                                    <Select.Option key={ item.value } value={ item.value }>{ item.label }</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    }
                                    {
                                        workDetailQuery[key].type == 'date' && 
                                        <DatePicker value={ moment(workDetailQuery[key].value) } />
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <CustomVehicle orderInfo={ orderInfo } />
            </div>
        )
    }
}

export default WorkDetail
