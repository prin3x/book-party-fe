import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../config/axios.config";
import { UserProvider } from "../context/UserContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
