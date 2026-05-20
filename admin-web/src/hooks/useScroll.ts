import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export function useScroll(containerRef: Ref<HTMLElement | null>) {
  const isAutoScroll = ref(true);

  function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
    const container = containerRef.value;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }

  function onScroll() {
    const container = containerRef.value;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    isAutoScroll.value = distanceToBottom < 50;
  }

  // Auto-scroll when content changes if user is at bottom
  watch(
    () => containerRef.value,
    (el) => {
      if (el) {
        el.addEventListener('scroll', onScroll);
      }
    },
  );

  return {
    isAutoScroll,
    scrollToBottom,
  };
}
