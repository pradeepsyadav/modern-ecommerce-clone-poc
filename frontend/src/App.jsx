import NavBar from './components/NavBar'
import ContentBox from './components/ContentBox'
import ErrorBox from './components/common/ErrorBox'
import { useEffect } from 'react'
import SellerNavBar from './components/SellerNavBar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom, viewAtom } from './store/atoms'
import './styles/routes.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import SelectionComponent from './components/SelectionComponent'
import ProductList from './components/seller/ProductList'
import SellerHome from './components/seller/SellerHome'
import SellerRender from './components/SellerRender'
import Login from './components/Login'
import SellerAddProductForm from './components/seller/SellerAddProductForm'
import SellerEditProductForm from './components/seller/SellerEditProductForm'


function App() {

  return (
    <Routes>
      <Route path='/' element={<SelectionComponent />} />

      <Route path='/seller' element={<SellerRender />}>
        <Route path='products' element={<ProductList />} />
        <Route path='home' element={<SellerHome />} />
        <Route path='login' element={<Login />} />
        <Route path='addProduct' element={<SellerAddProductForm />} />
        <Route path='editProduct/:productId' element={<SellerEditProductForm />} />
      </Route>

      <Route path='/consumer' element={<ConsumerRender />} />

    </Routes>

  )
}

function ConsumerRender() {

  const setView = useSetRecoilState(viewAtom)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    function evaluateUser() {
      const um = localStorage.getItem('consumer_jwt')
      if (um) {
        setUser(JSON.parse(um))
        setView('PRODUCT_VIEW')
      }
    }
    // if(!user) navigate("login")
    evaluateUser()
    // setView('PRODUCT_VIEW')
  })
  return (
    <>
      <NavBar />
      <ContentBox />
      <ErrorBox />
    </>

  )
}

export default App
