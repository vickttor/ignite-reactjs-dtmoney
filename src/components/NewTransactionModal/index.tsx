import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleUp, X } from "phosphor-react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionContext";

import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string().min(3).max(100),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {

  const createNewTransaction = useContextSelector(TransactionsContext, (ctx)=> {
    return ctx.createNewTransaction
  });

  const {
    register, 
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<newTransactionFormInputs>({
    defaultValues: {
      type:'income'
    },
    resolver: zodResolver(newTransactionFormSchema)
  })

  const handleCreateNewTransaction = handleSubmit(async (data) => {
    createNewTransaction(data);
    reset();
  });

  return (
    <Dialog.Portal>
      <Overlay/>
      <Content>
        <Dialog.Title>Nova Transição</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleCreateNewTransaction}>
          <input 
            type="text" 
            placeholder="Descrição" 
            required 
            {...register("description")}
          />

          <input 
            type="number" 
            placeholder="Preço" 
            required 
            {...register("price", {valueAsNumber:true})}
          />

          <input 
            type="text" 
            placeholder="Categoria" 
            required 
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({field})=> (
              <TransactionType {...field} onValueChange={field.onChange}>
                <TransactionTypeButton value="income" variant="income">
                  <ArrowCircleUp size={24}/>
                  Entrada
                </TransactionTypeButton>
    
                <TransactionTypeButton value="outcome" variant="outcome">
                  <ArrowCircleUp size={24}/>
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />
          
          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
