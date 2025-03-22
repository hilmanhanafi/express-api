# Backend With Express JS MYSQL + JWT

Backend Express JS menggunakan MYSQL dan JWT

Setiap Endpoint wajib memasukkan Authorization di headers

Start the server

```bash
  npm run start
```

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

## API Endpoint Mahasiswa

### Menampilkan semua data Mahasiswa

```http
  GET /api/careers/
```

### Menampilkan data Mahasiswa berdasarkan nama

```http
  GET /api/careers/nama/:nama
```

### Menampilkan data Mahasiswa berdasarkan nim

```http
  GET /api/careers/nim/:nim
```

### Menampilkan data Mahasiswa berdasarkan ymd

```http
  GET /api/careers/ymd/:ymd
```
