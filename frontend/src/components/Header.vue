<template>
  <div class="header">
    <div class="dashboard">
      <p>Dashboard</p>
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
    <h1>Bienvenue sur RED Product</h1>
    <p>Lorem ipsum dolor sit amet consectetur</p>
  </div>
  
  <div class="grid-container">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="icon-container" :style="{ backgroundColor: card.color }">
        <img :src="card.icon" alt="Icon" class="icon" />
      </div>
      <div class="content">
        <div class="flex">
          <h2 class="number">{{ card.number }}</h2>
        <p class="title">{{ card.title }}</p>
        </div>
        <p class="description">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import searchImg from "../assets/search.svg";
import bellImg from "../assets/bell.svg";
import userImage from "../assets/profil.jpeg";
import LogoutImage from "../assets/log-out.svg";
import mail from "../assets/mail.svg";
import p from "../assets/p.svg";
import users from "../assets/users.svg";
import { ref } from "vue";


const cards = ref([
  {
    icon: mail,
    number: 125,
    title: "Formulaires",
    description: "Je ne sais pas quoi mettre",
    color: "#A88ADD"
  },
  {
    icon: p,
    number: 40,
    title: "Messages",
    description: "Je ne sais pas quoi mettre",
    color: "#0CC2AA"
  },
  {
    icon: users,
    number: 600,
    title: "Utilisateurs",
    description: "Je ne sais pas quoi mettre",
    color: "#FCC100"
  },
  {
    icon: mail,
    number: 25,
    title: "E-mails",
    description: "Je ne sais pas quoi mettre",
    color: "#F90000"
  },
  {
    icon: p,
    number: 40,
    title: "Hôtels",
    description: "Je ne sais pas quoi mettre",
    color: "#9C27B0"
  },
  {
    icon: users,
    number: 22,
    title: "Entités",
    description: "Je ne sais pas quoi mettre",
    color: "#1565C0"
  }
])
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
  line-height: 74.655px; /* 280% */
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
  display: flex;
  width: 100%;
  height: 105px;
  padding: 1rem;
  flex-direction: column;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px 2.666px 2.666px 0px rgba(0, 0, 0, 0.03),
    0px 1.333px 0px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.bienvenue h1 {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 31.995px;
  font-style: normal;
  font-weight: 300;
  line-height: 35.195px; /* 110% */
}

.bienvenue p {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 16.797px;
  font-style: normal;
  font-weight: 400;
  line-height: 25.196px; /* 150% */
  opacity: 0.6;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 13px;
  background-color: #f3f4f6;
  width: 100%;
}

.card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 16px;
  
}

.icon-container {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.icon {
  width: 24px;
  height: 24px;
}

.content {
  display: flex;
  flex-direction: column;
}

.number {
  color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 31.995px;
font-style: normal;
font-weight: 300;
line-height: 35.195px; /* 110% */
}

.title {
  color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 17.064px;
font-style: normal;
font-weight: 300;
line-height: 18.77px; /* 110% */
}

.description {
  color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 13.797px;
font-style: normal;
font-weight: 400;
line-height: 25.196px; /* 150% */
opacity: 0.6;
}
.flex {
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center

}
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(1, 0.7fr); /* 1 carte par ligne */
  }
}

/* Version téléphone (1 carte par ligne) */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr); /* 1 carte par ligne */
    gap: 10px; /* Réduire l'espacement entre les cartes */
    padding: 0.5rem; /* Réduire le padding */
  }

  .card {
    padding: 0.75rem; /* Réduire le padding des cartes */
    
  }

  .number {
    font-size: 1.25rem; /* Ajuster la taille de la police */
  }

  .title {
    font-size: 0.875rem; /* Ajuster la taille de la police */
  }

  .description {
    font-size: 0.75rem; /* Ajuster la taille de la police */
  }
}
</style>
