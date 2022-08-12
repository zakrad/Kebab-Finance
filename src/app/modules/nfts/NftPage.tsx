/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useWeb3} from 'src/app/providers/web3'
import {PageTitle} from 'src/_metronic/layout/core'
import getNfts, {getTotalItem} from '../services/quicknode.js'
import Pagination from './components/Pagination'
import {NftCard} from './components/Nft'

let PageSize = 12

const NftWrapper: FC = () => {
  const [nfts, setNfts] = useState<Array<any>>([])
  const [length, setLength] = useState<any>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const address = '0xc86B12d850FdBBF3260a7BAAE862F85857aAdBBa'

  useEffect(() => {
    async function getTotalItems() {
      try {
        setLength(await getTotalItem())
      } catch (e) {
        console.log(e)
      }
    }
    getTotalItems()
  }, [])

  useEffect(() => {
    async function getNft(currentPage: any) {
      try {
        // setNfts(await getNfts(currentPage))
        setNfts([
          {
            name: 'DeadFellazToken #7617',
            collectionTokenId: '7617',
            collectionName: 'DeadFellazToken',
            imageUrl:
              'https://gateway.pinata.cloud/ipfs/QmWkNNTVp7L4tWJioHm5djksFoMkSMReMGBmMxEi5GgXQ6',
            collectionAddress: '0x2acAb3DEa77832C09420663b0E1cB386031bA17B',
            traits: [
              {
                value: 'Purple',
                trait_type: 'Background',
              },
              {
                value: 'Spiked Jacket',
                trait_type: 'Body',
              },
              {
                value: 'Fresh',
                trait_type: 'Body Grade',
              },
              {
                value: 'Spooky',
                trait_type: 'Eyes',
              },
              {
                value: 'Fresh',
                trait_type: 'Eyes Grade',
              },
              {
                value: 'Curtains',
                trait_type: 'Head',
              },
              {
                value: 'Rotten',
                trait_type: 'Head Grade',
              },
              {
                value: 'Surprised',
                trait_type: 'Mouth',
              },
              {
                value: 'Damaged',
                trait_type: 'Mouth Grade',
              },
              {
                value: 'Nose Normal',
                trait_type: 'Nose',
              },
              {
                value: 'Fresh',
                trait_type: 'Nose Grade',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              'A collection of 10,000 undead NFTs minted on the Ethereum blockchain. Each unique Deadfella is randomly generated from a combination of over 400 individually drawn traits, including over 50 different outfits. Deadfellaz each have different eyes, noses, mouths, heads and bodies - with no traits explicitly gendered to allow all genders to find representation',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'Incognito #5125',
            collectionTokenId: '5125',
            collectionName: 'Incognito',
            imageUrl:
              'https://quicknode.mypinata.cloud/ipfs/QmQM7btqM2AXTBtLqEScUifjigMapAofyiYFRoQKxuFw6x/5125.png',
            collectionAddress: '0x3F4a885ED8d9cDF10f3349357E3b243F3695b24A',
            traits: [
              {
                value: 'White Plastic',
                trait_type: 'material',
              },
              {
                value: 'Grey Surgical mask',
                trait_type: 'mouth',
              },
              {
                value: 'ICON Chain',
                trait_type: 'neck',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              '👤 The Incognito (ICON) project was created by NFT collectors, artists, and professionals with the goal of bringing something unique and special to the NFT community.\n\n The collection consists of 10,000 randomly generated and unique characters living on the Ethereum blockchain as ERC-721 tokens.\n\n ℹ️ For more information, visit our [website](https://incognitonft.com) or join our amazing [Discord community](https://discord.gg/incognito).',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'Incognito #2425',
            collectionTokenId: '2425',
            collectionName: 'Incognito',
            imageUrl:
              'https://quicknode.mypinata.cloud/ipfs/QmXYPehwbP9rRq5FFmSrYoaUVtgzdJcZGR5wNR6J3txATG/2425.mp4',
            collectionAddress: '0x3F4a885ED8d9cDF10f3349357E3b243F3695b24A',
            traits: [
              {
                value: 'Silver Hoop',
                trait_type: 'earring',
              },
              {
                value: 'Thieves Mask',
                trait_type: 'eyes',
              },
              {
                value: 'Mind Stone',
                trait_type: 'face',
              },
              {
                value: 'Gold',
                trait_type: 'material',
              },
              {
                value: 'Black Mustache',
                trait_type: 'mouth',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              '👤 The Incognito (ICON) project was created by NFT collectors, artists, and professionals with the goal of bringing something unique and special to the NFT community.\n\n The collection consists of 10,000 randomly generated and unique characters living on the Ethereum blockchain as ERC-721 tokens.\n\n ℹ️ For more information, visit our [website](https://incognitonft.com) or join our amazing [Discord community](https://discord.gg/incognito).',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'Incognito #8143',
            collectionTokenId: '8143',
            collectionName: 'Incognito',
            imageUrl:
              'https://quicknode.mypinata.cloud/ipfs/QmQM7btqM2AXTBtLqEScUifjigMapAofyiYFRoQKxuFw6x/8143.png',
            collectionAddress: '0x3F4a885ED8d9cDF10f3349357E3b243F3695b24A',
            traits: [
              {
                value: 'Black Hoodie',
                trait_type: 'body',
              },
              {
                value: 'Black Hoop',
                trait_type: 'earring',
              },
              {
                value: 'Ski Goggles',
                trait_type: 'eyes',
              },
              {
                value: 'White Plastic',
                trait_type: 'material',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              '👤 The Incognito (ICON) project was created by NFT collectors, artists, and professionals with the goal of bringing something unique and special to the NFT community.\n\n The collection consists of 10,000 randomly generated and unique characters living on the Ethereum blockchain as ERC-721 tokens.\n\n ℹ️ For more information, visit our [website](https://incognitonft.com) or join our amazing [Discord community](https://discord.gg/incognito).',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'KIA #5449',
            collectionTokenId: '5449',
            collectionName: 'KIA',
            imageUrl:
              'https://quicknode.mypinata.cloud/ipfs/QmT85uXhCKYv3cxkh9HtP1o83KFzL626WPfMUtd94B82Bv',
            collectionAddress: '0x3f5FB35468e9834A43dcA1C160c69EaAE78b6360',
            traits: [
              {
                value: 'None',
                trait_type: 'Accesories',
              },
              {
                value: 'Navy Dress',
                trait_type: 'Body',
              },
              {
                value: 'Bitcoins',
                trait_type: 'Eyes',
              },
              {
                value: 'None',
                trait_type: 'Eyewear',
              },
              {
                value: 'Blush',
                trait_type: 'Face',
              },
              {
                value: 'Flaming',
                trait_type: 'Fur',
              },
              {
                value: 'Fireman Helmet',
                trait_type: 'Head',
              },
              {
                value: 'Cheeky',
                trait_type: 'Mouth',
              },
              {
                value: 'Field Agent',
                trait_type: 'Role',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              'A total of 10,000 unique Koalas are fully trained and prepared to deploy. They are masters of disguise, sifting their way through the general public without a shred of evidence left behind.',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'MoonCatAcclimator #24681',
            collectionTokenId: '24681',
            collectionName: 'MoonCatAcclimator',
            imageUrl: 'https://api.mooncat.community/image/0x009c673a4c',
            collectionAddress: '0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69',
            traits: [
              {
                value: '#146: Black Degenesis',
                trait_type: 'Accessory',
              },
              {
                value: '#182: toasted pastry cat',
                trait_type: 'Accessory',
              },
              {
                value: 'Rescue',
                trait_type: 'Classification',
              },
              {
                value: 'Pale Fuchsia Tortie',
                trait_type: 'Coat',
              },
              {
                value: 'Fuchsia',
                trait_type: 'Coat Hue',
              },
              {
                value: 'Tortie',
                trait_type: 'Coat Pattern',
              },
              {
                value: 'Pale',
                trait_type: 'Coat Saturation',
              },
              {
                value: 'Grumpy',
                trait_type: 'Expression',
              },
              {
                value: 'No',
                trait_type: 'Has Clones?',
              },
              {
                value: 'No',
                trait_type: 'Has Mirrors?',
              },
              {
                value: 'No',
                trait_type: 'Has Twins?',
              },
              {
                value: 336,
                max_value: 359,
                trait_type: 'Hue',
              },
              {
                value: '0x009c673a4c',
                trait_type: 'MoonCat Id',
              },
              {
                value: 'No',
                trait_type: 'Only Child?',
              },
              {
                value: 'Standing',
                trait_type: 'Pose',
              },
              {
                value: 24681,
                max_value: 25439,
                trait_type: 'Rescue Index',
              },
              {
                value: '2021',
                trait_type: 'Rescue Year',
              },
              {
                value: 2,
                trait_type: 'Total Accessories',
              },
              {
                value: 'No',
                trait_type: 'isNamed',
              },
              {
                value: 'Minted',
                trait_type: 'lootprint',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              'An Adorable Pale Fuchsia/Magenta Grumpy Tortie [MoonCat](https://purrse.mooncat.community/24681).',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'MutantApeYachtClub #24912',
            collectionTokenId: '24912',
            collectionName: 'MutantApeYachtClub',
            imageUrl:
              'https://quicknode.mypinata.cloud/ipfs/QmdZfc2mdYgU8rShtK2ToP2LYT1PDkcaiFWTszSdkoS5oX',
            collectionAddress: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
            traits: [
              {
                value: 'M1 New Punk Blue',
                trait_type: 'Background',
              },
              {
                value: 'M1 Black Holes T',
                trait_type: 'Clothes',
              },
              {
                value: 'M1 Gold Stud',
                trait_type: 'Earring',
              },
              {
                value: 'M1 Eyepatch',
                trait_type: 'Eyes',
              },
              {
                value: 'M1 Brown',
                trait_type: 'Fur',
              },
              {
                value: 'M1 Spinner Hat',
                trait_type: 'Hat',
              },
              {
                value: 'M1 Bored Cigar',
                trait_type: 'Mouth',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description: 'MutantApeYachtClub',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'GalacticApes #5798',
            collectionTokenId: '5798',
            collectionName: 'GalacticApes',
            imageUrl:
              'https://galacticapes.mypinata.cloud/ipfs/QmPqKt7guhrCNS6DWy7gNeyR9ia7UgijVj8evWcUjFiQrc/5799.png',
            collectionAddress: '0x12d2D1beD91c24f878F37E66bd829Ce7197e4d14',
            traits: [
              {
                value: 'Green',
                trait_type: 'Background',
              },
              {
                value: 'Dead',
                trait_type: 'Eyes',
              },
              {
                value: 'Chimpanzee',
                trait_type: 'Genus',
              },
              {
                value: 'Plasma Crown',
                trait_type: 'Head',
              },
              {
                value: 'Terminator',
                trait_type: 'Mouth',
              },
              {
                value: 'Scrapper',
                trait_type: 'Type',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description: 'GalacticApes',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'BYOPill #4375',
            collectionTokenId: '4375',
            collectionName: 'BYOPill',
            imageUrl:
              'https://byopills.mypinata.cloud/ipfs/QmayxD3FABrY9ha19tBzo5Wtp3HgwyQ7bKNmVTQncNPF2q',
            collectionAddress: '0xbD275ce24f32d6cE4e9d9519C55ABe9Bc0ed7fCf',
            traits: [
              {
                value: 'Pink',
                trait_type: 'Background',
              },
              {
                value: 15,
                trait_type: 'Heightened Senses',
              },
              {
                value: 'Radioactive Red Droplets',
                trait_type: 'Ingredient',
              },
              {
                value: 56,
                trait_type: 'Nightmares',
              },
              {
                value: 'Reflective',
                trait_type: 'Pill Bottom',
              },
              {
                value: 'Yellow Cap',
                trait_type: 'Pill Top',
              },
              {
                value: 59,
                trait_type: 'Precognitive Visions',
              },
              {
                value: '3',
                trait_type: 'Trip Effects',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description:
              '[Animation (.mp4)](https://byopills.mypinata.cloud/ipfs/QmUEVw2xy8UgK3wmvEdWV8iSHrYXZGAhY47VzLu32AZxsu)\n\n[Model (.glb)](https://byopills.mypinata.cloud/ipfs/QmcrGkdu1yqJnTsY43TVu5CQEPQhZEemspXtK6mCsay8g8})\n\n[Image (.png)](https://byopills.mypinata.cloud/ipfs/QmayxD3FABrY9ha19tBzo5Wtp3HgwyQ7bKNmVTQncNPF2q)\n\n',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'WickedApes #3790',
            collectionTokenId: '3790',
            collectionName: 'WickedApes',
            imageUrl: 'https://ipfs.io/ipfs/Qme84NNntXqJBnLDRdpCUxRQri3KqbLjT6qgeERTrZ6h4U',
            collectionAddress: '0xbe6e3669464E7dB1e1528212F0BfF5039461CB82',
            traits: [
              {
                value: 'Indigo',
                trait_type: 'Background',
              },
              {
                value: 'Pink',
                trait_type: 'Bones',
              },
              {
                value: 'Bandana Blue',
                trait_type: 'Hat',
              },
              {
                value: 'Bubblegum',
                trait_type: 'Mouth',
              },
            ],
            chain: 'ETH',
            network: 'mainnet',
            description: 'WickedApes',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'Plasma Bears #57896044618658097711785492504343953929357251268187789727435788863410710522792',
            collectionTokenId:
              '57896044618658097711785492504343953929357251268187789727435788863410710522792',
            collectionName: 'Plasma Bears',
            imageUrl: null,
            collectionAddress: '0x909899c5dBb5002610Dd8543b6F638Be56e3B17E',
            traits: [],
            chain: 'ETH',
            network: 'mainnet',
            description: 'Plasma Bears',
            currentOwner: '0xfc811061134fA6cCFd22f56Cc91bf6450BeA2D01',
          },
          {
            name: 'HEX TOYS #10045',
            collectionTokenId: '10045',
            collectionName: 'HEX TOYS',
            imageUrl: null,
            collectionAddress: '0x5c3DAa7a35D7Def65BFD9e99120D5Fa07F63F555',
            traits: [],
            chain: 'ETH',
            network: 'mainnet',
            description: 'HEX TOYS',
            currentOwner: '0xa7633f37FEEfaCAc8F251b914e92Ff03d2acf0f2',
          },
        ])
      } catch (e) {
        console.log(e)
      }
    }
    getNft(currentPage)
  }, [currentPage])

  return (
    <>
      <PageTitle children={'Your NFTs'} />
      <Pagination
        currentPage={currentPage}
        totalCount={length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />

      <div className='row'>
        {nfts.map((nft) => {
          return (
            <div className='col-lg-3 p-1 ribbon ribbon-top ribbon-vertical mt-3'>
              <div className='ribbon-label bg-active-secondary text-active-inverse-secondary active'>
                {nft.name.length > 30 ? nft.name.substring(0, 30) + '...' : nft.name}
              </div>
              <NftCard
                imageUrl={nft.imageUrl}
                name={nft.name}
                collectionName={nft.collectionName}
                collectionTokenId={nft.collectionTokenId}
                collectionAddress={nft.collectionAddress}
                description={nft.description}
                traits={nft.traits}
              />
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  )
}
const NftPage: FC = () => {
  const {provider} = useWeb3()

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts()
    console.log(accounts[0])
  }

  if (provider) {
    getAccounts()
  }

  return (
    <>
      <NftWrapper />
    </>
  )
}

export {NftPage}
