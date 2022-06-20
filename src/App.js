import styled from 'styled-components'
import { useMetaMask } from "metamask-react";

import { Puff } from  'react-loader-spinner'
import {BalanceCard} from "./components/BalanceCard/BalanceCard";
import {ConnectMetamaskButton} from "./components/ConnectButton/ConnectButton";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import  Mouse from './img/Mouse.png'


export function App() {
  const { status, connect } = useMetaMask();

  const checkMetamask = () => {
    switch (status) {
      case "initializing":
        return <div>Synchronisation with MetaMask ongoing...</div>;

      case"unavailable":
        return <div>MetaMask not available :(</div>;

      case "notConnected":
        return <ConnectMetamaskButton onClick={connect}>Connect MetaMask</ConnectMetamaskButton>;

      case "connecting":
        return <Puff
          height="100"
          width="100"
          color='salmon'
          ariaLabel='loading'
        />;

      case "connected":
        return <BalanceCard />;
    }
  }

  return (
    <Container>
      {checkMetamask()}
    </Container>
  );
}

const Container = styled.div`
  background-color: salmon;
  min-height: 100vh;
  background-repeat: no-repeat;
  display: flex;
  overflow-y: hidden;
`