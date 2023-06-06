import { useEffect } from 'react';
import '../../styles/error.css'
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { errorsAtom } from '../../store/atoms';

function ErrorBox() {
    const [isOpen, setIsOpen] = useState(false)
    const errors = useRecoilValue(errorsAtom)

    let sty;
    useEffect(() => {
        if(!errors.message) return;
        setIsOpen(true)
        // setTimeout(() => {
        //     setIsOpen(false)
        // }, 3000);
    }, [errors])

    if(!isOpen) {
        sty = {display: 'none'}
    }
    return (
        errors && 
            <div className="overlay" style={sty}>
                <div className='error-box' >
                    <div className="content">Error: {errors.message}</div>
                    <div className="closeButton" onClick={() => setIsOpen(false)}>x</div>
                </div>
            </div>
    );
}

export default ErrorBox;