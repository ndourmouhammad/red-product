<template>
  <form action="">
    <div class="titre">
      <router-link to="/hotels" class="router-link">
        <img :src="arrow" alt="" />
      </router-link>
    </div>
    <div class="inputs">
        <div class="ligne1">
        <div class="line1">
        <label for="nom">Nom de l'hôtel </label>
        <input type="text" placeholder="CAP Marniane" class="form-input" />
    </div>
    <div class="line1">
        <label for="adresse">Adresse </label>
        <input type="text" placeholder="Les îles du saloum, Mar Lodj" class="form-input" />
    </div>
    </div>
    <div class="ligne1">
        <div class="line1">
        <label for="email">E-mail </label>
        <input type="email" placeholder="information@gmail.com" class="form-input" />
    </div>
    <div class="line1">
        <label for="telephone">Numéro de téléphone  </label>
        <input type="text" placeholder="+221 77 777 77 77" class="form-input" />
    </div>
    </div>
    <div class="ligne1">
        <div class="line1">
        <label for="prix_par_nuit">Prix par nuit </label>
        <input type="text" placeholder="25.000" class="form-input" />
    </div>
    <div class="line1">
        <label for="devise">Devise </label>
        <input type="text" placeholder="F XOF" class="form-input" />
    </div>
    </div>
    <div class="ligne2">
        <label for="image">Ajouter une photo </label>
  <div class="line1" id="input-container" @click="triggerFileInput">
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
    <div v-if="imagePreview" class="image-preview">
      <img :src="imagePreview" alt="Aperçu de l'image" />
    </div>
    <div v-else class="placeholder">
      <img src="../assets/image.svg" alt="Icone ajout photo" />
      <p>Ajouter une photo</p>
    </div>
  </div>
</div>

    </div>
    <button>Enregistrer</button>
  </form>
</template>

<script setup>
import arrow from "../assets/arrow.svg";
import { ref } from 'vue';

const imagePreview = ref(null);

const triggerFileInput = () => {
  // Déclencher le clic sur l'input caché
  imagePreview.value = null;
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>

form {
    width: 100%;
border-radius: 11px;
/* border: 1.323px solid #DDD; */
background: #FFF;
padding: 0px 10px 10px 30px;
/* margin: 1rem; */
display: flex;
flex-direction: column;
align-items: flex-start;
    justify-content: center;
    gap: 1.1rem;
}
.titre {
    border-bottom: 2.647px dashed #DDD;
    width: 100%;
}
.router-link {
  text-decoration: none;
}
.line1, .ligne2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
label {
    color: #555;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

}
.form-input {
    width: 422.173px;
height: 50px;
flex-shrink: 0;
border-radius: 14px;
border: 1.323px solid #DDD;
display: flex;
align-items: center;
padding-left: 10px;
}
.form-input::placeholder {
    color: #000;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
}
.ligne1 {
    display: flex;
    gap: 10rem;
}
.inputs {
    display: flex;
    gap: 1rem;
    /* margin-top: 2rem; */
    flex-direction: column;
}
#input-container {
  position: relative;
  width: 100%;
  height: 185px;
  flex-shrink: 0;
  border-radius: 14px;
  border: 1.302px solid #DDD;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.placeholder {
  text-align: center;
  color: #999;
}

.placeholder img {
  width: 40px;
  height: 40px;
  opacity: 0.5;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
}

button {
  display: inline-flex;
  padding: 18px 44px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  background: #555;
  color: #FFF;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22.234px;
  margin-left: auto;
}


</style>
