/**
* @author: Nassua
* @description: 客户车辆关系
* @see: 2018-04-25
*/

import React from 'react'
import { Row, Col, Tabs, Table } from 'antd'
import { maintenanceFields } from './config'

class CustVehicle extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            maintenanceList: []
        }
    }

    // 初始化客户信息
    initCustInfo() {
        
    }

    render() {

        const { maintenanceList } = this
        const { orderInfo } = this.props

        return (
            <Row className="custom-vehicle">
                <Col className="custom" span={ 7 }>
                    <div className="plates">
                        <span>{ this.props.orderInfo.custPlates }</span>
                        <a href="javascript: ;">更多</a>
                    </div>
                    <div className="cust">
                        <div className="avator">
                            <img src="http://sit.iris.com/livecs/static/image/company@2x.png" alt="" />
                        </div>
                        <div className="detail-info">
                            <div className="cust-info">
                                <label>{ orderInfo.custName }</label>
                                <span>{ orderInfo.custMobile }</span>
                            </div>
                            <div className="card-info">
                                <div>
                                    <label>可用卡：</label>
                                    <a href="javascript: "><span>1</span>0张</a>
                                </div>
                                <div>
                                    <label>可用券：</label>
                                    <a href="javascript: "><span>1</span>0张</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>车型：{ orderInfo.carDisplayName }</li>
                        <li>车架号：{ orderInfo.vinCode }</li>
                        <li>送修人：{ orderInfo.repairCustomName }</li>
                        <li>送修人电话：{ orderInfo.repairMobilePhone }</li>
                        <li>接待提升</li>
                    </ul>
                </Col>
                <Col className="vehicle" span={ 17 }>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="车辆信息" key="1">
                            <div className="vehicle-info">
                                <ul>
                                    <li>进店里程数：{ orderInfo.mileageIntoStore }</li>
                                    <li>下次保养里程数：</li>
                                    <li>距离下次保养天数：{ orderInfo.maintenanceDateDay }</li>
                                    <li>商业险公司：</li>
                                    <li>商业险到期日：</li>
                                </ul>
                                <ul>
                                    <li>新车销售时间：</li>
                                    <li>保修到期日：</li>
                                    <li>距离保修到期天数：{ orderInfo.warrantyExpiryDateDay }</li>
                                    <li>交强险公司：</li>
                                    <li>交强险到期日：</li>
                                </ul>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="维修记录" key="2">
                            <Table
                                bordered
                                rowKey="orderNo"
                                pagination={ false } 
                                columns={ maintenanceFields }
                                dataSource={ maintenanceList }
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="车主信息" key="3">
                            <div className="cust-info">
                                <ul>
                                    <li>生日：</li>
                                    <li>身份证：</li>
                                    <li>Email：</li>
                                    <li>QQ：</li>
                                    <li>微信：</li>
                                </ul>
                                <ul>
                                    <li>准驾车型：</li>
                                    <li>初次领证日期：</li>
                                    <li>驾照到期日期：</li>
                                    <li>客户所在行业：</li>
                                    <li>公司：</li>
                                </ul>
                                <ul>
                                    <li>职务：</li>
                                    <li>年收入：</li>
                                    <li>婚姻：</li>
                                    <li>爱好：</li>
                                    <li>感兴趣增值服务：</li>
                                </ul>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

export default CustVehicle
