// 1. after login: server will create a JWT token
// 2. store it in the client side (localStorage, httponly cookies, in memory)
// 3. For asking for the sensetive data : send a request with JWT token in the header
// 4. server will verify the token if token is valid then will provide tha data


// ----------------------------Access token refresh token---------------------------