# <p align = "center"> Project Rating ⭐</p>

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
