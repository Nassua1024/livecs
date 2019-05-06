import React from 'react'
import { Modal, Row, Col, Input, Button, message } from 'antd'
import Supplier from '@/components/select/supplier'
import Http from '@/utils/http'
import API from '@/utils/config'
import { ADVANCEPAYINGORDERSEQ, MONEYREG } from '@/utils/constant'
import './index.less'

class Dialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            title: '预付单新增',
            id: '', // 预付单id
            orderStatus: '', // 预付单状态
            advancePayingNo: '', // 预付单号
            supplierCode: '', // 供应商
            supplierName: '',
            sourceOrderNo: '', // 采购单号
            advanceAmount: '', // 预付金额
            supplierDisabled: false, // 供应商是否可选
            advanceAmountDisabled: false // 预付金额是否可填
        }
    }

    componentWillReceiveProps(props) {

        const Vo = props.advancePayInfo[0]
        const fields = ['id', 'orderStatus', 'advancePayingNo', 'supplierCode', 'supplierName', 'sourceOrderNo', 'advanceAmount']
        
        // 点击提交、保存的时候会查询列表，会触发componentWillReceiveProps
        if (!props.visible || props.visible == this.state.visible) return
        
        if (Vo) {
            fields.forEach(key => this.setState({ [key]: Vo[key] }))
            this.setState({ 
                title: '预付单编辑', 
                supplierDisabled: true, 
                advanceAmountDisabled: Vo['orderStatus'] == 1 ? true : false,
            })
        } else {
            fields.forEach(key => this.setState({ [key]: '' }))
            this.setState({ title: '预付单新增', supplierDisabled: false, advanceAmountDisabled: false })
            this.initPayingNo()
        }

        this.setState({ visible: true })
    }
    
    // 初始化预付单号
    initPayingNo() {
        
        const params = { serviceCode: ADVANCEPAYINGORDERSEQ }

        Http(API.getSequence, params).then(res => {
            if (res && res.code == 'success') this.setState({ advancePayingNo: res.obj })
        })
    }

    // 输入预付金额
    // return state.advanceAmount，不会触发render
    handleInput(value) {
        this.setState(state => {
            if (value && !MONEYREG.test(value)) state.advanceAmount.replace(value, '')
            else state.advanceAmount = value
            return state
        })
    }

    // 必填校验
    isRequired() {

        if (!this.state.supplierCode) {
            message.warning('请选择供应商', 1)
            return true
        }

        if (!this.state.advanceAmount) {
            message.warning('请填写预付金额', 1)
            return true
        }
    }

    // 新增
    handleInsert() {

        if (this.isRequired()) return

        const { advancePayingNo, supplierCode, advanceAmount } = this.state
        const params = { advancePayingNo, supplierCode, advanceAmount, orderStatus: 0 }

        Http(API.insertAdvancePayingOrderInfo, params).then(res => {
            if (res && res.code == 'success') {
                
                const Vo = res.obj || {}
                message.success('新增成功', 1)
                
                this.setState({
                    title: '预付单编辑',
                    supplierDisabled: true,
                    orderStatus: Vo.orderStatus,
                    id: Vo.id
                }, this.props.handleSuccess())
            }
        })
    }

    // 编辑
    handleEdit() {

        if (this.isRequired()) return

        const { id, advanceAmount } = this.state
        const params = { id, advanceAmount, orderStatus: 1 }

        Http(API.updateAdvancePayingOrderInfo, params).then(res => {
            if (res && res.code == 'success') {

                const Vo = res.obj || {}
                message.success('编辑成功', 1)

                this.setState({
                    advanceAmountDisabled: true,
                    orderStatus: Vo.orderStatus,
                }, this.props.handleSuccess())
            }
        })
    }

    render() {
        
        const { visible, title, advanceAmount, advancePayingNo, orderStatus } = this.state
        const { supplierDisabled, supplierCode, supplierName, advanceAmountDisabled } = this.state

        return (
            <Modal
                width="800px"
                className="advance-pay davance-modal"
                title={ title }
                footer={ null }
                destroyOnClose={ true }
                visible={ visible }
                onCancel = { () => this.props.cancel() }
            >   
                <div className="modal-content">
                    <div>预付单号：{ advancePayingNo }</div>
                    <Row>
                        <Col span={ 8 }>
                            <label>*供应商名称</label>
                            <Supplier 
                                disabled={ supplierDisabled } 
                                defaultValue={{ label: supplierName, value: supplierCode }} 
                                handleSupplier={ supplier => this.setState({ supplierCode: supplier.key }) } 
                            />
                        </Col>
                        <Col span={ 8 }>
                            <label>采购单号</label>
                            <Input disabled />
                        </Col>
                        <Col span={ 8 }>
                            <label>预付金额</label>
                            <Input 
                                value={ advanceAmount } 
                                disabled = { advanceAmountDisabled } 
                                onChange={ event => this.handleInput(event.target.value) } 
                            />
                        </Col>
                    </Row>
                </div>
                <div className="ant-modal-footer">
                    <Button onClick={ () => this.setState({ visible: false }) }>取消</Button>
                    { orderStatus === '' && <Button className="b-orange" onClick={ () => this.handleInsert() }>提交</Button> }
                    { orderStatus === 0 && <Button type="primary" onClick={ () => this.handleEdit() }>确定</Button> }
                    { orderStatus === 1 && <Button className="b-green">预付</Button> } 
                </div>
            </Modal>
        )
    }
}

export default Dialog
