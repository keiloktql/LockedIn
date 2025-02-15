import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return <Component {...pageProps} />;
}
