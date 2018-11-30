# myapp backend
nodejs based

# Setup
just clone or download and run "npm install" and then "node .\bin\www" to start

# Deployment 
do connect with your cloud server go to myapp backend git pull origin master.
pm2 start .\bin\www // start the process
pm2 stop .\bin\www // stops the server

# APIs 

postman can be used to test these apis

0) Health check
type url : www.nodeprojectsms.ml  in browser
it will give you "server up.." message

1) Login 
method : post
url : www.nodeprojectsms.ml/user/login
Content-Type: application/json
body : {
	"userName" : "plivo2",
	"password" : "54P2EOKQ47"
}

2) Logout
method : put
url : www.nodeprojectsms.ml/user/logout

3) Inbound API
method : post
url : www.nodeprojectsms.ml/API/inbound/sms
Content-Type: application/json
body : {
	"from" : "14433600975",
	"to" : "441224459571",
	"text" : "STOP\n"
}
sample output: {
    "message": "inbound sms ok",
    "error": ""
}

4) Outbound API
method : post
url : www.nodeprojectsms.ml/API/outbound/sms
Content-Type: application/json
body : {
	"from" : "14433600975",
	"to" : "441224459571",
	"text" : "STOP\n"
}
sample output : {
    "message": "",
    "error": "sms from 14433600975 to 441224459571 blocked by STOP request"
}
