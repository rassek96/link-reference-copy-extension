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

chrome.runtime.onMessage.addListener((request: Event, _, sendResponse) => {
  if (request === Event.GetIdOfClickedElement) {
    if (!clickedElement) {
      return sendResponse({value: null, error: true});
    }

    try {
      let id = traverseToFindId(clickedElement);

      // If no id was found, check parent element
      if (!id && !!clickedElement.parentNode) {
        id = traverseToFindId(clickedElement.parentNode);
      }

      return sendResponse({value: !!id ? id : null, error: false});
    } catch (e) {
      return sendResponse({value: null, error: true});
    }
  }
});
