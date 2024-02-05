import React from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Layout from "../layout/layout";

const Policy = () => {
  return (
    <>
      <Layout title={"Privacy Policy | Ecommerce"}>
        <div className="container  flex flex-wrap mb-4 justify-center  mx-auto rounded-xl p-5  border border-gray-800  mt-10">
          <img
            src="/public/aboutus.jpg"
            className=" w-full h-50  lg:w-1/3 rounded-xl "
          />
          <div className="  w-full lg:w-1/2 lg:ml-5">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-justify">
              {" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing ipsum dolor
              sit, amet consectetur adipisicing elit. Deleniti hic, incidunt ab
              repudiandae nisi natus assumenda tenetur! Quis inventore minima
              molestiae eum nisi esse! Adipisci distinctio expedita cum dolores
              ut.{" "}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

Layout.defaultProps = {
  title: "Privacy Policy", 
  description: "Ecommerce Store",
  keywords: "Ecommerce Store",
};
export default Policy;
