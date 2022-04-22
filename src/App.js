import Pokedex from "./components/Pokedex";
import { Route, Routes } from "react-router-dom";
import Pokemon from "./components/Pokemon";

export default function App() {
  return (
    <Routes>
      <Route path='/pokedex' element={<Pokedex />} />
      <Route path='/pokemon' element={<Pokemon />} />
    </Routes>
  );
};