import { AppBar, Toolbar, styled } from '@mui/material'
import { NavLink } from 'react-router-dom';
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

const Header = styled(AppBar)`
    background: #222222
`;

const Tabs = styled(NavLink)`
    font-size:20px;
    margin-right:20px;
    color: white;
    text-decoration:none;
`



const NavBar = () => {
    return (
        <Header position='static'>
            <Toolbar>
                <Tabs to='/' style={{fontSize: '1.2rem' }}>Rider App</Tabs>
                <Tabs to='/all' style={{marginLeft:'auto'}}><PlaylistAddCheckCircleOutlinedIcon style={{ fontSize: '1.2rem' }} />All Riders List</Tabs>
                <Tabs to='/add'><PlaylistAddCircleOutlinedIcon style={{ fontSize: '1.2rem' }} /> Add Riders</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar