# Fazer o login e recuperar o "id_token" e o "code"

## Link's auxiliares

Os link's

> dica: para gerar um código nonce simples, basta executar no terminal o comando: `node -e "console.log(crypto.randomUUID())"`

- Autorização de usuário: https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id={{SEU_CLIENT_ID}}&redirect_uri=http://localhost:3000/login/callback&nonce={{GERAR_CODIGO_NONSE}}&response_type=code%20id_token&scope=openid%20email%20profile
- Receber access token:
