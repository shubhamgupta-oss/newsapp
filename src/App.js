import Home from './component/Home/Home';
import { MyContextProvider } from './context/mycontext';

function App() {
  return (
    <MyContextProvider>
    <Home />
  </MyContextProvider>
  );
}

export default App;
