<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<{
  id?: string,
  invalid?: boolean,
  modelValue?: string | null,
  preCssIcon?: string,
  postCssIcon?: string,
  autocompleteToggle?: boolean
}>(), {
  id: undefined,
  invalid: false,
  modelValue: undefined,
  preCssIcon: undefined,
  postCssIcon: undefined,
  autocompleteToggle: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'preIconClick'): void
  (e: 'postIconClick'): void
}>()

const slots = useSlots()
const inputRef = ref()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target?.value)
}

const focus = () => {
  inputRef.value.focus()
}

defineExpose({ focus })

</script>
<template>
  <div class="flex items-center">
    <template v-if="preCssIcon || slots.preIcon">
      <div class="relative flex items-center">
        <label :for="id" class="absolute inline-flex left-3" @click="$emit('preIconClick')">
          <slot name="preIcon">
            <i class="w-5 h-5" :class="preCssIcon" />
          </slot>
        </label>
      </div>
    </template>
    <input
      :id="id"
      ref="inputRef"
      :autocomplete="autocompleteToggle ? 'on':'off'"
      :value="modelValue"
      class="
      grow
      peer
      border
      border-brand-base-30
      rounded-lg
      p-2.5 pl-4
      leading-3
      w-full
      text-sm
      text-brand-base-80
      placeholder-shown:text-ellipsis
      placeholder:text-brand-base-60
      read-only:bg-brand-base-20
      read-only:border-none
      focus-visible:read-only:outline-none
      focus-visible:outline-brand-base-30
      "
      :class="{
        'border-brand-error-60': invalid,
        'pl-12': preCssIcon || slots.preIcon,
        'pr-10': postCssIcon || slots.postIcon
      }"
      v-bind="$attrs"
      @input="onInput"
    >
    <template v-if="postCssIcon || slots.postIcon">
      <div class="relative flex items-center">
        <label :for="id" class="absolute inline-flex right-3" @click="$emit('postIconClick')">
          <slot name="postIcon">
            <i class="w-5 h-5" :class="postCssIcon" />
          </slot>
        </label>
      </div>
    </template>
  </div>
</template>
