import { ThemeProvider } from "styled-components";
import { TransactionProvider } from "./contexts/TransactionContext";
import { TransactionsPage } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
      <TransactionProvider>
        <TransactionsPage/> 
      </TransactionProvider>
      <ToastContainer />
    </ThemeProvider>
  )
}

