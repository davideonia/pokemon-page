import { Container, Text } from "@nextui-org/react";
import Image from "next/image";
import styles from '../styles/MainLayout.module.css'

export const NoFavorites = () => {
return(
    <>
        <Container className={styles['container-favorites']} >
                <Text h1>
                    No hay favoritos
                </Text>
                <Image 
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/148.svg'}
                width={200}
                height={200}
                />
            </Container>
    </>
)};



