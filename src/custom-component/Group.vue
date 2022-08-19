<template>
  <div class="group">
    <div>
      <!-- :key="item.id" -->
      <template v-for="(item, ind) in propValue" :key="ind">
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :style="item.groupStyle"
          :prop-value="item.propValue"
          :element="item"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: Array,
      default: () => [],
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.group {
  position: relative;
  width: 100%;
  height: 100%;
}

.group div .component {
  position: absolute;
}
</style>
