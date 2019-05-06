import React from 'react'
import { Button } from 'antd'
import './btn.less'

class GroupBtn extends React.Component {
    render() {
        return (
            <div className="group-btn">
                <Button className="b-green" onClick={ () => this.props.insert() }>新增</Button>
                <Button type="primary" onClick={ () => this.props.edit() }>编辑</Button>
            </div>
        )
    }
}

export default GroupBtn
