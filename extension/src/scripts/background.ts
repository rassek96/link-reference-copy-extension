import {Event} from '../lib/entities'
import {copyToClipboard} from '../helpers'


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menuItem',
    title: 'Copy referenced link to clipboard',
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    Event.GetIdOfClickedElement,
    ({value, error}) => {
      if (!!value && !error) {
        const url = tab.url.split('#')[0]
        const urlWithReference = `${url}#${value}`
        copyToClipboard(urlWithReference)
      }
    },
  )
})
