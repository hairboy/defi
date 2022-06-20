import styled from "styled-components";

export const AmountInput = ({amount, onChange}) => {
  return(
    <Input type='text' placeholder='amount tokens' value={amount} onChange={onChange}>
    </Input>
  )
}

const Input = styled.input`
  height: 20px;
  width: 170px;
  margin-top: 1.5em;
`