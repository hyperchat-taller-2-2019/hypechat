# Hypechat API
API para la app Hypechat de la materia 75.52 Taller de Programacion 2 de la FIUBA

## Version: 1.0.0

### /login

#### POST
##### Summary:

Valida al usuario que quiere ingresar a la app

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| loginInfo | body |  | Yes | [loginCredentials](#logincredentials) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Se realizo la request con exito! | [user](#user) |
| 400 | Bad login information | [Error](#error) |
| 500 | Server error | [Error](#error) |

### /signUp

#### POST
##### Summary:

Receives user information through the body and registers it as a new user if it doesn't already exists.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userSignUpData | body |  | Yes | [signUpCredentials](#signupcredentials) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Succesful request | [user](#user) |
| 400 | Bad signup information | [Error](#error) |
| 500 | Server error | [Error](#error) |

### /loginFacebook

#### POST
##### Summary:

sends user's facebook token for login.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| facebookToken | body |  | Yes | [facebookLoginCredentials](#facebooklogincredentials) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Se realizo la request con exito! | [user](#user) |
| 400 | Bad login information | [Error](#error) |
| 500 | Server error | [Error](#error) |

### /user/{userId}

#### GET
##### Summary:

Se muestra el perfil del usuario al cual le corresponde el email del path (poner el mail sin las llaves en los costados).

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path |  | Yes | string |
| email | path | email del usuario del cual se quiere ver el perfil | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Request Exitoso! | [user](#user) |
| 400 | email del path no existe. | [Error](#error) |
| 500 | Fallo el servidor |  |

#### PUT
##### Summary:

updates information fields (with exception of the token), of the user identified by the token, provided in the body.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path |  | Yes | string |
| user | body |  | No | [user](#user) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful request | string |
| 500 | Fallo el servidor | [Error](#error) |

### /consultarPerfil/{email}

#### GET
##### Summary:

Se muestra el perfil del usuario al cual le corresponde el email del path (poner el mail sin las llaves en los costados).

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| email | path | email del usuario del cual se quiere ver el perfil | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Request Exitoso! | [user](#user) |
| 400 | email del path no existe. | [Error](#error) |
| 500 | Fallo el servidor |  |

### Models


#### user

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string | user login token | No |
| name | string | user name | No |
| nickname | string | user nickname | No |
| email | string | null | No |
| photo | string | url de la nueva foto del usuario | No |

#### signUpCredentials

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | user name | No |
| nickname | string | user nickname | No |
| email | string | null | No |
| photo | string | url de la nueva foto del usuario | No |

#### logInCredentials

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string | user email | Yes |
| psw | string | user password | Yes |

#### facebookLogInCredentials

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string | user token asigned by facebook api | Yes |

#### Error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | int32 |  | No |
| message | string |  | No |