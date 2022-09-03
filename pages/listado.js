import React, { useState } from 'react'
import PokemonListItem from '../components/PokemonListItem'
import { useQuery } from 'react-query'
import styles from '../styles/Listado.module.css'

const getList = async (page) => {
  const offset = page * 20
  const url = `https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=${offset}`
  const res = await fetch(url)
  const result = res.json()

  return result
}

export default function listado() {
  const [page, setPage] = useState(0)

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(['pokemonList', page], () => getList(page), {
      keepPreviousData: true,
    })

  return (
    <>
      <div className={styles.main}>
        <h1>Listado</h1>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            {'<-- '} Anterior
          </button>{' '}
          <span>{page}</span>
          <button
            className={styles.button}
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1)
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={isPreviousData || !data?.next}
          >
            Siguiente {' -->'}
          </button>
        </div>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              <div className={styles.grid}>
                {data.results.map((pokemon) => (
                  <PokemonListItem pokemon={pokemon} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
