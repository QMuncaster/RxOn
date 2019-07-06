/*
This is just some basic client side validation of login form
It is seprate from server side validation
We dont need to send request to server to check for these things
*/
export const required = value => (value ? null : "This value is required");
export const minLength = (value = "") => {
  return value.length < 3
    ? "Username entered must be at least 3 characters"
    : null;
};

export const maxLength = (value = "") => {
  return value.length > 50 ? "Username is too long" : null;
};
