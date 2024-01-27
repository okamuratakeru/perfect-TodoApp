
<!-- <script setup>
  import { ref } from 'vue'
  import {useItems} from './useItems.js'

  const { items, saveItems } = useItems();
  const textInput = ref();
  const dateInput = ref();

  function submitAction() {
    const title = textInput.value
    const date = dateInput.value

    if (title && date) {
      const newItem = {
        title: title,
        date: date,
        edit: false
      };
      items.value.push(newItem);
      saveItems();
      textInput.value = ''; // 入力フィールドをリセット
      dateInput.value = ''; // 日付フィールドをリセット
    }
    
    

    
  }

</script>

<template>
  <div>
    <form @submit="submitAction">
      <label>やること<input v-model="textInput" type="text"/></label>
      <label>期限<input v-model="dateInput" type="date"/></label>
      <input  type="submit" value="登録">
    </form>
    
  </div>
</template>

-->

<template>
  <div>
    <p v-if="isErrMsg">入力してください</p>
  </div>
  <div>
    <form @submit.prevent="onSubmitForm">
      <label><input type="text" v-model="input"></label>
      <label><input type="date" v-model="inputDate"></label>
      <input type="submit" value="登録">
    </form>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  

  const input = ref("");
  const inputDate = ref("");

  const isErrMsg = ref(false);

  function onSubmitForm() {
    if (input.value == "" || inputDate.value == "") {
      isErrMsg.value = true
      return;
    }

    const items = JSON.parse(localStorage.getItem("items")) || [];

  const newItem = {
    id: items.length,
    content: input.value,
    limit: inputDate.value,
    state: statuses.NOT_START,
    onEdit: false
  };

  items.push(newItem);

  localStorage.setItem("items", JSON.stringify(items))

  location.reload();

  }

  
</script>