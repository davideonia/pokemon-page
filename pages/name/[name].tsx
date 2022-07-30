import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { pokeApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { Layout } from "../../layouts";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from 'canvas-confetti'

interface Props {
    pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existPokemon(pokemon.id));



    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(
            localFavorites.existPokemon(pokemon.id)
        )

        if (!isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })

    }

    return (
        <Layout title={(pokemon.name)}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }} >
                        <Card.Body>
                            <Card.Image
                                draggable='false'
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height='250px'
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8} >

                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize"> {pokemon.name} </Text>


                            <Button
                                color={!isInFavorites ? 'warning' : 'error'}
                                onClick={onToggleFavorite}

                            >
                                <Text color="#323232" weight={'bold'} size='17px'>
                                    {isInFavorites ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
                                </Text>
                            </Button>


                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction="row" display="flex">
                                <Image draggable='false' src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                                <Image draggable='false' src={pokemon.sprites.back_default ?? '/no-image.png'} alt={pokemon.name} width={100} height={100} />
                                <Image draggable='false' src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                                <Image draggable='false' src={pokemon.sprites.back_shiny ?? '/no-image.png'} alt={pokemon.name} width={100} height={100} />
                            </Container>
                        </Card.Body>
                    </Card>

                </Grid>

            </Grid.Container>

        </Layout>
    )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonName: string[] = data.results.map(
        pokemon => pokemon.name
    )


    return {
        paths: pokemonName.map(name => (
            {
                params: {
                    name
                }
            }
        )
        ),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByName;