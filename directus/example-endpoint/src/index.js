export default (router) => {
	router.get('/hello', (req, res) => res.send('Hello, World!'));
};


// so to run this 
// http://localhost:8055/example-endpoint/hello