<script setup>
  import { ref } from "vue";
  import {statuses} from "../const/statuses.js"

  let items = ref(JSON.parse(localStorage.getItem("items")) || []);

  let inputContent = ref();
  let inputLimit = ref();
  let inputState = ref();

  let isShowModal = ref(false)

  let deleteItemId = ''

  function showDeleteModal(id) {
    isShowModal.value = true;
    deleteItemId = id
  }

  function onDeleteItem() {
    items.value.splice(deleteItemId,1)
    items.value = items.value.map((item,index) => ({
      id: index,
      content: item.content,
      limit: item.limit,
      state: item.state,
      onEdit: item.onEdit,
    }));
    console.log(items.value)
    localStorage.setItem("items", JSON.stringify(items.value))
    isShowModal.value = false;
  }

  function onHideModal() {
  isShowModal.value = false;
  }

  function onEdit(id) {
    items.value[id].onEdit = true;
    inputContent.value = items.value[id].content;
    inputLimit.value = items.value[id].limit;
    inputState.value = items.value[id].state
  }

  function onUpdate(id) {
    const newItem = {
      id : id,
      content: inputContent.value,
      limit: inputLimit.value,
      state: inputState.value,
      onEdit: false
    }

    items.value.splice(id, 1, newItem)

    localStorage.setItem("items", JSON.stringify(items.value))
  }

</script>

<template>
  <div v-if="isShowModal" class="modal">
    <div class="modal-content">
      <p>削除してもよろしいですか</p>
      <button @click="onDeleteItem()">はい</button>
      <button @click="onHideModal()">キャンセル</button>
    </div>
  </div>
  <div>
    <table>
      <tr>
        <th class="th-id">ID</th>
        <th class="th-value">やること</th>
        <th class="th-limit">期限</th>
        <th class="th-state">状態</th>
        <th class="th-edit">編集</th>
        <th class="th-delete">削除</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.id}}</td>
        <td>
          <span v-if="!item.onEdit">{{ item.content }}</span>
          <input v-else v-model="inputContent" type="text">
        </td>
        <td>
          <span v-if="!item.onEdit">{{ item.limit }}</span>
          <input v-else v-model="inputLimit" type="date">
        </td>
        <td>
          <span v-if="!item.onEdit">{{ item.state.value }}</span>
          <select v-else v-model="inputState">
            <option v-for="state in statuses" :key="state.id" :value="state">
              {{ state.value }}
            </option>
          </select>
        </td>
        <td>
          <button v-if="!item.onEdit" @click="onEdit(item.id)">編集</button>
          <button v-else @click="onUpdate(item.id)">完了</button>
        </td>
        <td><button @click="showDeleteModal(item.id)">削除</button></td>
      </tr>
    </table>
  </div>
</template>
