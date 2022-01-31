import { CardType } from "@common/constants";
import NextBtn from "@components/button/NextBtn";
import Card from "@components/card";
import { useCardData } from "@context/cardData";
import { FormEvent, FormEventHandler, useState } from "react";
import CardExpirationInput from "./CardExpirationInput";
import CardNumberInput from "./CardNumberInput";
import CardOwnerNameInput from "./CardOwnerNameInput";
import CardPasswordInput from "./CardPasswordInput";
import SecurityCodeInput from "./SecurityCodeInput";

const inputStateMap = new Map<string, IInputState>();

const AddCardForm = ({ onSubmit, className }: AddCardFormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const [isValidForm, setIsValidForm] = useState(false);
  const { cardData, setCardData } = useCardData();

  const onChangeInputState: OnChangeInputState = (inputState: IInputState) => {
    inputStateMap.set(inputState.displayName, { ...inputState });
    setIsValidForm(
      Array.from(inputStateMap.entries()).every(([_, value]) => value.isValid)
    );

    console.log(cardData, inputState);

    setCardData({
      cardNumber:
        inputStateMap.get(CardNumberInput.displayName)?.displayValue ?? "",
      expired:
        inputStateMap.get(CardExpirationInput.displayName)?.displayValue ?? "",
      userName:
        inputStateMap.get(CardOwnerNameInput.displayName)?.displayValue ?? "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Card type={CardType.small} cardData={cardData} />
      <CardNumberInput onChangeInputState={onChangeInputState} />
      <CardExpirationInput onChangeInputState={onChangeInputState} />
      <CardOwnerNameInput onChangeInputState={onChangeInputState} />
      <CardPasswordInput onChangeInputState={onChangeInputState} />
      <SecurityCodeInput onChangeInputState={onChangeInputState} />
      <NextBtn disabled={!isValidForm} />
    </form>
  );
};

export type OnChangeInputState = (inputState: IInputState) => void;

export interface IInputState {
  value: string;
  displayValue: string;
  isValid: boolean;
  displayName: string;
}

export interface AddCardFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

export default AddCardForm;
