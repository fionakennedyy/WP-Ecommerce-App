<script setup lang="ts">
import { type ShoppingCartItem, addToCart, getCart, removeFromCart, total, count } from "@/model/shoppingCart"

const cart = getCart();

</script>

<template>
    <div>
        <h1 class="subtitle">
            Cart: {{ count() }} items, total: ${{ total() }}
        </h1>

        <div class="cart-items">
            <!--key makes sure we dont add more than one item with the same id-->
            <div class="item" v-for="item in cart" :key="item.product.id">
                <img :src="item.product.thumbnail" :alt="item.product.title" />
                <div class="item-details">
                    <h2 class="title is-5">{{ item.product.title }}</h2>
                    <p class="subtitle is-6">
                        {{ item.product.price }} x
                        {{ item.quantity }} = ${{ item.product.price * item.quantity }}
                        <button class="button is-danger-is-small" @click="removeFromCart(item.product)">
                            <div class="icon">
                                <i class="fas fa-trash"></i>
                            </div>
                        </button>
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>