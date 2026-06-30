import { ExtensionMessage } from '../shared/messages';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Cloakify Extension Installed - Service Worker Active');
});

chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
  console.log('Background service worker received message:', message, 'from:', sender);

  if (message.type === 'CHECK_STATUS') {
    sendResponse({
      status: 'OK',
      timestamp: Date.now(),
    });
  }
  return true; // Keep communication port open
});
