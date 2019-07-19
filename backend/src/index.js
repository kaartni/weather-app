const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
require('dotenv').config();

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
	const endpoint = `${mapURI}/forecast?q=${targetCity}&units=metric&appid=${appId}&`;
	const response = await fetch(endpoint);
	return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
	const weatherData = await fetchWeather();
	let weatherList = [];

	// 12 hour forecast
	for (let i = 0; i <= 4; i++) {
		weatherList.push(weatherData.list[i]);
	}

	ctx.type = 'application/json; charset=utf-8';
	ctx.body = weatherList ? weatherList : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
