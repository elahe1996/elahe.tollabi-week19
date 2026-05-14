import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductsList from "./pages/ProductsList";


function App() {
  return (
    <>
     <Routes>
       <Route path="/"  element={<Login/>}/>
        <Route path="/login" element={<Login/>} />
        {<Route path="/register" element={<Registration/>}/>}
        {<Route path="/products" element={<ProductsList/>}/>}

     </Routes>
    </>
  );
}

export default App;
