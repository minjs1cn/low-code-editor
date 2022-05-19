export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-mixed-operators
    const v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
