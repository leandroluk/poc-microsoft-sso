db.getSiblingDB("{{ORGANIZATION_NAME}}").createCollection("config");
db.getSiblingDB("{{ORGANIZATION_NAME}}").getCollection("config").insertOne({
  _id: 'openid',
  provider: 'microsoft',
  clientId: '{{MICROSOFT_CLIENT_ID}}',
  clientSecret: '{{MICROSOFT_CLIENT_SECRET}}',
  authorizationEndpoint: 'https://login.microsoftonline.com/{{MICROSOFT_TENANT_ID}}/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/{{MICROSOFT_TENANT_ID}}/oauth2/v2.0/token'
});

db.getSiblingDB("{{ORGANIZATION_NAME}}").createCollection("person")
db.getSiblingDB("{{ORGANIZATION_NAME}}").getCollection("person").insertMany([
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7a"),
    "name": "Alice Smith",
    "age": 29,
    "email": "alice.smith@example.com"
  },
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7b"),
    "name": "Bob Johnson",
    "age": 34,
    "email": "bob.johnson@example.com"
  },
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7c"),
    "name": "Carol Williams",
    "age": 22,
    "email": "carol.williams@example.com"
  },
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7d"),
    "name": "David Brown",
    "age": 45,
    "email": "david.brown@example.com"
  },
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7e"),
    "name": "Eve Davis",
    "age": 31,
    "email": "eve.davis@example.com"
  },
  {
    "_id": ObjectId("60b8d6d5f7e7a38c8d9e1b7f"),
    "name": "Frank Miller",
    "age": 27,
    "email": "frank.miller@example.com"
  },
])