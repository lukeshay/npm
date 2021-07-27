export interface Event {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

export function event({ action, category, label, value }: Event) {
  // @ts-expect-error
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
