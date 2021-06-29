<template>
  <div class="text-center">
    <v-snackbar
        v-model="$store.state.snackbar"
        :multi-line="true"
    >
      {{ $store.state.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="$store.state.snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notifications"

}
</script>