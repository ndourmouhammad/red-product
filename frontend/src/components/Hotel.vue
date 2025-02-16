<template>
  <div class="header">
    <div class="dashboard">
      <p>Liste des hôtels</p>
    </div>
    <div class="profil">
      <div class="search">
        <img :src="searchImg" alt="Search Image" class="search-image" />
        <input type="text" placeholder="Rechercher" class="search-input" />
      </div>
      <div class="bell">
        <img :src="bellImg" alt="Bell Image" class="bell-image" />
      </div>
      <div class="user">
        <img :src="userImage" alt="User Image" class="user-avatar" />
        <span class="status-indicator"></span>
      </div>
      <div class="logout">
        <img :src="LogoutImage" alt="Logout Image" class="logout-image" />
      </div>
    </div>
  </div>

  <div class="bienvenue">
    <h1>Hôtels <span class="nombre">{{ hotels.length }}</span></h1>
    
    <router-link to="form" class="router-link">
      <button>
      <img :src="plus" alt="Plus Image" class="plus-image" />
      <span class="text">Créer un nouveau hôtel</span>
    </button>
    </router-link>
  </div>

  <div class="hotels">
    <div v-for="(hotel, index) in hotels" :key="index" class="card">
      <img :src="hotel.image" :alt="hotel.nom" class="hotel-img" />
      <div class="info">
        <p class="adresse">{{ hotel.adresse }}</p>
        <p class="nom">{{ hotel.nom }}</p>
        <p class="prix">{{ hotel.prix }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import searchImg from "../assets/search.svg";
import bellImg from "../assets/bell.svg";
import userImage from "../assets/profil.jpeg";
import LogoutImage from "../assets/log-out.svg";
import plus from "../assets/plus.svg";
import terroubi from "../assets/terroubi.png";
import kfp from "../assets/kfp.png";
import radisson from "../assets/radisson.png";

import { ref } from "vue";

// Tableau des hôtels
const hotels = ref([
  {
    image: terroubi,
    adresse: "Boulevard Martin Luther King Dakar, 11500",
    nom: "Hôtel Terrou-Bi",
    prix: "25.000 XOF par nuit",
  },
  {
    image: kfp, // Remplacez par une autre image si disponible
    adresse: "Rte des Almadies, Dakar",
    nom: "King Fahd Palace",
    prix: "20.000 XOF par nuit",
  },
  {
    image: radisson, // Remplacez par une autre image si disponible
    adresse: "Rte de la Corniche O, Dakar 16868",
    nom: "Radisson Blu Hotel",
    prix: "35.000 XOF par nuit",
  },
  // Ajoutez autant d'hôtels que nécessaire
]);
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: 75px;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px 2.666px 2.666px 0px rgba(0, 0, 0, 0.03),
    0px 1.333px 0px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
}

.dashboard p {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 26.663px;
  font-style: normal;
  font-weight: 500;
  line-height: 74.655px;
  padding: 5px;
}

.profil {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.search {
  display: inline-flex;
  height: 33.995px;
  padding: 4.937px 0px 5.058px 20.897px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border-radius: 666.565px;
  border: 1.333px solid rgba(120, 130, 140, 0.13);
  background: #fff;
  gap: 1rem;
}

.search-input {
  display: flex;
  width: 237.297px;
  height: 21.33px;
  padding-right: 149.297px;
  align-items: center;
  flex-shrink: 0;
  color: #55595c;
  font-family: Roboto;
  font-size: 18.664px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  background: transparent;
}

.search-input::placeholder {
  color: #55595c;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.user {
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  border: 2px solid white;
}

.bienvenue {
  width: 100%;
  height: 103px;
  padding: 1rem;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px 2.666px 2.666px 0px rgba(0, 0, 0, 0.03),
    0px 1.333px 0px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.bienvenue h1 {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 31.995px;
  font-style: normal;
  font-weight: 300;
  line-height: 35.195px;
}

.bienvenue .nombre {
  color: rgba(195, 195, 195, 0.87);
  font-family: Roboto;
  font-size: 31.995px;
  font-style: normal;
  font-weight: 300;
  line-height: 35.195px;
}

button {
  display: inline-flex;
  padding: 17px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  border: 1px solid #aeaeae;
}

button span {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.hotels {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cartes par ligne par défaut */
  gap: 20px; /* Espacement entre les cartes */
}

.hotels .card {
  width: 100%;
  border-radius: 13.648px;
  background: #fafafa;
  overflow: hidden; /* Pour que l'image ne dépasse pas */
}

.card .hotel-img {
  width: 100%;
  height: auto;
}

.info {
  margin-top: 20px;
  padding: 0 14px;
}

.info .adresse {
  color: #8d4b38;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.354px;
}

.info .nom {
  color: #222;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.589px;
}

.info .prix {
  color: #222;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.354px;
  margin-top: 10px;
}
.router-link {
    text-decoration: none;
}
/* Responsive pour tablette */
@media (max-width: 768px) {
  .hotels {
    grid-template-columns: repeat(2, 1fr); /* 2 cartes par ligne */
  }
}

/* Responsive pour mobile */
@media (max-width: 480px) {
  .hotels {
    grid-template-columns: repeat(1, 1fr); /* 1 carte par ligne */
  }
}
</style>