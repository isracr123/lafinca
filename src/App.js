import './App.css';
import Pos from './components/Pos'
import CreateCategory from './components/CreateCategory'
import CreateProduct from './components/CreateProduct'
import EditCategory from './components/EditCategory';
import EditProducts from './components/EditProducts';
import Receipt from './components/Receipt';
import TicketsPOS from './components/TicketsPOS';
import EditTicket from './components/EditTicket';
import Waiter from './components/Waiter';
import WaiterEdit from './components/WaiterEdit';
import Kitchen from './components/Kitchen';
import KitchenEdit from './components/KitchenEdit';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pos" element={<Pos />}/>
        <Route path="/pos/createcategory" element={<CreateCategory />}/>
        <Route path="/pos/editcategory/:id" element={<EditCategory />}/>
        <Route path="/pos/createproduct" element={<CreateProduct />}/>
        <Route path="/pos/editproduct/:id" element={<EditProducts />}/>
        <Route path="/pos/receipt" element={<Receipt />}/>
        <Route path="/pos/tickets" element={<TicketsPOS />}/>
        <Route path="/pos/edittickets/:id" element={<EditTicket />}/>
        <Route path="/waiter" element={<Waiter />}/>
        <Route path="/editwaiter/:id" element={<WaiterEdit />}/>
        <Route path="/kitchen" element={<Kitchen />}/>
        <Route path="/editkitchen/:id" element={<KitchenEdit />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
