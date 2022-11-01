# <p align = "center">⭐ Project Rating ⭐</p>

<p align="center">
   <img src="https://www.impactplus.com/hubfs/customer-reviews-in-sales-featured.jpg" width="600" height="300" object-fit="cover"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-lucasmartinso-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/lucasmartinso/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This is an backend aplication to controll the data flow of an website/ mobile app of restaurants, coffes review's, where the user can create your own review, and places that doesn't are already registred. Also, the user can explore different places, searching by name, best/worse rating food, attendance, environment and price. The main resposnsability this backend have is to secure the user and place data, keeping the important and sensitive infos cripted, also have to make the quickly integration and communication with database and also with the frontend. 
***

## :computer:	 Tecnolgy and Concepts 

- JWTs
- Node.js
- TypeScript
- PostgresSQL with Prisma ORM

***

## :rocket: Routes

### 👥 Users 

```yml
POST /sign-up
    - Route to create new user
    - headers: {}
    - body:{
        "name": "lorem",
        "username": "lorem",
        "email": "lorem@gmail.com",
        "password": "loremips",
        "confirmPassword": "loremips"
}
```
    
```yml 
POST /login
    - Route to make the login
    - headers: {}
    - body: {
        "usernameEmail": "lorem" || "lorem@gmail.com",
        "password": "lorem"
    }
```

```yml 
PUT /user/photo (autentify)
    - Route change user profile photo
    - headers: { "Authorization": `Bearer $token` }
    - body: {
        "mainPhoto": "loremipsum.jpg"
    }
```

### 🏣 Places  

```yml 
POST /places/create (autentify)
    - Route to create a new place
    - headers: { "Authorization": `Bearer $token` }
    - body: {
        "name": "Lorem Ipsum",
        "description": "lorem lorem lorem...",
        "mainPhoto": "lorem.jpg",
        "type": enum,
        "city": enum,
        "address": "Street lorem, 001"
        "website": "https://lorem.com"
    }
```

```yml 
PUT /places/:id/website (super autentify)
    - Route change place's website 
    - headers: { "Authorization": `Bearer $token` }
    - params: id(number)
    - body: {
        "website": "https://lorem.com"
    }
```

```yml 
PUT /places/:id/verify (super autentify)
    - Route to add a verify symbol to especific place
    - headers: { "Authorization": `Bearer $token` }
    - params: id(number)
    - body: {
        "verify": true || false 
    }
```

```yml 
PUT /places/:id/description (super autentify)
    - Route change place's description
    - headers: { "Authorization": `Bearer $token` }
    - params: id(number)
    - body: {
        "description": "lorem lorem lorem"
    }
```

```yml 
GET /places/:id
    - Route to view a specifc place 
    - headers: {}
    - params: id(number)
    - body: {}
```

```yml 
POST /places/search
    - Route to search places
    - headers: {}
    - query string: "?name=lorem"
    - body: {}
```

```yml 
GET /types
    - Route to view all places that has an especific food type
    - headers: {}
    - body: {}
```
```yml 
GET /places (autentify)
    - Route to get all Places
    - body: {}
```


### 🌠 Rating  

```yml 
POST /rating/:id (autentify)
    - Route to create a review about an especific place
    - headers: { "Authorization": `Bearer $token` }
    - params: id(number)
    - body: {
        "food": 1 - 5 ,
        "environment": 1 - 5,
        "attendance": 1 - 5,
        "price": 1 - 5,
        "comment": "lorem"
    }
```

```yml 
GET /places/food/:type (autentify)
    - Route to get places according to his food rating
    - params: type: "last" || "best" 
    - body: {}
```

```yml 
GET /places/environment/:type (autentify)
    - Route to get places according to his environment rating
    - params: type: "last" || "best" 
    - body: {}
```

```yml 
GET /places/attendance/:type (autentify)
    - Route to get places according to his attendance rating
    - params: type: "last" || "best" 
    - body: {}
```

```yml 
GET /places/price/:type (autentify)
    - Route to get places according to his price rating
    - params: type: "last" || "best" 
    - body: {}
```

### 🌍 Localization  
