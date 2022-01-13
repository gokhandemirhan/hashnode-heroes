import React, { useState, useEffect } from 'react';
import slug from '../images/slug.png';
import Card from './Card';
import CardHorizontal from './CardHorizontal';
import Loader from './Loader';
import placeholder from '../images/placeholder.png';

const Hero = ({
  walletAddress,
  connectWalletPressed,
  onMintPressed,
  isMinting,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPostData = (e) => {
    e.preventDefault();
    const { slug } = e.target.elements;
    if (slug.value !== '') {
      setLoading(true);
      fetch(`https://api.hashnode.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query ($slug: String!){
            post(slug:$slug, hostname:""){
              title,
              followersCount,
              totalReactions,
              isFeatured,
              replyCount,
              responseCount,
              popularity
              dateAdded,
              coverImage,
              brief,
              slug,
              reactions{
                reaction{
                  name
                  image
                }
                count
              }
              author{
                username,
                photo
              }
            }
          }`,
          variables: { slug: slug.value },
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          console.log(res);
          setData(res.data);
        });
    }
  };

  const generateReactions = (data) => {
    return (
      <div className="flex flex-wrap">
        {data.map((r, i) => {
          return (
            <div className="p-2 w-1/6" key={`r_${i}`}>
              <a className="inline-flex items-center">
                <img
                  alt="blog"
                  src={r.reaction.image}
                  className="w-8 h-8  flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-3">
                  <span className="title-font font-medium text-gray-900">
                    {r.count}
                  </span>
                </span>
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="text-gray-600 body-font mb-28">
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          {data?.post ? (
            <div>
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Here is your NFT <br />
                <span className="text-green-700">
                  check it's details and Mint it!
                </span>
              </h1>
              <p className="mb-8 leading-relaxed">
                Here are your posts reactions. These will be used to create 4
                attributes for your hero. See the description of each attribute
                below
              </p>

              <div className="mb-8">
                {generateReactions(data?.post?.reactions)}
              </div>

              <div className="flex flex-wrap">
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-4 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                    Health
                  </h2>
                  <p className="leading-relaxed text-base mb-4">
                    Health of your hero. If it reaches to zero during fight you
                    die!
                  </p>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-4 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                    Armor
                  </h2>
                  <p className="leading-relaxed text-base mb-4">
                    Extra health for your hero. If hero has armor it will get
                    the damage first.
                  </p>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-4 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                    Attack
                  </h2>
                  <p className="leading-relaxed text-base mb-4">
                    Attack power of your hero. This is how much you will damage
                    the opponent.
                  </p>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-4 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                    Crit ratio
                  </h2>
                  <p className="leading-relaxed text-base mb-4">
                    Ratio of how many of your attacks will do extra damage.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-center items-center w-full border-b-2 border-gray-300 my-12">
                <span className="absolute bg-gray-100 p-2 font-semibold">
                  Mint your Battle Pass free!
                </span>
              </div>
              <div className="flex justify-center mb-8">
                {isMinting && <Loader />}
                {!walletAddress && (
                  <button
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={connectWalletPressed}
                    data-splitbee-event="Connect wallet"
                  >
                    {walletAddress.length > 0 ? (
                      'Connected: ' +
                      String(walletAddress).substring(0, 6) +
                      '...' +
                      String(walletAddress).substring(38)
                    ) : (
                      <span>Connect Wallet to Mint</span>
                    )}
                  </button>
                )}
                {!isMinting && walletAddress && (
                  <button
                    data-splitbee-event="Mint NFT"
                    className="ml-4 inline-flex text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                    onClick={() => onMintPressed(data)}
                  >
                    Mint
                  </button>
                )}
                <button
                  className="ml-4 inline-flex text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg"
                  onClick={() => {
                    setData(null);
                  }}
                >
                  Check another post
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Create your NFT Card and <br />
                <span className="text-red-700">battle with Hashnode Team!</span>
              </h1>
              <p className="mb-8 leading-relaxed">
                Enter your post URL to get data about your blog post, then Mint
                it as NFT card to start the game.
              </p>
              <form onSubmit={getPostData} className="w-full">
                <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                  <div className="relative flex-grow w-full">
                    <input
                      type="text"
                      id="full-name"
                      name="slug"
                      placeholder="Enter post slug"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    data-splitbee-event="Fetch post"
                  >
                    Fetch
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          {data?.post ? (
            <div className="relative">
              <p className="text-xl mb-4">
                {' '}
                Your hero:{' '}
                <span className="font-bold">{data?.post.author.username}</span>
              </p>
              <img
                src={data?.post?.author.photo}
                className="rounded-full w-2/6 p-2 nft-card-hero"
              />
              <p className="text-xl mb-12 mt-4">Your battle pass:</p>
              <img
                className="object-cover object-center rounded p-2 nft-card-pass"
                alt="hero"
                src={
                  data?.post?.coverImage ? data?.post?.coverImage : placeholder
                }
              />
            </div>
          ) : (
            // <div>
            //   <Card data={data} />
            //   <CardHorizontal data={data} />
            // </div>
            <div>
              {loading ? (
                <Loader />
              ) : (
                <div>
                  <div className="title-font text-xl mb-4 font-medium text-gray-900">
                    Enter your post slug to get details
                  </div>
                  <img src={slug} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
