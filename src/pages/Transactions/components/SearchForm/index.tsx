import { useContextSelector } from "use-context-selector";
import { CircleNotch, MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer, SpinContainer } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionContext";
import { memo } from "react";

import * as z from "zod";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {

  const fetchTransactions = useContextSelector(TransactionsContext,  (ctx)=> {
    return ctx.fetchTransactions
  });

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  const handleSearchTransactions = handleSubmit( async (data) => {
    await fetchTransactions(data.query);
  })

  return (
  <SearchFormContainer
    onSubmit={handleSearchTransactions}
  >
    <input 
      type="text"
      placeholder="Busque por transações"
      {...register("query")}
    />
    <button type="submit" disabled={isSubmitting}>
      {!isSubmitting
        ? <MagnifyingGlass size={20} />
        : <SpinContainer>
          <CircleNotch size={20} weight="bold"/>  
        </SpinContainer>
      }

      Buscar
    </button>
  </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)