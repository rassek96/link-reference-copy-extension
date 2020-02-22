import {Event} from '../lib/entities';
import {traverseToFindId} from '../helpers';

// The element that is right clicked when opening context menu
let clickedElement = null;

document.addEventListener(
  'contextmenu',
  event => {
    clickedElement = event.target;
  },
  true
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === Event.GetIdOfClickedElement) {
    if (!clickedElement) {
      return sendResponse({value: null, error: true});
    }

    try {
      const id = traverseToFindId(clickedElement);
      return sendResponse({value: id, error: !id});
    } catch (e) {
      return sendResponse({value: null, error: true});
    }
  }
});
