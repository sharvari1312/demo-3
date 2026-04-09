/**
 * Utility functions for ScholarPath
 * Handles localStorage for autosaving form data
 */

const STORAGE_KEY = 'scholarpath_form_data';

// Auto-save manager
const StorageUtil = {
  
  // Get all saved data
  getAllData: function() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  // Save single field data
  saveField: function(name, value) {
    const data = this.getAllData();
    data[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Completely clear stored data
  clearAll: function() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Bind all input elements to auto-save on change
  bindAutosave: function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      // Don't save passwords or pure mock search fields
      if (input.type === 'password' || input.dataset.nosave === 'true') return;
      
      if (input.name) {
        input.addEventListener('input', (e) => {
          if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
               this.saveField(input.name, input.value);
            }
          } else {
            this.saveField(input.name, input.value);
          }
        });
      }
    });
  },

  // Restore fields from local storage on page load
  restoreFields: function() {
    const data = this.getAllData();
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.name && data[input.name] !== undefined) {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.value === data[input.name]) {
              input.checked = true;
            }
        } else {
          input.value = data[input.name];
        }
      }
    });
  }
};

// Numeric validation helper
const ValidationUtil = {
  // Ensure integer only for mobile number
  enforceIntegerOnly: function(inputElement) {
    if (!inputElement) return;
    inputElement.addEventListener('input', function(e) {
      // Replace anything that is not a digit (0-9)
      this.value = this.value.replace(/\D/g, '');
    });
  }
};

window.StorageUtil = StorageUtil;
window.ValidationUtil = ValidationUtil;
