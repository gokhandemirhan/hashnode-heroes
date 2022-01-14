# Hashnode Heroes

Welcome traveller! Have you got your battle pass? Good, head to `/play` for some action. 
If you don't have any pass go to [hashnode](hashnode.com) and get your favourite author and article to mint a battle pass.

## Have fun!
* [Click here to play](https://hashnode-heroes.netlify.app/)
* [See the hasnode blogpost](post link)
* [See the technical post about implementation](technical link)

--
### What is this project?
This is my take on [thirdweb x Hashnode Hackathon](https://townhall.hashnode.com/thirdweb-hackathon) to jump start on web3 development. I wanted to explore smart contracts and NFT but create something fun rather than all the things around.


Since it is a hackaton between two platforms I wanted to utilize both. You can mint and NFT (a battle pass) from a hashnode blog post, then use it to enter a battle with the top 6 voted blog posts of hashnode. See the video below for some action!

https://www.youtube.com/watch?v=LnkMqu7qK_g

# Recap
### What did I learn?
* what is smart contract
* what is NFT
* thirdweb API (solid work)
* Have lots of fun
* Remembered old days I was playing WoW :(

### What did I use?
* tailwind
* react
* react-router
* graphql
* thirdweb library
* ether.js

### What could be improved?
* Game logic is pretty static now, I want to move it to block chain as well
* Now I am using **NFT collection** that results minting the NFTs to the admin wallet, then I am transferring them to the logged in user. That is not feasible as the transfer fee is paid by minter. I can switch this to **NFT Drop** module
* Overall design can be improved to make it more like a game
* Code needs refactoring, there are JS and TSX files mixed with each other :sad:
