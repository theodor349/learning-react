import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTopping, toggleGluten } from './slices/pizzaSlice';


function App() {
  const pizza = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>Pizza</h1>
      <div>{pizza.gluten ? "Has Gluten" : "Gluten Free"}</div>
      <button onClick={() => dispatch(toggleGluten())}>Toogle Gluten</button>
      {pizza.toppings.map((topping) => (
        <div key={topping}>{topping}</div>
      ))}
      <button onClick={() => dispatch(addTopping('pepperoni'))}>pepperoni</button>
      <button onClick={() => dispatch(addTopping('cheese'))}>cheese</button>
      <button onClick={() => dispatch(addTopping('mushrooms'))}>mushrooms</button>
    </div>
  );
}

export default App;
