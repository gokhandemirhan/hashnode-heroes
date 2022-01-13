import React, { useState, useEffect, useRef } from 'react';
import { NFTMetadata } from '@3rdweb/sdk';
import {
  BlockTag,
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { getHistory, getOwner } from './utils/interactions';
import Loader from '../src/layouts/Loader';
import Stats from './layouts/Stats';
import { Game, Player } from './utils/game';
import { topPosts } from './utils/top';
import { random } from './utils/interactions';
interface Play {
  walletAddress: string;
}
interface PlayerAttributes {
  health: number;
  armor: number;
  crit: number;
  attack: number;
}

const audio = new Audio('https://www.gokhandemirhan.dev/media/tavern.mp3');
audio.volume = 0.2;

const Play = ({ walletAddress }: Play) => {
  const [history, setHistory] = useState<TransactionResponse[]>();
  const [isStarted, setIsStarted] = useState(false);
  const [chosen, setChosen] = useState<NFTMetadata | undefined>();
  const [enemy, setEnemy] = useState<NFTMetadata | undefined>();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const results: Array<TransactionResponse> = await getHistory(
        walletAddress
      );
      setHistory(results);
      console.log(results);
      setLoading(false);
    }
    fetchData();
  }, [walletAddress]);

  return (
    <section className="text-gray-600 body-font mb-28">
      <div className="container mx-auto px-5">
        <div className="relative flex justify-center items-center w-full border-b-2 border-gray-300 my-6">
          <span className="absolute bg-gray-100 p-2 font-semibold">
            See your transaction history!
          </span>
        </div>
      </div>
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          {loading ? (
            <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Getting your history <Loader />
            </div>
          ) : (
            <div className="container mx-auto">
              <div className="flex flex-row">
                <div>
                  <div className="flex flex-wrap">
                    <ul className="list-disc">
                      {history &&
                        history?.map((history) => {
                          return (
                            <li>
                              <a
                                target="_blank"
                                href={`https://rinkeby.etherscan.io/tx/${history.hash}`}
                              >
                                {history.hash}
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                    {(!history || history.length === 0) && (
                      <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        No history found :(
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Play;
