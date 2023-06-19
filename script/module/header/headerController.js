export const headerController = (form, searchInput, searchSelect) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    
    
  });
};
