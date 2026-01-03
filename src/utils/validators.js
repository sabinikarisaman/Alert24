export const validators = {
  required: (value) => !!value?.trim(),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^\d{10}$/.test(value),
  minLength: (value, length) => value?.length >= length,
  maxLength: (value, length) => value?.length <= length,
};

export const validationMessages = {
  required: 'This field is required',
  email: 'Invalid email address',
  phone: 'Must be 10 digits',
  minLength: (length) => `Must be at least ${length} characters`,
};