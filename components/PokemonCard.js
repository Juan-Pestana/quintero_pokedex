import React from 'react'
import styles from '../styles/Pokemon.module.css'
import Image from 'next/image'

export default function PokemonCard({ specie, pokemon }) {
  return (
    <div className={styles.pokemon}>
      <div className={styles.img_container}>
        <Image
          src={`https://cdn.traction.one/pokedex/pokemon/${specie.id}.png`}
          alt={specie.name}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className={styles.info}>
        <span className={styles.id}>#{specie.id}</span>
        <div className={styles.name}>
          <p>{specie.name.toUpperCase()}</p>
        </div>
        <div className={styles.data}>
          <div className={styles.variant}>
            <span>felicidad:</span>
            <span> {specie.base_happiness}</span>
          </div>
          <div className={styles.variant}>
            <span>capturable:</span>
            <span> {specie.capture_rate}</span>
          </div>
          <div className={styles.variant}>
            <span>experiencia:</span>
            <span> {pokemon.base_experience}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
