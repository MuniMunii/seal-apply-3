
import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './page';
import Navbar from './component/navbar';
import Footer from './component/footer';
import DetailBerita from './page/detailBerita';
function App() {
  return (<>
  <Navbar/>
    <Routes>
      <Route path='/' element={<IndexPage/>}></Route>
      <Route path='/beranda/nasional/:title' element={<DetailBerita/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
