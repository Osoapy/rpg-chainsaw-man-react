import './SiteHeader.scss';
import denjiURL from '../../assets/denji.png';

const SiteHeader = () => {
    return (
        <header>
            <img src={denjiURL}></img>
            <h1>CHAINSAW MAN RPG</h1>
        </header>
    );
}

export default SiteHeader