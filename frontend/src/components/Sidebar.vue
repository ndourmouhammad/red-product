<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Principal</h3>
    <div class="menu">
      <router-link to="/home" class="button">
        <span class="material-icons">dashboard</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link to="/hotels" class="button">
        <span class="material-icons">hotel</span>
        <span class="text">Liste des hôtels </span>
      </router-link>
    </div>

    <div class="flex"></div>

	<div class="user-info">
  <img :src="userImage" alt="User Image" class="user-avatar" />
  <div>
    <p class="user-name">{{ userName }}</p>
    <span class="user-status">
      <span class="status-indicator"></span> en ligne
    </span>
  </div>
</div>

  </aside>
</template>

<script setup>
import { ref } from "vue";
import logoURL from "../assets/logo4.png";
import userImage from "../assets/profil.jpeg";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const userName = "Mouhammad Ndour";

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);


};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  // background image
  background-image: url("../assets/sidebar.svg");

  color: var(--light);

  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 10rem;
    }
    display: inline-flex;
    padding: 20px 112.66px 22.66px 21px;
    align-items: center;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: #fff;
    font-family: Roboto;
    font-size: 16.797px;
    font-style: normal;
    font-weight: 400;
    line-height: 47.993px; /* 285.714% */
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: #fff;
        font-family: Roboto;
        font-size: 18.664px;
        font-style: normal;
        font-weight: 500;
        line-height: 23.996px; /* 128.571% */
      }

      

      &.router-link-exact-active {
        background-color: #fff;
        border-right: 5px solid #4D5154;

        .material-icons,
        .text {
          color: #4D5154;
        }
      }
    }
  }
  .user-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .user-name {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
	font-family: "Roboto", serif;
  font-optical-sizing: auto;
  }

  .user-status {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
  }

  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #00c853;
    border-radius: 50%;
    margin-right: 0.3rem;
	font-family: "Roboto", serif;
  font-optical-sizing: auto;
  }
}


  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
