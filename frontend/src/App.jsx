import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Login from './components/Login'
import Layout from './components/Layout'
import ProductList from './components/ProductList'
import NavBar from './components/NavBar'
import { useCustomState } from './store'

function App() {
  // const [count, setCount] = useState(0)
  const [isProductView, setIsProductView] = useState(true)
  const [prods, setProds] = useState([])
  const [currUser, setCurrUser] = useState(null)
  const [token, setToken] = useState(null)

  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    setProds([
      {
          "productId": 1,
          "productName": "Apple iPad 10.2 8th Gen WiFi iOS Tablet",
          "price": 29190.0,
          "category": {
              "categoryName": "Electronics"
          }
      },
      {
          "productId": 2,
          "productName": "Crocin pain relief tablet",
          "price": 10.0,
          "category": {
              "categoryName": "Medicines"
          }
      }
  ])
  }, [])

  // const [val, dispatch] = useCustomState()

  return (
    // <Layout prodView={{val: isProductView, onView: setIsProductView}} prodList={{prodL: prods, setter: setProds}} user={currUser}>
    //  {isProductView || currUser ? <ProductList products={prods}/> : <Login setCurrUser={setCurrUser} setToken={setToken}/>}
    // </Layout>
    <>
      <NavBar handleSetProduct={setProds} user={currUser} setShowLogin={setShowLogin}/>
      {(!showLogin || currUser)  && <ProductList products={prods}/>}
      {!(!showLogin || currUser) && <Login setCurrUser={setCurrUser} setToken={setToken}/>}
      <footer>Footer</footer>
    </>
  )
}

export default App
