import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavBar";
import { UserRoleProvider } from "../pages/UserContext"
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserRoleProvider>
      <SessionProvider session={session}>
        <PopulatedNavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </UserRoleProvider>
  );
}
export default MyApp;
