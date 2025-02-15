import Head from "next/head";
import React from "react";
import { HOST_URL } from "@/lib/config";

const SEO = ({ title = "LockedIn" }) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
  </Head>
);

export default SEO;
