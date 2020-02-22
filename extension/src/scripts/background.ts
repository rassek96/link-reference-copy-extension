import {Event} from '../lib/entities';
import {copyToClipboard} from '../helpers';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menuItem',
    title: 'Copy referenced link to clipboard',
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, Event.GetIdOfClickedElement, result => {
    if (result && !!result.value && !result.error) {
      const url = tab.url.split('#')[0];
      const urlWithReference = `${url}#${result.value}`;
      copyToClipboard(urlWithReference);
    }
  });
});
