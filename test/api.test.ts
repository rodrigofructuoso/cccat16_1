import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar uma conta para o passageiro", async function () {
	const payload = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const response = await axios.post("http://localhost:3000/signup", payload);	
	expect(response.status).toBe(200);
	expect(response.data).toHaveProperty('accountId');
});

test("Deve testar CPF inválido", async function () {
	const payload = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "8774824886",
		isPassenger: true
	};
	const response = await axios.post("http://localhost:3000/signup", payload);
	expect(response.status).toBe(422);
	expect(response.data).toBe(-1)
});

test("Deve testar e-mail inválido", async function () {
	const payload = {
		name: "John Doe",
		email: `john.doe${Math.random()}.gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const response = await axios.post("http://localhost:3000/signup", payload);
	expect(response.status).toBe(422);
	expect(response.data).toBe(-2)
});

test("Deve testar nome inválido", async function () {
	const payload = {
		name: "John-Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const response = await axios.post("http://localhost:3000/signup", payload);
	expect(response.status).toBe(422);
	expect(response.data).toBe(-3)
});

test("Deve testar falha usuário existente", async function () {
	const payload = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	
	const response = await axios.post("http://localhost:3000/signup", payload);
	expect(response.status).toBe(200);
	expect(response.data).toHaveProperty('accountId')

	const responseForRepeatedUser = await axios.post("http://localhost:3000/signup", payload);
	expect(responseForRepeatedUser.status).toBe(422);	
	expect(responseForRepeatedUser.data).toBe(-4)
});

test("Deve testar placa de carro inválida", async function () {
	const payload = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: 'AB!77'
	};
	const response = await axios.post("http://localhost:3000/signup", payload);	
	expect(response.status).toBe(422);
	expect(response.data).toBe(-5)
});
