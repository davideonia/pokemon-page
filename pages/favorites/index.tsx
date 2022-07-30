import { Layout } from "../../layouts";
import { MyFavorites, NoFavorites } from "../../components";
import { useEffect, useState } from "react";
import { localFavorites } from "../../utils";

const Favorites = () => {

    const [ favorites, setfavorites ] = useState<number[]>([]);

    useEffect(() => {
        setfavorites(localFavorites.pokemons())
    },[]);


    return (
        <>
            <Layout title="Pokemons Favoritos">
               { favorites.length === 0? <NoFavorites />: <MyFavorites arr={favorites} />}



            </Layout>
        </>
    )
};



export default Favorites