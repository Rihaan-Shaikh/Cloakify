import { ExtensionMessage } from '../shared/messages';

console.log('Cloakify Content Script Active');

const checkStatusMessage: ExtensionMessage = { type: 'CHECK_STATUS' };
chrome.runtime.sendMessage(checkStatusMessage, (response) => {
  if (chrome.runtime.lastError) {
    console.warn(
      'Content script failed to connect to background:',
      chrome.runtime.lastError.message,
    );
  } else {
    console.log('Content script verification response:', response);
  }
});
