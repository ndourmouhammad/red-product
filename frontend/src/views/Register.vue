<template>
    <div class="login">
        <img :src="logo" alt="">
        <div class="card">
            <p class="titre">Inscrivez-vous en tant que Admin</p>
            <form action="">
                <input type="text" placeholder="Nom" class="form-input" />
                <input type="email" placeholder="E-mail" class="form-input" />
                <input type="text" placeholder="Mot de passe" class="form-input" />
            </form>
            <div class="keep-connected">
                <div class="carre">

                </div>
                <p>Accepter les termes et la politique</p>
            </div>
            <button>
                S'inscrire
            </button>
        </div>
        <router-link to="/" class="router-link">
            <p class="register">Vous avez déjà un compte? <span>Se connecter</span></p>
      </router-link>
        
    </div>
</template>

<script setup>
import logo from '../assets/logo.svg'


</script>

<style scoped>
.login {
    background-image: url("../assets/Frame.svg");
    display: flex;
    flex-direction: column;
    align-items: center;
    
mix-blend-mode: multiply;

  color: var(--light);
justify-content: center;
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  gap: 30px;
 
}
.card {
    width: 384px;
height: 525.587px;
flex-shrink: 0;
border-radius: 4px;
background: #FFF;
box-shadow: 0px 1.333px 2.667px 0px rgba(0, 0, 0, 0.10), 0px -1.333px 0px 0px rgba(0, 0, 0, 0.02);
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 32px;
gap: 2rem;
}
.titre {
    color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 17.067px;
font-style: normal;
font-weight: 400;
line-height: 25.6px; /* 150% */
}
form {
    display: flex;
    flex-direction: column;
    gap: 56px;
}

.form-input {
  display: flex;
  width: 320px;
height: 45.333px;
flex-shrink: 0;
  padding-right: 149.297px;
  align-items: center;
  
  color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 18.667px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 150% */
  border: none;
  outline: none;
  border-bottom: 1.333px solid rgba(160, 160, 160, 0.20);
  
}

.form-input::placeholder {
    color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 18.667px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 150% */
opacity: 0.5;
}

.carre {
    width: 24px;
height: 24px;
flex-shrink: 0;
border-radius: 2.667px;
border: 2.667px solid #9E9E9E;
}

.keep-connected {
    display: flex;
    gap: 14px;
}

.keep-connected p {
    color: rgba(0, 0, 0, 0.87);
font-family: Roboto;
font-size: 18.667px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 150% */
}

button {
    width: 100%;
    height: 50px;
    display: inline-flex;
padding: 11.413px 97px 12.253px 97px;
justify-content: center;
align-items: center;
border-radius: 5.333px;
background: #45484B;
color: #FFF;
text-align: center;
font-family: Roboto;
font-size: 21.333px;
font-style: normal;
font-weight: 500;
line-height: 26.667px; /* 125% */

}

.register {
    color: rgba(255, 255, 255, 0.87);
text-align: center;
font-family: Roboto;
font-size: 18.667px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 150% */
}

.register span {
    color: #FFD964;
font-family: Roboto;
font-size: 18.667px;
font-style: normal;
font-weight: 700;
line-height: 28px;
}
.router-link {
    text-decoration: none;
}
</style>