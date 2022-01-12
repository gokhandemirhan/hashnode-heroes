import React, { useState, useEffect, useRef } from 'react';
import { NFTMetadata } from '@3rdweb/sdk';
import { getOwner } from './utils/interactions';
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
  const [tokens, setTokens] = useState<NFTMetadata[]>();
  const [isStarted, setIsStarted] = useState(false);
  const [chosen, setChosen] = useState<NFTMetadata | undefined>();
  const [enemy, setEnemy] = useState<NFTMetadata | undefined>();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    }
  }, [logs]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const results: Array<NFTMetadata> = await getOwner(walletAddress);
      setTokens(results);
      setLoading(false);
    }
    fetchData();
    if (audio.currentTime === 0) {
      audio.play();
    }
    return () => {
      audio.pause();
    };
  }, [walletAddress]);

  const updateLogs = (newLog: string) => {
    setLogs((logs) => [...logs, newLog]);
  };

  const updatePlayers = (player: Player, count: number) => {
    const attr = player.attributes;
    if (count % 2 === 0) {
      let newEnemy: NFTMetadata = {
        ...(enemy as NFTMetadata),
        properties: {
          ...attr,
        },
      };
      setEnemy(newEnemy);
    } else {
      let newChosen: NFTMetadata = {
        ...(chosen as NFTMetadata),
        properties: {
          ...attr,
        },
      };
      setChosen(newChosen);
    }
  };

  const clickStart = (
    player1: NFTMetadata | undefined,
    player2: NFTMetadata | undefined
  ) => {
    if (player1 && player2) {
      const p1Attr: any = { ...player1?.properties };
      const p2Attr: any = { ...player2?.properties };
      const p1 = new Player(p1Attr.heroName || 'Default name', p1Attr);
      const p2 = new Player(p2Attr.heroName || 'Default name', p2Attr);
      const game = new Game(p1, p2);
      if (!isStarted) {
        setLogs([]);
        game.start(updateLogs, updatePlayers);
        setIsStarted(true);
      } else {
        game.end(updateLogs);
        setIsStarted(false);
        setChosen(undefined);
      }
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto px-5">
        <div className="flex flex-row justify-between">
          {chosen && (
            <button
              className="z-20 text-white bg-gray-400 border-0 py-2 px-6 rounded"
              onClick={() => {
                setChosen(undefined);
              }}
            >
              ⬅️ Back
            </button>
          )}
          <button
            className="rounded text-white bg-blue-400 border-0 py-2 px-6 hover:bg-blue-600"
            onClick={() => {
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
          >
            🎵 Toggle music
          </button>
        </div>
        <div className="relative flex justify-center items-center w-full border-b-2 border-gray-300 my-6">
          <span className="absolute bg-gray-100 p-2 font-semibold">
            Use your Battle Pass to fight!
          </span>
        </div>
      </div>
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          {loading ? (
            <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Getting your battle passes <Loader />
            </div>
          ) : (
            <div className="container mx-auto">
              <div className="flex flex-row">
                {!chosen && (
                  <div>
                    <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                      Select your Battle Pass!
                    </div>
                    <div className="flex flex-wrap">
                      {tokens &&
                        tokens?.map((nft) => {
                          return (
                            <div
                              className="w-64 p-4 w-full border mr-2"
                              key={`nft_${nft.id}`}
                            >
                              <a className="block relative h-48 rounded overflow-hidden">
                                <img
                                  alt="ecommerce"
                                  className="object-cover object-center w-full h-full block"
                                  src={nft.image}
                                />
                              </a>
                              <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                  {nft?.properties?.heroName}
                                </h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                  {nft?.name}
                                </h2>
                                <div className="mt-1">
                                  <div>Armor: {nft?.properties?.armor}</div>
                                  <div>Health: {nft?.properties?.health}</div>
                                  <div>Attack: {nft?.properties?.attack}</div>
                                  <div>Crit: {nft?.properties?.crit}</div>
                                </div>
                                <button
                                  className="text-white bg-red-500 border-0 py-2 px-6 rounded"
                                  onClick={() => {
                                    setChosen(nft);
                                    setEnemy(
                                      topPosts[random(0, topPosts.length - 1)]
                                    );
                                  }}
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      {!tokens && (
                        <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                          You don't have any Battle Pass. Go to Mint page and
                          mint some!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {chosen && (
                <div className="flex flex-row justify-evenly">
                  <div className="relative">
                    <Stats nft={chosen} />
                  </div>
                  <div className="battle">
                    <div className="text-center">
                      <button
                        className={`text-white border-0 py-2 px-6 rounded ${
                          isStarted ? 'bg-blue-500' : 'bg-red-500'
                        } `}
                        onClick={() => {
                          clickStart(chosen, enemy);
                        }}
                      >
                        {isStarted ? 'Reset Battle' : '⚔️ Start Battle ⚔️'}
                      </button>
                      <div className="text-sm text-left battle-log grid grid-cols-1 divide-y">
                        {logs.map((l) => {
                          return (
                            <div
                              className="p-2"
                              dangerouslySetInnerHTML={{ __html: l }}
                            />
                          );
                        })}
                        <div ref={logRef} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Stats nft={enemy} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Play;
