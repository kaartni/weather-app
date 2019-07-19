import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const baseURL = process.env.ENDPOINT;

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = { weatherData: [] };
		this.getWeatherFromApi = this.getWeatherFromApi.bind(this);
	}

	getWeatherFromApi() {
		axios
			.get(`${baseURL}/weather`)
			.then(response => {
				this.setState({ weatherData: response.data });
			})
			.catch(error => {
				console.error(error);
			});
	}

	componentWillMount() {
		this.getWeatherFromApi();
	}

	render() {
		return (
			<div>
				{this.state.weatherData.map(data => (
					<section>
						<h3>{data.dt_txt}</h3>
						<img src={`/img/${data.weather[0].icon.slice(0, -1)}.svg`} height={40} width={40} />
						<strong>{data.main.temp} C </strong>
					</section>
				))}
			</div>
		);
	}
}

ReactDOM.render(<Weather />, document.getElementById('app'));
