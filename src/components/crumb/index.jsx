import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { crumb } from './config.js'
import './index.less'

const pathSnippets = window.location.hash.split('/').filter(url => url)

class Crumb extends React.Component {
    render () {
        return (
            <Router>
                <Breadcrumb className="crumb">
                    { 
                        pathSnippets.map(url => {
                            return (
                                <Breadcrumb.Item key={ url }>
                                    <Link to={ crumb[url].path }>{ crumb[url].label }</Link>
                                </Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
            </Router>
        )
    }
}

export default Crumb
