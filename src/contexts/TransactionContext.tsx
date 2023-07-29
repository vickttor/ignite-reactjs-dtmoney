import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  created_at: string;
}

interface TransactionContextProps {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createNewTransaction: (data: ICreateNewTransaction) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextProps);

interface TransactionProviderProps {
  children: ReactNode
}

interface ICreateNewTransaction {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

export function TransactionProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response: AxiosResponse<ITransaction[]> = await api("/transactions",{
      params: {
        _sort:'created_at',
        _order: 'desc',
        q: query
      }
    });
    setTransactions(response.data);
  }, [])

  const createNewTransaction = useCallback(async (data: ICreateNewTransaction) => {
    const {description, price, category, type} = data;

    const response: AxiosResponse<ITransaction> = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      created_at: new Date()
    })

    setTransactions((prevState)=>[response.data, ...prevState]);

    toast.success("Transação criada!");
  }, [])

  useEffect(()=> {
    fetchTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createNewTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}