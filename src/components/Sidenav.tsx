import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import {useNavigate} from "react-router-dom";

function Sidenav({handleChange, isChecked}) {
    const navigate = useNavigate();
    let icon;
    let text;
    if(!isChecked) {
        icon = "fa-solid fa-sun"
        text = "Light Mode"
    } else {
        icon =  "fa-solid fa-moon"
        text = "Dark Mode"
    }



    return (
        <SideNav data-theme={isChecked ? "dark" : "light"} id="sidenav" onSelect={selected => {
            switch(selected) {
                case "home": navigate("");
                break;
                default : navigate("/" + selected);

            }
        }} >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon style={{fontSize: 2 + "em"}}><i className='fa fa-fw fa-home'/></NavIcon>
                    <NavText style={{fontSize: 1.5 + "em"}}>Home</NavText>
                </NavItem>
                <NavItem eventKey="algorithms">
                    <NavIcon style={{fontSize: 2 + "em"}}><i className="fa-solid fa-chart-diagram"/></NavIcon>
                    <NavText style={{fontSize: 1.5 + "em"}}>Algorithms</NavText>
                    <NavItem eventKey="algorithms/aes">
                        <NavText style={{fontSize: 1.5 + "em"}}>AES</NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="nodes">
                    <NavIcon style={{fontSize: 2 + "em"}}><i className="fa-solid fa-circle-info"/></NavIcon>
                    <NavText style={{fontSize: 1.5 + "em"}}>Nodes</NavText>
                    <NavItem eventKey="nodes/xor">
                        <NavText style={{fontSize: 1.5 + "em"}}>XOR</NavText>
                    </NavItem>
                    <NavItem eventKey="nodes/sbox">
                        <NavText style={{fontSize: 1.5 + "em"}}>S-Box</NavText>
                    </NavItem>
                    <NavItem eventKey="nodes/shiftrows">
                        <NavText style={{fontSize: 1.5 + "em"}}>Shift Rows</NavText>
                    </NavItem>
                </NavItem>

                <NavItem eventKey="sandbox" >
                    <NavIcon style={{fontSize: 2 + "em"}}><i className="fa-solid fa-bucket"/></NavIcon>
                    <NavText style={{fontSize: 1.5 + "em"}}>Sandbox</NavText>
                </NavItem>

                <NavItem disabled="true"  onClick={handleChange} >
                    <NavIcon>
                      <i className={icon}/>
                    </NavIcon>
                    <NavText style={{fontSize: 1.5 + "em"}}> {text} </NavText>
                </NavItem>
            </SideNav.Nav>

        </SideNav>
    )
}

export default Sidenav;