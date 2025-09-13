import * as React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
const NavigationBtn = styled.div`
    position: fixed;
    top:10px;
    left:10px;
    padding: 2px;
    background-color: white;
    border-radius: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 7px #EAEAEA;
        background-color: #EAEAEA;;
    }
`
const NavigationDiv = styled.div`
    position: fixed;
    top: 40px;
    left: 10px;
    display: flex;
    flex-direction: column;
    .nav-link{
        border: 1px solid black;
        padding: 3px;

    }
`

function NavigationMenu() {
    const [navDivDisplay, setNavDivDisplay] = React.useState(false)

    return ( 
        <>
            {/* <NavigationBtn onClick={()=>setNavDivDisplay(!navDivDisplay)}>
                <MenuIcon/>
            </NavigationBtn>
            {
                navDivDisplay
                &&
                <NavigationDiv>
                    <div className='nav-link'>
                        <Link to='/'>Model 1</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to='/'>Model 2</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to='/'>Model 3</Link>
                    </div>
                </NavigationDiv>
            } */}
        </>
     );
}

export default NavigationMenu;