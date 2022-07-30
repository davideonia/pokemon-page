import { Card, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface MyFavorites{
    arr: number[]
}

export const MyFavorites:FC<MyFavorites> = ({arr}) => {

    const router = useRouter();
    const onFavoriteClicked = ( id:number ) => {
        router.push(`/pokemon/${id}`)
    }

return(
    <Grid.Container gap={2} direction='row' justify="flex-start"> 
        {
            arr.map( id => (
                <Grid xs={6} sm={3} xl={1} key={id}>
                    <Card key={id} hoverable clickable css={{padding: 10}} 
                        onClick={ () => onFavoriteClicked(id)}
                    >
                        <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} 
                        width='100px' height={200}
                        draggable='false'
                        />
                    </Card>
                </Grid>
            ) )
        }
    </Grid.Container>
)};



