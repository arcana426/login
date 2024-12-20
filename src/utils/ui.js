export function hideNotifications() {
  const notifications = document.querySelectorAll('.notification');
  notifications.forEach((notification) => {
    notification.style.display = 'none';
  });
}

export function setupModalHandlers() {
  const modal = document.getElementById('customModal');
  const closeButton = modal?.querySelector('.close');

  if (closeButton) {
    closeButton.onclick = () => {
      if (modal) modal.style.display = 'none';
    };
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}
