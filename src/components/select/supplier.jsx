import React from 'react'
import { Select } from 'antd'
import Http from '@/utils/http'
import API from '@/utils/config'

class Supplier extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            supplierList: [] // 供应商列表
        }
    }

    componentWillMount() {
        this.querySupplier()
    }

    // 查询供应商列表
    querySupplier(supplierName) {
        
        const params = { pageNums: 10, pageStart: 1, supplierName }

        Http(API.querySupplierInfo, params).then(res => {
            if (res && res.code == 'success') {
                const Vo = res.obj || {}
                const list = Vo.list || []
                const supplierList = list.map(({ supplierName: label, supplierCode: value }) => ({ label, value }))
                this.setState({ supplierList: [this.props.defaultValue, ...supplierList] })
            }
        })
    }

    render() {
        
        const { supplierList } = this.state
        const { disabled, defaultValue } = this.props

        return (
            <Select
                labelInValue
                showSearch={ true }
                filterOption={ false }
                disabled={ disabled }
                defaultValue={{ key: defaultValue.value }}
                onSearch={ supplierName => this.querySupplier(supplierName) }
                onChange={ supplier => this.props.handleSupplier(supplier) }
            >
                { supplierList.map(item => <Select.Option key={ item.value } value={ item.value }>{ item.label }</Select.Option>) }
            </Select>
        )
    }
}

export default Supplier
