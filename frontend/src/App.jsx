import NavBar from './components/NavBar'
import ContentBox from './components/ContentBox'
import ErrorBox from './components/common/ErrorBox'
import { useEffect } from 'react'
import SellerNavBar from './components/SellerNavBar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom, viewAtom } from './store/atoms'
import './styles/routes.css'
import { Route, Routes } from 'react-router-dom'
import SelectionComponent from './components/SelectionComponent'


function App() {

  return (
    <Routes>
      <Route path='/' element={<SelectionComponent />}/>
      <Route path='/seller' element={<SellerRender />}/>
      <Route path='/consumer' element={<ConsumerRender />}/>
    </Routes>

  )
}

function ConsumerRender() {
  const user = useRecoilValue(userAtom)
  const setView = useSetRecoilState(viewAtom)
  useEffect(() => {
    setView('PRODUCT_VIEW')
  })
  return (
    <>
      <NavBar />
      <ContentBox />
      <ErrorBox />
    </>

  )
}

function SellerRender() {
  const user = useRecoilValue(userAtom)
  const setView = useSetRecoilState(viewAtom)
  useEffect(() => {
    setView('LOGIN')
  })

  return (
    <>
      <SellerNavBar />
      <ContentBox />
      <ErrorBox />
    </>
  )
}

export default App
