import React from 'react'
import { Menu } from 'antd'
import Http from '@/utils/http'
import URL from '@/utils/config'
import { jsonTree } from '@/utils/base'
import './index.less'

const { Item, SubMenu } = Menu

class MenuBar extends React.Component {

    constructor (props) {
        super(props) 
        this.state = { 
            menuList: [], // 菜单
            rootSubmenuKeys: [], // 每个菜单对应的 key 值
            openKeys: [] // 当前展开的菜单对应的 key 值
        }
    }
    
    componentWillMount () {
        
        const params = { loginName: 'lg', loginPasswd: 'lg' }

        Http(URL.getLoginInfo, params).then(res => {
            if (res && res.code == 'success') this.initMenu()
        })
    }

    // 初始化菜单
    initMenu () {
        
        const params = {
            groupCode: "000001",
            postCodes: ["010000"],
            orgCode: "010005",
            resourceChannelCode: "MenuPC"
        }
        
        Http(URL.queryPostUsableGroupResourceInfo, params).then(res => {
            if (res && res.code == 'success') {
                
                if (!res.obj) return
                
                const list = res.obj.menu || []
                const config = { id: 'resourceCode', pid: 'fatherResourceCode' }
                const rootSubmenuKeys = list.map(item => item.id)
                
                this.setState({ menuList: jsonTree(list, config), rootSubmenuKeys })
            }
        })
    }

    // 切换菜单 只展开当前父级菜单
    onOpenChange(openKeys) {
        
        const { rootSubmenuKeys } = this.state
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
        
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) this.setState({ openKeys })
        else this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] })
    }

    render () {

        const { menuList, openKeys } = this.state
        
        return (
            <div className="sidebar">
                <Menu 
                    theme="dark" 
                    mode="inline"
                    openKeys={ openKeys }
                    onOpenChange={ v => this.onOpenChange(v) }
                >
                    {
                        menuList.map(item => (
                            <SubMenu title={ item.resourceName } key={ item.id }>
                                {
                                    item.children.map((menuItem, index) => 
                                        {
                                            return (
                                                !menuItem.children ?
                                                <Item key={ menuItem.id }>{ menuItem.resourceName }</Item> : 
                                                <SubMenu title={ menuItem.resourceName } key={ index }>
                                                    {
                                                        menuItem.children.map(subItem => (
                                                            <Item key={ subItem.id }>{ subItem.resourceName }</Item>
                                                        ))
                                                    }
                                                </SubMenu>
                                            )
                                        }
                                    )
                                }
                            </SubMenu>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}

export default MenuBar
