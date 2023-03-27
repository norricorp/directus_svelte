curl localhost:8055/items/articles

curl localhost:8055/items/articles/5

# doesn't work
curl https://collective-action.com/items/alerts
# revolving cube web page returned
curl https://collective-action.net/items/alerts
# curl: (35) schannel: next InitializeSecurityContext failed: SEC_E_ILLEGAL_MESSAGE (0x80090326) - 
# This error usually occurs when a fatal SSL/TLS alert is received (e.g. handshake failed). 
# More detail may be available in the Windows System event log.

curl localhost:8055/users/me
{"errors":[{"message":"Invalid user credentials.","extensions":{"code":"INVALID_CREDENTIALS"}}]}

#this fails because no permission
curl -X PATCH -H "Content-Type: application/json" -d "{\"first_name\":\"Douglas\"}" http://localhost:8055/users/21782fa5-0ebb-45ca-abc4-3099bcd5fa06


curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"doug@email.com\", \"password\":\"12345678\"}" http://localhost:8055/auth/login
{
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNzgyZmE1LTBlYmItNDVjYS1hYmM0LTMwOTliY2Q1ZmEwNiIsInJvbGUiOm51bGwsImFwcF9hY2Nlc3MiOm51bGwsImFkbWluX2FjY2VzcyI6bnVsbCwiaWF0IjoxNjcyNjU1MDI1LCJleHAiOjE2NzI2NTU5MjUsImlzcyI6ImRpcmVjdHVzIn0.bxVMCM2EHTshwPmqCZej0jWVn-8AuGkj7iA3kYvH1Es",
		"expires": 900000,
		"refresh_token": "qjYaefJUmQBz0q-FmMT3QIfThp1BnQ91QB6NidGpQ-q9iLM1CJT_7IKgBnujL-80"
	}
}

curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNzgyZmE1LTBlYmItNDVjYS1hYmM0LTMwOTliY2Q1ZmEwNiIsInJvbGUiOm51bGwsImFwcF9hY2Nlc3MiOm51bGwsImFkbWluX2FjY2VzcyI6bnVsbCwiaWF0IjoxNjcyNjU1MDI1LCJleHAiOjE2NzI2NTU5MjUsImlzcyI6ImRpcmVjdHVzIn0.bxVMCM2EHTshwPmqCZej0jWVn-8AuGkj7iA3kYvH1Es"  -d "{\"first_name\":\"Douglas\"}" http://localhost:8055/users/21782fa5-0ebb-45ca-abc4-3099bcd5fa06


curl -X POST -H "Content-Type: application/json" -d "{\"refresh_token\":\"qjYaefJUmQBz0q-FmMT3QIfThp1BnQ91QB6NidGpQ-q9iLM1CJT_7IKgBnujL-80\"}" http://localhost:8055/auth/logout


curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\", \"password\":\"d1r3ctu5\"}" http://localhost:8055/auth/login

{
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMGNhNTU0LTU4ZDMtNGQ2Zi05NDgyLWVlNGIyYmU1MDkwZCIsInJvbGUiOiI2ODFiNzcwNS1lMjkxLTQ3MDUtYmE1YS04ZTkyZGI3YTFkYTQiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3MjY1NTM5OSwiZXhwIjoxNjcyNjU2Mjk5LCJpc3MiOiJkaXJlY3R1cyJ9.EhqcEWUMR3YRknPEO7WiB7npyKub9yYTlycsqGvZwyM",
		"expires": 900000,
		"refresh_token": "zKj4L516FwkoOXCRXwFwf6LTvUvCg1cYDDtBokje3f40kCHQJutQoCj15XhtnaOA"
	}
}

curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMGNhNTU0LTU4ZDMtNGQ2Zi05NDgyLWVlNGIyYmU1MDkwZCIsInJvbGUiOiI2ODFiNzcwNS1lMjkxLTQ3MDUtYmE1YS04ZTkyZGI3YTFkYTQiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3MjY1NTM5OSwiZXhwIjoxNjcyNjU2Mjk5LCJpc3MiOiJkaXJlY3R1cyJ9.EhqcEWUMR3YRknPEO7WiB7npyKub9yYTlycsqGvZwyM"  -d "{\"first_name\":\"Douglas\"}" http://localhost:8055/users/21782fa5-0ebb-45ca-abc4-3099bcd5fa06

curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"fred@email.com\", \"password\":\"12345678\"}" http://localhost:8055/auth/login





