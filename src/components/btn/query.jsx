import React from 'react'
import { Button } from 'antd'
import './btn.less'

class QueryBtn extends React.Component {
    render() {
        return (
            <div className="query-btn">
                <Button onClick={ () => this.props.clear() }>重置</Button>
                <Button type="primary" onClick={ () => this.props.query() }>查询</Button>
            </div>
        )
    }
}

export default QueryBtn
