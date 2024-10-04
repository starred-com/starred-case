<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<{
  id?: string,
  modelValue?: string[] | boolean,
  label?: string,
}>(), {
  id: undefined,
  modelValue: undefined,
  label: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | boolean): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target?.checked)
}

</script>
<template>
  <label
    :for="id"
    class="relative flex items-center gap-3 cursor-default"
  >
    <input
      :id="id"
      :checked="modelValue"
      class="opacity-0 peer absolute"
      type="checkbox"
      @change="onInput"
    >
    <span
      class="
      inline-flex
      h-6 w-6
      border border-brand-base-30
      rounded-md
      bg-white
      peer-focus-visible:outline
      peer-focus-visible:outline-2
      peer-focus-visible:outline-brand-base-40
      after:absolute
      after:hidden
      after:left-[9px]
      after:top-[4px]
      after:w-[6px]
      after:h-[12px]
      after:border-r-[2px]
      after:border-b-[2px]
      after:rotate-45
      after:border-brand-primary-90
      peer-checked:after:block
      peer-checked:bg-brand-primary-50
      peer-checked:border-brand-primary-50
    "
    />
    <p v-if="label" class="inline-flex " variant="text-sm">{{ label }}</p>

  </label>
</template>
