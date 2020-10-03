import {Event} from '../lib/entities';
import {copyToClipboard} from '../helpers';

const displayMessage = (title: string, message: string) => {
  chrome.notifications.create(`link-reference-copy-extension-${Date.now()}`, {
    type: 'basic',
    iconUrl: 'src/assets/link-32px.png',
    title,
    message,
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menuItem',
    title: 'Copy referenced link to clipboard',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, Event.GetIdOfClickedElement, result => {
    if (!result || result.error) {
      displayMessage(tab.url, 'Copied URL without anchor to clipboard');
      return copyToClipboard(tab.url);
    }

    if (!result.value) {
      displayMessage(
        tab.url,
        'Cannot anchor to any nearby elements. Copied URL without anchor to clipboard'
      );
      return copyToClipboard(tab.url);
    }

    const url = tab.url.split('#')[0];
    const urlWithReference = `${url}#${result.value}`;
    displayMessage(urlWithReference, 'Anchored URL copied to clipboard');
    copyToClipboard(urlWithReference);
    chrome.tabs.update(tab.id, {url: urlWithReference});
  });
});
