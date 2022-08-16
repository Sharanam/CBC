import { Suspense } from "react";
import SearchComponent from "./SearchComponent"
import './App.css';

function App() {
  // const [val,setVal]=useState("S");
  
  return (
    <div className="App">
      {/* <header className="App-header">
        Sharanam
        <input type="text" value={val} onChange={(event)=>setVal(event.target.value)}/>
      {val}
      </header> */}
      <Suspense fallback={<h1>Sharanam</h1>}>
      <SearchComponent />
      </Suspense>
      

    </div>
  );
}

export default App;
