import { Home, Landing, Detail, Form} from "./views";
import { Route, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import "./App.css"

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">

      {location.pathname !== "/" && <NavBar />}
      
    
      <Route  exact path="/" >
      <Landing/>
      </Route>

      <Route path="/home">
      <Home/>
      
      </Route>

      <Route path="/detail/:id">
      <Detail/>
      </Route>

      <Route path="/create">
      <Form/>
      </Route>
     
      {location.pathname !== "/" && <Footer />} 
      
      </div>
      
      
      
    </>
  )
}




export default App
