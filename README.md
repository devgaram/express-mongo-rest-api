[![Build Status](https://travis-ci.com/devgaram/express-mongo-rest-api.svg?branch=master)](https://travis-ci.com/devgaram/express-mongo-rest-api)
# Express - Mongoose Rest API
TIL 블로그 인증용 서버

## 사용한 툴 및 라이브러리
- ExpressJs
- Mongodb, Mongoose
- Babel
- Eslint
- Jest, supertest
- Jsonwebtoken

## API
|API|description|response|status|
|------|---|---|---|
|POST /api/auth/isAvailableUserId|ID 중복체크|isAvailable|200|
|POST /api/auth/signup|회원가입|_id, userid, token|201|
|POST /api/auth/signin|로그인|_id, userid, token|200|
|POST /api/auth/logout|로그아웃|

## Getting Started

#### Clone the repo

```
git clone https://github.com/devgaram/express-mongo-rest-api.git
cd express-mongo-rest-api
```

#### Install dependencies

```
npm install
```

#### Set environment (vars)
- NODE_ENV, PORT, MONGO, JWT_SECRET

```
cp .env
```

#### Start server

```
npm run watch:dev
```

#### Test

```
npm run test
```

#### Lint

```
npm run lint
```
