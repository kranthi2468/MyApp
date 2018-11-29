exports.validationSchema = {
	"type": "object",
	"required": true,
	"properties": {
		"to" :{
			"type": "string",
			"required": true,
			"minLength": 6,
			"maxLength" : 16
		},
		"from": {
			"type": "string",
			"required": true,
			"minLength": 6,
			"maxLength" : 16
		},
		"text" :{
			"type": "string",
			"required": true,
			"minLength": 1,
			"maxLength" : 120
		}
	}
}