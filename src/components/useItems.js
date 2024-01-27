import { ref, onMounted } from 'vue';

export function useItems() {
  const items = ref([]);

  const loadItems = () => {
    const storedItems = localStorage.getItem('myItems');
    if (storedItems) {
      items.value = JSON.parse(storedItems);
    }
  };

  const saveItems = () => {
    localStorage.setItem('myItems', JSON.stringify(items.value));
  };

  onMounted(loadItems);

  return {
    items,
    saveItems
  };
}