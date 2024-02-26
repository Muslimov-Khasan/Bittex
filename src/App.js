import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login/Login";
import News from "./components/News/News";
import Header from "./components/Header/Header";
import AddCategory from "./components/addcategory/addcategory";
import Monitoring from "./components/Monitoring/Monitoring";
import FAQ from "./components/FAQ/FAQ";
import Users from "./components/users/users";
import Moderator from "./components/Moderator/Moderator";
import Contact from "./components/Contact/Contact";
import ModeratorCheked from "./components/ModeratorCheked/ModeratorCheked";
import Brand from "./components/Banner/Brand";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Monitoring" element={<Monitoring />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/adminAdd" element={<Header />} />
        <Route path="/news" element={<News />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Moderator" element={<Moderator />} />
        <Route path="/ModeratorCheked" element={<ModeratorCheked />} />
        <Route path="/Brand" element={<Brand />} />
        <Route path="/Contact" element={<Contact/>} />
      </Routes>
    </div>
  );
}
export default App;
