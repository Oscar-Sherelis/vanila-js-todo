onInputDataToValue(".register-form input[name='name']", "name", registerData);
onInputDataToValue(".register-form input[name='surname']", "surname", registerData);
onInputDataToValue(".register-form input[name='email']", "email", registerData);

submitReq(".register", "users", registerData, "POST");
