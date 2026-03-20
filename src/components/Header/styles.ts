import styled from "styled-components";

const StyledHeader = styled.header`
    padding: 20px 40px;
    /* solid dashed dotted
       Border is conformed for border-width, border-style,  border-color or the following shortcut*/
    border: 0px inset ; border-style: inset;
    background: ${props => props.theme.colors.bgHeaderColor};
    display: flex;
    justify-content: space-around; /* Extend items through all the screen */
    align-items: center;
    box-sizing: border-box;       /* Set the size to show all items without oversize the screen */
    flex-wrap: wrap;
    color: #fff;
    > span {
        width: 15%;
    }
    > img {
        width: 350px;
    }
    /* menu */

    #menu {
        align-items: center;display: block;
    }
    #menu ul {
        list-style:none;
        margin:0;
        padding:20px 0px;
    }
    
    /* menu items */
    
    #menu ul li {
        background-color:${props => props.theme.colors.bgMenuColor};
        border-top-right-radius: 30%;border-bottom-left-radius: 30%;
    }
    
    /* menu liks */
    
    #menu ul a {
        display:block;
        color:#fff;
        text-decoration:none;
        padding:10px;
        font-family:${props => props.theme.fonts.familyHeading};
        text-transform:uppercase;
        letter-spacing:1px;
    }
    
    /* menu items */
    
    #menu ul li {
        position:relative;
        float:left;
        margin:0;
        padding:0;
    }
    
    /* effect when mouse is over menu items */
    
    #menu ul li:hover {
        background:#6c7583;
    }

    /* dropdown menu */

    #menu ul ul {
        display:none;
        position:absolute;
        top:100%;
        left:0;
        background:none;
        padding:0;
    }
    
    /* dropdown menu items */
    
    #menu ul ul li {
        float:none;
        width:250px
    }
    
    /* enlaces de los items del menu desplegable */
    
    #menu ul ul a {
        line-height:120%;
        padding:10px 15px;
    }
    
    /* items del menu desplegable al pasar el ratón */
    
    #menu ul li:hover > ul {
        display:block;
    }
`;

export {
    StyledHeader,
};