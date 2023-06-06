import { Link } from 'react-router-dom';
import '../styles/routes.css'


function SelectionComponent() {
    return (
        <div className='route-container'>
            <Link className='button' to={'/seller'}> SELLER </Link>
            <Link className='button' to={'/consumer'}> CONSUMER </Link>
        </div>
    );
}

export default SelectionComponent;