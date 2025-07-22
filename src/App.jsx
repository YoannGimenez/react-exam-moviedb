import {Route, Routes} from "react-router";
import MovieList from "./components/MovieList/MovieList.jsx";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import {WishlistProvider} from "./context/WishlistProvider.jsx";

function App() {

  return (
      <WishlistProvider>
          <Navbar />
          <Routes>
              <Route path={"/"} element={<MovieList />}/>
              <Route path={"/movie/:id"} element={<MovieDetail />}/>
              <Route path={"/wishlist"} element={<Wishlist />}/>
          </Routes>
      </WishlistProvider>

  )
}

export default App
