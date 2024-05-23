<template>
  <div class="item-content">
    <img :src="item.item_img" alt="item image" class="item-image" />
    <div class="item-details">
      <div class="item-name">{{ item.name }}</div>
      <div class="item-price">{{ item.price }}원</div>
      <div class="item-quantity">{{ item.quantity }}개</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
});
</script>

<style scoped>
.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 16px;
}

.item-details {
  text-align: center;
}

.item-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.item-price,
.item-quantity {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 4px;
}
</style>
