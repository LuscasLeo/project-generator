import React from 'react';

// import { Container } from './styles';

const App: React.FC = () => {

  const sayHello = () => {
    alert("hellop!");
  } 

  return (
    <>
        <h1>Hello World!</h1>
        <button onClick={sayHello}>Click me!</button>
    </>
  );
}

export default App;