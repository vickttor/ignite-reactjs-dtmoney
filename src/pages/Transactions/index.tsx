import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./style";
import {TransactionsContext } from "../../contexts/TransactionContext";
import { priceFormatter } from "../../utils/formatter";

import dayjs from "dayjs";

export function TransactionsPage() {
  const transactions  = useContextSelector(TransactionsContext, (ctx)=> {
    return ctx.transactions
  });

  return (
    <div>
      <Header/>
      <Summary/>

      <TransactionsContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
            {transactions?.map((transaction)=> {
              return (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "outcome" && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dayjs(transaction.created_at).format("DD/MM/YYYY")}</td>
              </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}