import React from 'react'
import UserMenu from '../../layout/usermenu'
import Layout from '../../layout/layout'

const Order = () => {
  return (
    <Layout title={"Ecommerce | All Orders"}>
    <div className="container border border-black mx-auto rounded-lg">
      <div className="row grid grid-cols-12 row-span-2 justify-between">
        <div className="col-span-3 row-span-1 border ">
          <UserMenu />
        </div>
        <div className="col-span-9  px-10 py-1">
       <h1>All Orders</h1>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Order
