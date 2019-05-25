/**
 * Traverses the DOM tree to find and
 * return the first element with an id tag.
 *
 * If none is found returns null
 * @param currentNode
 */
export const traverseToFindId = (currentNode): string | null => {
  if (!!currentNode.id) return currentNode.id

  const children = currentNode.children ? [...currentNode.children] : []

  const nextNodes = []

  let id = null
  for (var i = 0; i < children.length; i++) {
    const child = children[i]
    if (!!child.id) {
      id = child.id
      break
    }

    if (child.children) {
      nextNodes.push(child)
    }
  }

  if (!!id) return id

  const idFromNextNodes = nextNodes.map(traverseToFindId).find(id => !!id)

  return !!idFromNextNodes ? idFromNextNodes : null
}

/**
 * Copies given text to clipboard
 * 
 * Creates temporary textfield and
 * uses dom commands to copy text
 * @param text 
 */
export const copyToClipboard = (text: string) => {
  const copyFrom = document.createElement('textarea')
  copyFrom.textContent = text
  document.body.appendChild(copyFrom)
  copyFrom.select()
  document.execCommand('copy')
  copyFrom.blur()
  document.body.removeChild(copyFrom)
}
