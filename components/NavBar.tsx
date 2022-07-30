import NextLink from 'next/link'
import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';
import styles from '../styles/MainLayout.module.css'

export const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo} style={{display:'flex', alignItems:'center'}}>
                <Image
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
                    alt='Ic ono de la App'
                    width="75px"
                    height="75px"
                    className={styles['img-control']}
                    draggable='false'
                />
                <NextLink href='/' passHref={true}>
                    <Link color={'warning'} css={{display:'flex',alignItems:'center'}}>
                        <span className={styles['letter-p']}>P</span>
                        <span className={styles['word-okemon']}>okémon</span>
                    </Link>
                </NextLink>

            </div>
            <div>
                <Button clickable color={'warning'}>
                    <NextLink href='/favorites'>
                        <span className={styles.favoritos}>
                            Favoritos
                        </span>
                    </NextLink>
                </Button>

            </div>
        </nav>
    )
};