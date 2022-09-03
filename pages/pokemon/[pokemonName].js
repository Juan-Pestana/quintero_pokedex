import styles from '../../styles/Pokemon.module.css'
// import { QueryClient, useQuery } from 'react-query'
// import { dehydrate } from 'react-query/hydration'
// import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const getSinglePokemon = async (singlePokemon) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${singlePokemon}`)
  const result = await res.json()

  return result
}

export default function SinglePokemon({ pokemon }) {
  // const data = pokemon.flavor_text_entries.filter(
  //   (item) => item.language.name === 'es'
  // )
  // const text = data.map((item) => item.flavor_text)

  // const filteredText = text.filter(function (item, pos, ary) {
  //   return !pos || item.slice(0, 7) != ary[pos - 1].slice(0, 7)
  // })

  return (
    <>
      <div className={styles.pokemon}>
        <div className={styles.img_container}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.info}>
          <span className={styles.id}>#{pokemon.id}</span>
          <div className={styles.name}>
            <p>{pokemon.name}</p>
          </div>
        </div>
      </div>
      {/* <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <h2>VARIANTES</h2>
        {pokemon.varieties.map((variety) => (
          <Link href="/">
            <a className={styles.variant}>
              {variety.pokemon.name.toUpperCase()}
            </a>
          </Link>
        ))}
      </div>
      <hr />
      <div className={styles.data}>
        <h3>Información</h3>
        <ul>
          {filteredText.map((item, idx) => (
            <li key={idx}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  )
}

export async function getServerSideProps(context) {
  const { pokemonName } = context.params

  const pokemon = await getSinglePokemon(pokemonName)

  return {
    props: {
      pokemon,
    },
  }
  //   const queryClient = new QueryClient()
  //   await queryClient.prefetchQuery('singlePokemon', getSinglePokemon)
  //   return {
  //     props: {
  //       dehydratedState: dehydrate(queryClient),
  //     },
  //   }
}
