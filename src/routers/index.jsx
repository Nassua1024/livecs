import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdvancePay from '@/views/finance/advance-pay'
import WorkOrder from '@/views/maintenance-manage/after-maintenance/work-order'
import WorkDetail from '@/views/maintenance-manage/after-maintenance/work-order/detail'

const routeList = [
    {
        path: '/advance-pay',
        component: AdvancePay
    }, {
        path: '/work-order',
        component: WorkOrder
    }, {
        path: '/work-detail',
        component: WorkDetail
    }
]

const routes = (
    <Switch>
        {
            routeList.map((item, index) => (
                <Route key={ index } path={ item.path } component= { item.component } />
            ))
        }
    </Switch>
)

export default routes
