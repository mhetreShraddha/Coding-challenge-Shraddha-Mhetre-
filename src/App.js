import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
	const [pop_Data, setpop_Data]= useState({})
	const handleSubmit= (value)=>{
		value.preventDefault();
		const fullname= value.target.name.value
		const zip= value.target.zipcode.value
		fetch('/population',{
      			method: 'POST',
      			body: JSON.stringify({
        		content: {'fullname':fullname, 'zip':zip},
      		})
    		}).then(response => response.json()
      		.then(data => ({ data, response })))
      		.then(({ data, response }) =>  {
        	console.log(data)
		setpop_Data({input: data.name+"'s Zip code is in "+ data.major_city + " and has a population " + data.population})
		console.log(pop_Data)
      })
	}
	return (
	<div className="App">
		<header className="App-header">
			<form onSubmit= {handleSubmit}>
				<table>
					<tr>
						<td>
							<label>
								Name:
									<input type="text" name= "name" placeholder="Full Name"/>
							</label>
						</td>
					</tr>
					<tr>
						<td>
							<label>
								Zip Code:
								<input type="text" name="zipcode" placeholder= "Zip Code" />
							</label>
						</td>
					</tr>
					<tr>
						<td>
							<button>Submit</button>
						</td>
					</tr>
				</table>
				<p>{pop_Data.input}</p>
			</form>
	  	</header>
	</div>
  );
}

export default App;
