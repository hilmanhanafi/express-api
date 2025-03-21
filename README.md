# Backend With Express JS MYSQL + JWT

Backend Express JS menggunakan MYSQL dan JWT

## API Endpoint Login

#### Login

```http
  GET /api/login
```

| Parameter  | Type     | Value             |
| :--------- | :------- | :---------------- |
| `email`    | `string` | hilman1@gmail.com |
| `password` | `string` | hilman123         |

## API Endpoint CRUD USERS

#### findUsers

```http
  GET /api/users
```

Menampilkan Semua data users

#### findUser

```http
  GET /api/users/:id
```

| Parameter  | Type     | Value |
| :--------- | :------- | :---- |
| `id_users` | `string` | `504` |

Menampilkan data user by id

#### createUser

```http
  POST /api/users/store
```

| Parameter  | Type     | Value                  |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | `exampleman@gmail.com` |
| `name`     | `string` | `johndoeman`           |
| `password` | `string` | `123456789`            |

Menambahkan data user

#### updateUser

```http
  PUT /api/users/:id
```

| Parameter  | Type     | Value                   |
| :--------- | :------- | :---------------------- |
| `email`    | `string` | `exampleman2@gmail.com` |
| `name`     | `string` | `johndoeman2`           |
| `password` | `string` | `1234567891`            |

Mengupdate data user

#### updateUser

```http
  DELETE /api/users/:id
```

Menghapus data user
