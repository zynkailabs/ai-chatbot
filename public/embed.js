(function() {
  // Configuration
  // const config = window.embeddedChatbotConfig || {};
  // const chatbotId = config.chatbotId || document.currentScript.getAttribute('chatbotId');
  // const domain = config.domain || document.currentScript.getAttribute('domain');

  // if (!chatbotId || !domain) {
  //   console.error('Chatbot ID and domain are required for embedding.');
  //   return;
  // }

  // Create iframe
  const iframe = document.createElement('iframe');
  // iframe.src = `https://www.my-chatbot-url.com/chat/${chatbotId}?domain=${encodeURIComponent(domain)}`;
  iframe.src = "https://vercel-ai-chatbot-with-supabase-xaeb.vercel.app"
  iframe.id = 'chatbot-iframe';
  iframe.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 350px;
    height: 500px;
    max-width: 90vw;
    max-height: calc(100vh - 100px);
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    transform: translateY(calc(100% + 80px));
    z-index: 9999;
    display: none;
  `;

  // Create toggle button
  const button = document.createElement('button');
  button.id = 'chatbot-toggle';
  button.innerHTML = '💬';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 10000;
    transition: all 0.2s ease;
  `;

  // Toggle function
  function toggleChatbot() {
    const isOpen = iframe.style.display === 'block';

    if (isOpen) {
      iframe.style.display = 'none';
      iframe.style.transform = 'translateY(calc(100% + 80px))';
      button.innerHTML = '💬';
      button.style.backgroundColor = '#007bff';
    } else {
      iframe.style.display = 'block';
      setTimeout(() => {
        iframe.style.transform = 'translateY(0)';
      }, 0);
      button.innerHTML = '&times;';
      button.style.backgroundColor = '#dc3545';
    }
  }

  // Add event listener to button
  button.addEventListener('click', toggleChatbot);

  // Append elements to body
  document.body.appendChild(iframe);
  document.body.appendChild(button);

  // Expose toggle function globally
  window.toggleChatbot = toggleChatbot;
})();