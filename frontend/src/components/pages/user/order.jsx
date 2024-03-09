import React, { useState } from 'react'
import UserMenu from '../../layout/usermenu'
import Layout from '../../layout/layout'
import { Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  
  return (
    <Layout title={"Ecommerce | All Orders"}>
    <div className="container border border-black mx-auto rounded-lg">
      <div className="row grid grid-cols-12 row-span-2 justify-between">
        <div className="col-span-3 row-span-1 border ">
          <UserMenu />
        </div>
        <div className="col-span-9  px-10 py-1">
        <Typography level="h3" fontWeight="thin" sx={{ mt: 2, mx: 2 }}>
              All Orders
            </Typography>
        </div>


      </div>
    </div>
  </Layout>
  )
}

export default Order
