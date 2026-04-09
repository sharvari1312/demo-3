/**
 * Main Application Logic for ScholarPath Frontend
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize standard features
  StorageUtil.restoreFields();
  StorageUtil.bindAutosave();

  // Navigation / View Management
  const views = {
    landing: document.getElementById('view-landing'),
    auth: document.getElementById('view-auth'),
    form: document.getElementById('view-form'),
    results: document.getElementById('view-results')
  };

  const showView = (viewName) => {
    Object.values(views).forEach(v => {
      if(v) v.classList.add('hidden');
    });
    if(views[viewName]) {
      views[viewName].classList.remove('hidden');
      window.scrollTo(0, 0);
    }
  };

  // Bind Navbar links
  const navHowItWorks = document.getElementById('nav-how-it-works');
  if (navHowItWorks) {
    navHowItWorks.addEventListener('click', (e) => {
      e.preventDefault();
      showView('landing');
      document.querySelector('.how-it-works-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navLogin = document.getElementById('nav-login');
  if (navLogin) {
    navLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showView('auth');
    });
  }

  // Landing page CTA setup
  const btnCreateProfile = document.getElementById('btn-create-profile');
  if (btnCreateProfile) {
    btnCreateProfile.addEventListener('click', () => {
      showView('auth');
    });
  }
  
  // Auth view toggling (Signup vs Login)
  const tabSignup = document.getElementById('tab-signup');
  const tabLogin = document.getElementById('tab-login');
  const formSignup = document.getElementById('form-signup');
  const formLogin = document.getElementById('form-login');

  const switchAuthTab = (type) => {
    if (type === 'signup') {
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
      formSignup.classList.remove('hidden');
      formLogin.classList.add('hidden');
    } else {
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
      formLogin.classList.remove('hidden');
      formSignup.classList.add('hidden');
    }
  };

  if(tabSignup) tabSignup.addEventListener('click', () => switchAuthTab('signup'));
  if(tabLogin) tabLogin.addEventListener('click', () => switchAuthTab('login'));
  
  const linkToSignup = document.getElementById('link-to-signup');
  if(linkToSignup) {
    linkToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab('signup');
    });
  }

  // Auth mock submits (proceed to form)
  const authFormsBtn = document.querySelectorAll('.btn-auth-submit');
  authFormsBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('form');
      showFormStep(1);
    });
  });

  // Mobile number integer validation
  const mobileInput = document.getElementById('signup-mobile');
  if(mobileInput) {
    ValidationUtil.enforceIntegerOnly(mobileInput);
  }

  // Multi-step Form Logic
  const totalSteps = 6;
  const showFormStep = (step) => {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const stepEl = document.getElementById(`form-step-${i}`);
        if(stepEl) stepEl.classList.add('hidden');
        
        // Update progress tabs UI
        const tabEl = document.getElementById(`prog-tab-${i}`);
        if(tabEl) {
            tabEl.classList.remove('active');
            if (i === step) tabEl.classList.add('active');
        }
    }
    // Show current step
    const currentEl = document.getElementById(`form-step-${step}`);
    if(currentEl) currentEl.classList.remove('hidden');

    // Update Step indicator text
    const stepText = document.getElementById('current-step-text');
    if(stepText) stepText.textContent = `Step ${step} of ${totalSteps}`;

    // Manage standard buttons visibility
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');

    if (btnBack) btnBack.style.visibility = step === 1 ? 'hidden' : 'visible';
    
    if (step === totalSteps) {
        if(btnNext) btnNext.classList.add('hidden');
        if(btnSubmit) btnSubmit.classList.remove('hidden');
    } else {
        if(btnNext) btnNext.classList.remove('hidden');
        if(btnSubmit) btnSubmit.classList.add('hidden');
    }

    // Save current step to custom dataset to track state
    document.getElementById('view-form').dataset.currentStep = step;
  };

  // Form Navigation bindings
  const btnNext = document.getElementById('btn-next');
  if(btnNext) {
    btnNext.addEventListener('click', () => {
      const formView = document.getElementById('view-form');
      let curr = parseInt(formView.dataset.currentStep || '1');
      if (curr < totalSteps) showFormStep(curr + 1);
    });
  }

  const btnBack = document.getElementById('btn-back');
  if(btnBack) {
    btnBack.addEventListener('click', () => {
      const formView = document.getElementById('view-form');
      let curr = parseInt(formView.dataset.currentStep || '1');
      if (curr > 1) showFormStep(curr - 1);
    });
  }

  const btnSubmit = document.getElementById('btn-submit');
  if(btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      showView('results');
      renderResults();
    });
  }

  const btnClearData = document.querySelectorAll('.btn-clear-data');
  btnClearData.forEach(btn => {
      btn.addEventListener('click', () => {
          if(confirm("Are you sure you want to clear all form data?")) {
              StorageUtil.clearAll();
              const inputs = document.querySelectorAll('input, select, textarea');
              inputs.forEach(input => {
                  if(input.type === 'checkbox' || input.type === 'radio') input.checked = false;
                  else input.value = '';
              });
              showFormStep(1); // Optional: reset to step 1
          }
      });
  });

  // Render Results Page
  const renderResults = () => {
    const listContainer = document.getElementById('scholarships-list');
    if(!listContainer) return;
    
    listContainer.innerHTML = ''; // clear
    const data = MockAPI.getScholarships();
    
    data.forEach(sc => {
      const card = document.createElement('div');
      card.className = 'scholarship-card';
      card.innerHTML = `
        <div class="sc-info">
          <h3>${sc.name}</h3>
          <div class="sc-provider">${sc.provider}</div>
          <div class="sc-details">
            <div class="sc-detail-item">
              <span class="sc-detail-label">Amount</span>
              <span class="sc-detail-value">${sc.amount}</span>
            </div>
            <div class="sc-detail-item">
              <span class="sc-detail-label">Deadline</span>
              <span class="sc-detail-value">${sc.deadline}</span>
            </div>
            <div class="sc-detail-item">
              <span class="sc-detail-label">Type</span>
              <span class="sc-detail-value">${sc.type}</span>
            </div>
          </div>
          <div class="filters" style="margin-top: 1rem; border-top:none;">
            ${sc.tags.map(tag => `<span style="font-size: 0.75rem; background: #e2e8f0; padding: 2px 8px; border-radius: 10px;">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="sc-actions">
          <div class="sc-match mb-2">Match: ${sc.matchScore}</div>
          <button class="btn-primary" onclick="alert('Application UI flow initiated via frontend.')">Apply Now</button>
        </div>
      `;
      listContainer.appendChild(card);
    });
  };

  // Chatbot Logic
  const chatFab = document.getElementById('chat-fab');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatBody = document.getElementById('chat-body');
  const chatChips = document.querySelectorAll('.chat-chip');

  const toggleChat = () => {
    chatWindow.classList.toggle('open');
  };

  if(chatFab) chatFab.addEventListener('click', toggleChat);
  if(chatClose) chatClose.addEventListener('click', toggleChat);

  const addChatMessage = (text, isBot) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isBot ? 'msg-bot' : 'msg-user'}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const handleChatSend = () => {
    const text = chatInput.value.trim();
    if(text) {
      addChatMessage(text, false);
      chatInput.value = '';
      
      // Mock delay before reply
      setTimeout(() => {
        addChatMessage(MockAPI.getChatbotReply(text), true);
      }, 600);
    }
  };

  if(chatSendBtn) chatSendBtn.addEventListener('click', handleChatSend);
  if(chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') handleChatSend();
    });
  }

  // Chatbot preset chips
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.textContent;
      chatInput.value = text;
      handleChatSend();
    });
  });

  // Default initialize visual
  showView('landing');
});
