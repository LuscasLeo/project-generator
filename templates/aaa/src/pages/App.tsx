import React, { useState } from 'react';
import { Container, GlobalStyle } from './styles';

import { hot } from 'react-hot-loader';
import './fonts.css';

const App: React.FC = () => {
	const [c, setC] = useState(0);
	const foo = () => {
		setC(Math.max(1, c*2));
	}
	return (
		<Container>
			<GlobalStyle />
			<h2>Hello World!</h2>
			<h3>This is a React Typescript Project Boilerplate features:</h3>
			<ul>
				<li>Styled Components</li>
				<li>React Hot Reload</li>
			</ul>
			<button onClick={() => foo()}>Click me! ({c})</button>
			<div>
				{[...Array(c)].map((a, i) => <span>Hello!</span>)}

			</div>
		</Container>
	);
}

export default hot(module)(App);

