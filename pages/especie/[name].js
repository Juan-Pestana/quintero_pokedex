import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'
import Link from 'next/link'

import PokemonCard from '../../components/PokemonCard'
import Chart from '../../components/Chart'

const Specie = async (speciePokemon) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${speciePokemon}`
  )
  const result = await res.json()

  return result
}

const getSinglePokemon = async (singlePokemon) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${singlePokemon}`)
  const result = await res.json()

  return result
}

const evolutions = async (url) => {
  const res = await fetch(url)
  const result = await res.json()

  return result
}

export default function SpeciePokemon({ specie, pokemon, evolution }) {
  const data = specie.flavor_text_entries.filter(
    (item) => item.language.name === 'es'
  )
  const text = data.map((item) => item.flavor_text)

  const filteredText = text.filter(function (item, pos, ary) {
    return !pos || item.slice(0, 7) != ary[pos - 1].slice(0, 7)
  })

  const chain = evolution.chain

  const redChain = []

  const dig = (obj) => {
    if (obj.evolves_to.length !== 0) {
      redChain.push(obj.species)
      dig(obj.evolves_to[0])
    } else {
      redChain.push(obj.species)
      return
    }
  }

  dig(chain)

  redChain.forEach((item) => {
    const hola = item.url.split('/')
    item.id = hola[6]
  })

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {specie && <PokemonCard specie={specie} pokemon={pokemon} />}
        {pokemon && <Chart stats={pokemon.stats} />}
      </div>

      <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <h2>Evoluciónes</h2>
        <div className={styles.data}>
          {redChain.map((chainItem) => (
            <div key={chainItem.id} style={{ padding: ' 1rem 3rem' }}>
              <Link href={`/especie/${chainItem.name}`}>
                <a>
                  <div
                    className={styles.img_container}
                    style={{ height: '100px', width: '100px' }}
                  >
                    <Image
                      src={`https://cdn.traction.one/pokedex/pokemon/${chainItem.id}.png`}
                      alt={specie.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p>{chainItem.name.toUpperCase()}</p>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <h2>Habilidades</h2>
        <div className={styles.habilities}></div>
        {pokemon.abilities.map((variety) => (
          <span className={styles.hability} key={variety.ability.name}>
            {variety.ability.name}
          </span>
        ))}
      </div>
      <hr />
      <div className={styles.info}>
        <h3>Información</h3>
        <ul>
          {filteredText.map((item, idx) => (
            <li key={idx}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { name } = context.params

  const responses = await Promise.all([
    Specie(name),
    getSinglePokemon(name),
  ]).then(function (values) {
    return values
  })

  const specie = responses[0]
  const pokemon = responses[1]

  const evolution = await evolutions(specie.evolution_chain.url)
  return {
    props: {
      specie,
      pokemon,
      evolution,
    },
  }
}
