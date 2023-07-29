import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionContext";
import { useMemo } from "react";

interface ISummary {
  income: number;
  outcome: number;
  total: number;
}

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (ctx)=> {
    return ctx.transactions
  });

  const summary = useMemo(()=> {
    return transactions.reduce((acc, transaction)=>{
      switch(transaction.type) {
        case  "income":
          acc.income += transaction.price
          break;
        case "outcome":
          acc.outcome += transaction.price
      }
      acc.total = acc.income - acc.outcome;
      return acc;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    } as ISummary)
  }, [transactions])

  return summary;
}