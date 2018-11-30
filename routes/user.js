module.exports = (app) => {
	app.get('/',function(req,res){
		res.send("server up...")
	})
	app.post('/user/login', function (req, res) {
		console.log("in login route")
		let input = {
			userName : req.body.userName,
			password : req.body.password
		}
		global.controllers.user.login(input)
		.then(user => {
			req.session.user = user;
			console.log("sessionObj : ",req.session)
			let resp = makeResult(200,setSuccessMsg("login success"))
			res.statusCode = resp.http_code;
			res.json(resp.message);
		})
		.catch(err => {
			err = makeErrorResponse(err)
			res.statusCode = err.http_code;
			res.json(err.message);
		});
	});

	app.put('/user/logout', function (req, res) {
		req.session.destroy();
		let resp = makeResult(200,setSuccessMsg("Logout Successfull"))
		res.statusCode = resp.http_code;
		res.json(resp.message);
		// util.makeResponse_200("Logout Successfull", res);
	});

	app.post('/API/inbound/sms/', checkCustomerSession, function (req, res) {
		let input = {
			from : req.body.from,
			to : req.body.to,
			text : req.body.text,
			id : req.session.user
		}
		console.log("inbound input: ",input)
		global.controllers.user.inbound(input)
		.then(resp => {
			console.log('route inbound', resp)
			res.statusCode = resp.http_code;
			res.json(resp.message);
		})
		.catch(err => {
			err = makeErrorResponse(err)
			res.statusCode = err.http_code;
			res.json(err.message);
		});
	});

	app.post('/API/outbound/sms/', checkCustomerSession, function (req, res) {
		let input = {
			from : req.body.from,
			to : req.body.to,
			text : req.body.text,
			id : req.session.user
		}
		console.log("outbound input: ",input)
		global.controllers.user.outbound(input)
		.then(resp => {
			console.log('route outbound', resp)
			res.statusCode = resp.http_code;
			res.json(resp.message);
		})
		.catch(err => {
			err = makeErrorResponse(err)
			res.statusCode = err.http_code;
			res.json(err.message);
		});
	});
}
