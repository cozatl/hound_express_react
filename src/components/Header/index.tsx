import { StyledHeader } from './styles';
import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import getImages from '../utils/getImages';
import SEO from '../SEO';

//npm install react-router-hash-link -- install HashLink to navigate better between pages
//When input parameter is a simple value (such as string) then we can create an interface
//then add it to the input parameter with "React.FC" or "const Header = ({appName}: HeaderProps)"
interface HeaderProps {
    appName: string;
}

declare const require: any;

const Header: React.FC<HeaderProps> = ({appName}) => {
    // using require needs: npm install --save-dev @types/node and "types": ["node"] in tsconfig.json
    const images:Record<string,string> = getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/));
    //Next lines required only for TESTING
    // const images = typeof require.context === 'function'
    //     ? getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/))
    //     : {};
    
    const isFirstRender = useRef(true);
    //Simulating componentDidMount
    useEffect(() => {
        !isFirstRender.current ? 
        console.log('Web Page loaded correctly.') : isFirstRender.current = false;
        
    }, []); // The empty array ensures the effect runs only on mount

    return (
        <StyledHeader>
            <SEO 
                title="Hound Express deliveries"  // Title for web and social networks
                description="Delivery company committed to give good service." // Description for web and social networks
                keywords="hound express, delivery" // Set specific keyworkds rules
                image= {images['logo.png']} // Image for Open Graph and social networks
                robots="noindex, nofollow"  // Set specific robots rules
            />
            <img src={images['logo.png']} alt="logo de la empresa"/>
            <span></span><span></span>
            <p>MX +52(32)3324234</p>
            <span></span>
            <p>US +1(32)3324234</p><span></span>
            <p>Idioma</p>
            <nav id="menu">
                <ul>
                    <li><Link to='/home'>Inicio</Link></li>
                    <li><Link to='/home'>Nosotros</Link></li>
                    <li>
                        <Link to='/home'>Servicios</Link>
                        <ul>
                            <li><HashLink smooth to='/home#waybill'>Registro de gui&#769;as</HashLink></li>
                            <li><HashLink smooth  to='/home#status'>Estado general</HashLink></li>
                            <li><HashLink smooth  to='/home#waybillList'>Lista de gui&#769;as</HashLink></li>
                        </ul>
                    </li>
                    <li><Link to='/home'>Blog</Link></li>
                    <li><Link to='/home'>Contacto</Link></li>
                    <li><Link to='/home'>Portal de cliente</Link></li>
                </ul>
            </nav>
        </StyledHeader>
    )
}

export default Header;