import React from "react";
import Header from "../layout/header";
import Layout from "../layout/layout";
import { useLocation } from "react-router-dom";
// import { Location } from 'react-router-dom'
const About = () => {
  return (
    <div>
      <Layout title={"About Us | Ecommerce"}>
        <div className="container  flex flex-wrap mb-4 justify-center  mx-auto rounded-xl p-5  border border-gray-800  mt-10">
          <img
            src="aboutus.jpg"
            className=" w-full h-50  lg:w-1/3 rounded-xl "
          />
          <div className="  w-full lg:w-1/2 lg:ml-5">
            <h1 className="text-3xl font-bold">About Us</h1>
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
    </div>
  );
};
Layout.defaultProps = {
  title: "About Us",
  description: "Ecommerce Store",
  keywords: "Ecommerce Store",
};
export default About;
