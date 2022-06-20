import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import Web3 from "web3";
import styled from "styled-components";
import Moralis from "moralis";
import { useWeb3Transfer } from "react-moralis";

import { SendTokenButton } from "../SentTokenButton/SendTokenButton";
import { AmountInput } from "../AmountInput/AmountInput";
import { AddressInput } from "../AddressInput/AddressInput";
import ERC20ABI from '../../erc20ABI.json'

const balanceOfABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];
const tokenAbi = ERC20ABI

export const BalanceCard = () => {
  const [balance, setBalance] = useState(null)
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')

  const { account } = useMetaMask();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/a36fde97b53f437883e11f2dc99badff'));
  const tokenAddress = '0x7A51C913CCf62AD687b04b4D0CD81B9172721a11'
  const walletAddress = account
  const contract = new web3.eth.Contract(balanceOfABI, tokenAddress)

  useEffect(() => {
    const getTokenBalance = async () => {
      const balance = await contract.methods.balanceOf(walletAddress).call();
      const formattedBalance = ethers.utils.formatEther(balance)
            setBalance(Math.round(+formattedBalance))
    }
    getTokenBalance()
  }, [account])

  const recepientAddress = address

  const handleChangeAmount= (e) => {
    setAmount(e.target.value)
  }

  const handleChangeAddress= (e) => {
    setAddress(e.target.value)
  }

  // const sendTokens = (e) => {
  //   if (+amount) {
  //     const { fetch } = useWeb3Transfer({
  //       amount: Moralis.Units.Token(20, 18),
  //       receiver: "address",
  //       type: "erc20",
  //       contractAddress: tokenAddress,
  //     });
  //     setAmount('')
  //     setAddress('')
  //   } else console.error('amount must be a number')
  // }

  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.Token(20, 6),
    receiver: address,
    type: "erc20",
    contractAddress: tokenAddress,
  });
  return(
    <Container>
      <BalanceBlock>
        <p>Your wallet's balance: </p>
        <Balance>&nbsp;{balance}</Balance>
      </BalanceBlock>
      <SendTokensBlock>
        <AmountInput amount={amount} onChange={handleChangeAmount}/>
        <AddressInput address={address} onChange={handleChangeAddress}/>
        {error && console.log('error with fetch')}
        <SendTokenButton sendTokens={() => fetch()} disabled={isFetching}/>
      </SendTokensBlock>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const BalanceBlock = styled.div`
  display: flex;
  flex-direction: row;
`

const SendTokensBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const Balance = styled.p`
  color: red;
`

