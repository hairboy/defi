import styled from "styled-components";

export const SendTokenButton = ({sendTokens}) => {

  const handleSendTokens = () => sendTokens()

  return (
    <>
      <SendTokenButtonStyled onClick={handleSendTokens}>
        Send your tokens, dude
        <Description>(yeah i know its very ugly button)</Description>
      </SendTokenButtonStyled>
    </>
  )
}
  const SendTokenButtonStyled = styled.button`
    height: 60px;
    width: 100px
  `

  const Description = styled.p`
    font-size: 8px
  `