import { useRecoilState } from 'recoil'
import { counterAtom, viewAtom } from '../store/atoms'
import Login from './Login'
import ProductList from './product/ProductList'
import Cart from './cart/Cart'

function ContentBox() {

    const [count, setCount] = useRecoilState(counterAtom)
    const [view, setView] = useRecoilState(viewAtom)

    function handleClick(type) {

    }

    if(view === 'LOGIN') {
      return <Login />;
    } else if(view === 'PRODUCT_VIEW') {
      return <ProductList />
    } else if(view === 'CART') {
      return <Cart />
    }
    
}

export default ContentBox;