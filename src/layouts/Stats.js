import hero from '../images/hero.png';
import { useEffect, useRef } from 'react';
const Stats = ({ nft }) => {
  const statsRef = useRef(null);
  useEffect(() => {
    statsRef.current.classList.toggle('highlight');
    return () => {
      window.setTimeout(() => {
        statsRef.current.classList.toggle('highlight');
      }, 400);
    };
  }, [nft?.properties]);

  return (
    <div className="relative">
      <img className="nft-hero-photo" src={nft?.properties?.heroPhoto} />
      <div className="nft-hero-name">{nft?.properties.heroName}</div>
      <div className="nft-name">{nft?.name}</div>
      <div className="nft-stats highlight" ref={statsRef}>
        <div>🛡️ Armor: {nft?.properties?.armor}</div>
        <div>❤️ Health: {nft?.properties?.health}</div>
        <div>🗡️ Attack: {nft?.properties?.attack}</div>
        <div>✨ Crit: {nft?.properties?.crit}</div>
      </div>
      <img className="nft-pass" src={nft?.image} />
      <img className="inline-block" src={hero} />
    </div>
  );
};
export default Stats;
