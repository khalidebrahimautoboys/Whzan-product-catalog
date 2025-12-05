import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  )
}

export default App
