import React from 'react'
import OrderSummary from '../../components/User/Order-Summary/OrderSummary'
import Footer from '../../components/User/Footer/Footer'
import NavBar from '../../components/User/NavBar/NavBar'

function OrderSummaryPage() {
  return (
    <>
      <NavBar/>
      <OrderSummary/>
      <Footer/>
    </>
  )
}

export default OrderSummaryPage
