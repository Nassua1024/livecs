import React from 'react'
import { render } from 'react-dom'
import Index from '@/views/index'
import '@/utils/flexible'
import 'antd/dist/antd.css'
import '@/assets/css/reset.css'
import '@/assets/css/base.css'

render (
    <Index />,
    document.getElementById('root')
);