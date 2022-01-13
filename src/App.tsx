import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Loader from '../src/layouts/Loader';
import Header from './layouts/Header';
import Hero from './layouts/Hero';
import Footer from './layouts/Footer';
import Alert from './layouts/Alert';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Play from './Play';
import History from './History';

import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  random,
  transferNFT,
} from './utils/interactions';
import Modal from './layouts/Modal';

interface Reaction {
  count: number;
  reaction: ReactionItem;
}
interface ReactionItem {
  image: string;
  name: string;
}

declare var window: any;

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [lastMinted, setLastMinted] = useState<object | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status || '');
    }
    fetchData();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
    addWalletListener();
  };

  const onMintPressed = async (data: any) => {
    console.log(data);
    setIsMinting(true);
    const { author, title, coverImage, slug } = data.post;
    const metadata = {
      name: slug,
      description: title,
      image: coverImage,
      properties: {
        ...generateStats(data),
        heroName: author.username,
        heroPhoto: author.photo,
      },
    };
    console.log('On mint pressed', metadata);
    const token = await mintNFT(metadata);
    console.log('Minted', name);
    const { transactionHash } = await transferNFT(walletAddress, token);
    setIsMinting(false);
    setStatus(`Minted ${token.name}`);
    setLastMinted(token);
  };

  const generateStats = (data: any) => {
    const { reactions, isFeatured } = data.post;
    let reactionsObject: any = {};
    reactions.map((r: Reaction) => {
      reactionsObject[r.reaction.name] = r.count || 1;
    });

    let health = 1000,
      armor = 10,
      attack = 1,
      crit = 0;

    health = Math.floor(
      (health / reactionsObject.CLAP) *
        reactionsObject.TAKE_MY_MONEY *
        random(1, 10) +
        reactionsObject.LOVE * random(0, reactionsObject.HEART_EYES)
    );
    armor = Math.floor(armor + random(0, reactionsObject.THUMBS_UP));
    attack = Math.floor(
      attack * reactionsObject.PARTY * random(1, reactionsObject.ROCKET) +
        reactionsObject.TROPHY * random(1, 100)
    );
    crit =
      (Math.floor(reactionsObject.BEER * reactionsObject.UNICORN) *
        (isFeatured ? random(0, 20) : 1)) /
      1000;
    if (attack > health) {
      attack = attack / 2;
    }
    console.log({ health, armor, attack, crit });
    return { health, armor, attack, crit };
  };

  const startClicked = () => {
    // e.preventDefault();
    setLastMinted(null);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: any) => {
        if (accounts.length > 0 && walletAddress !== accounts[0]) {
          setWalletAddress(accounts[0]);
          setStatus('Wallet address changed!');
        } else {
          setWalletAddress('');
          setStatus('🦊 Connect to Metamask using the top right button.');
        }
      });
    } else {
      setStatus('Ethereum not available, please install Metamask.');
    }
  }

  return (
    <div className="">
      <BrowserRouter>
        <Header
          walletAddress={walletAddress}
          connectWalletPressed={connectWalletPressed}
        />
        {status && <Alert message={status} />}
        {lastMinted && (
          <Modal
            message={`Your NFT is minted! Go to /play to start the game.`}
            token={lastMinted}
            startClicked={startClicked}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Hero
                walletAddress={walletAddress}
                connectWalletPressed={connectWalletPressed}
                onMintPressed={onMintPressed}
                isMinting={isMinting}
              />
            }
          />
          <Route
            path="/play"
            element={<Play walletAddress={walletAddress} />}
          />
          <Route
            path="/history"
            element={<History walletAddress={walletAddress} />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
