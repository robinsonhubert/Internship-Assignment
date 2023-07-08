
import { AppBar, Toolbar, styled } from '@mui/material'
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #222222
`;

const Tabs = styled(NavLink)`
    font-size:20px;
    margin-right:20px;
    color: white;
    text-decoration:none
`



const NavBar = () => {
    return (
        <Header position='static'>
            <Toolbar>
                <Tabs to='/'>Rider App</Tabs>
                <Tabs to='/all'>All Riders List</Tabs>
                <Tabs to='/add'>Add Riders</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar