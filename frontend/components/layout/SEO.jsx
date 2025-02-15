import Head from "next/head";
import React from "react";

const SEO = ({ title = "LockedIn" }) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
  </Head>
);

export default SEO;
