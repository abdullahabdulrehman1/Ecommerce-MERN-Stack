// import React, { Children } from 'react';
import React from "react";

import Footer from "./footer";
import Header from "./header";
import { Helmet } from "react-helmet";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Layout({ children, title, auther, description, keywords }) {
  return (
    <div>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />

          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={auther} />

          <title>{title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <Header />

      <main>{children}</main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Layout;
