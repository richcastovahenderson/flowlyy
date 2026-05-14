"use client"
import AddTransaction from "@/components/page-2/header";
import AmountInput from "@/components/page-2/amount-numpad";
import TransactionForm from "@/components/page-2/transaction-form";
import SaveButton from "@/components/page-2/save-button";
export default function Transaction(){
  return(
    <div className="p-4">
      <div>
        <AddTransaction>
        </AddTransaction>
      </div>

      <div>
        <AmountInput>
        </AmountInput>
      </div>

      <div>
        <TransactionForm>
        </TransactionForm>
      </div>

      <div>
        <SaveButton>
        </SaveButton>
      </div>
    </div>
  )
}