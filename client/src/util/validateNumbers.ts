const validateNumbers = (value: string): string => {
  console.log(value);
  if (/\D/.test(value)) return value.slice(0, -1);

  return value;
};

export default validateNumbers;
