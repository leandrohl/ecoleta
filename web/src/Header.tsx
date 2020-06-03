import React from 'react';

//FC: um componente escrito com funcao

interface HeaderPropos {
	title: string; 
}

const Header: React.FC<HeaderPropos> = (props) => {
	return (
		<header>
			<h1>{props.title}</h1>
		</header>
	)
}

export default Header;