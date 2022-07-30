import { Card, Grid, Row, Text } from '@nextui-org/react'
import type { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Layout } from '../layouts'

interface Props{
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({pokemons}) => {
  return (
    <>
      <Layout title='Listado de Pokemons'>
        <Grid.Container gap={2} justify='flex-start'>
          {
            pokemons.map((val) => (
              <PokemonCard key={val.id} pokemon={val} />
            ))
          }
        </Grid.Container>
      </Layout>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  
  const pokemons: SmallPokemon[] = data.results.map((val,idx) => ({name: val.name, url:val.url, id: idx + 1, img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`})) ;

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokemons
    }
  }
}

export default Home
