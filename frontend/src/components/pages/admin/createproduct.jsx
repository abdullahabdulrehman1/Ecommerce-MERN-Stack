import React from 'react'
import Layout from '../../layout/layout.jsx'
import AdminMenu from '../../layout/adminmenu.jsx'
import  Typography  from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
const CreateProduct = () => {
  return (
    <Layout title={"Ecommerce | Create-Product"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="col-span-9  px-10 pt-2">
          <Typography variant="h5" color="initial">
              Create Product{" "}
            </Typography>
          <Divider sx={{marginY: "10px"}}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
