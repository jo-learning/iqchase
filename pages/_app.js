import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   // Start the Socket.io server by calling the API route
  //   fetch("/api/socket");
  // }, []);
  return <SessionProvider><Component {...pageProps} /></SessionProvider>;
}
