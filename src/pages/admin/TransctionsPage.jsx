import React from 'react'
import SideBar from '../../components/Admin/SideBar/SideBar'
import OrderList from '../../components/Admin/Orders/OrderList'

function TransctionsPage() {
  return (
      <div className="flex">
      <SideBar />
      <OrderList/>
    </div>
    
  )
}

export default TransctionsPage
