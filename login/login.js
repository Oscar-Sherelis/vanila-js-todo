onInputDataToValue(".login-form input[name='name']", "name", loginData);
onInputDataToValue(".login-form input[name='surname']", "surname", loginData);

submitReq(".login", "users", loginData, "GET");
