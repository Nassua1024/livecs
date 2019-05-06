import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import Menu from '@/components/menu/index'
import Crumb from '@/components/crumb/index'
import routes from '@/routers/index'
import './index.less'

class Index extends React.Component {
    render () {
        return (
            <div>
                <Menu />
                <div className="container">
                    <AppContainer>
                        <div>
                            <Crumb />
                            <div className="main">
                                <Router children = { routes } />
                            </div>
                        </div>
                    </AppContainer>
                </div>
            </div>
        )
    }
}

export default Index
