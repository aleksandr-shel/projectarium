import * as React from 'react';
import { Outlet} from 'react-router-dom';
import NavigationMenu from './Navigation';
import styled from 'styled-components';

const Container = styled.div`
    /* height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center; */
`

function Layout() {

    return ( 
        <>
            <NavigationMenu/>
            <Container>
                <Outlet/>
            </Container>
        </>
     );
}

export default Layout;