import styled from "styled-components";

export const AddressInput = ({address, onChange}) => {
  return(
    <Input type='text' placeholder='destination address 0x...' value={address} onChange={onChange}>
    </Input>
  )
}

const Input = styled.input`
  height: 20px;
  width: 170px;
  margin-top: 1.5em;
`