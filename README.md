# Talentide

## Reikalingos aplikacijos

Visual Studio Code, MongoDB compass, Node.js

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Mongo DB shell](https://www.mongodb.com/docs/mongodb-shell/install/)
- [Mongo DB community Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- [Mongo DB community MacOs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
- [Mongo DB compass](https://www.mongodb.com/docs/compass/current/install/)
- [Node.js](https://nodejs.org/en/download/current)

## Duomenų bazės paliedimas

Įsijungti mongo DB compass ir spausti connect.

## Projekto paleidimas

- Atsidaryti talenTide aplanką per Visual Studio Code.
- Atsidaryti 2 terminalus per Visual Studio Code.

### Serverio modulių įrašymas

Per vieną iš terminalų nueiti į serverio aplanką talenTide/td-server ir paleisti komandą "npm i" arba "npm install"

```bash
talenTide/td-server npm i
```

### Serverio paleidimas

Nueiti į talenTide/td-server/src ir paleisti komandą "node server.js"

```bash
talenTide/td-server/src node server.js
```

### Kleinto pusės modulių įrašymas

Per kitą terminalą nueiti į talenTide/td-client ir paleisti komandą "npm i" arba "npm install"

```bash
talenTide/td-server npm i
```

### Kliento pusės paleidimas

Nueiti į talenTide/td-client ir paleisti komandą: "npm start"

```bash
talenTide/td-client npm start
```

## Pastabos

### Duomenų bazė

Jei MongoDB Compass aplikacijoje neatsiranda duomenų bazė sukurti pavadinimu: **"talentide"** ir duomenų bazėi sukurti dvi kolekcijas: **"tasks"** ir **"users"**

#### Kaip sukurti admin vartotoja?

Kad programa pilnai veiktų reikia: duomenų bazėje ranka sukurti **"admin"** vartotoją.

- Atsidaryti MongoDB compass
- Nueiti į **"users" kolekcija**
- Spausti add data > insert document
- Patalpinti JSON šabloną

Sukūrus **"admin"** vartotoją galima prisijungti prie platformos ir toliau su ja dirbti.

#### JSON šablonas

{
"\_id": {
"$oid": "663c7ba009daf4bc693cb810"
  },
  "role": "admin",
  "password": "123",
  "name": "Vardas",
  "surname": "Pavarde",
  "email": "admin@gmail.com",
  "phone": "+37065544321",
  "birthDate": {
    "$date": "2000-06-08T00:00:00.000Z"
},
"startDate": {
"$date": "2024-05-01T00:00:00.000Z"
},
"team": "Operations",
"\_\_v": 0
}

#### Prisijungimai

Prisijungimus galima rasti JSON šablone arba duomenų bazėje **"users" kolekcijoje**

**Account id:** "$oid"

**Password:** "password"

### MacOs vartotojams

```bash
talenTide/td-server/src/server.js
```

**Mongoose.connect nuoroda:** 'mongodb://127.0.0.1:27017/talentide'

### Windows vartotojams

```bash
talenTide/td-server/src/server.js
```

**Mongoose.connect nuoroda:** 'mongodb://localhost:27017/talentide'
