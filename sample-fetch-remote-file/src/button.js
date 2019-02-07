/* global print */

import { ui } from 'lumin'
import { setTimeout, fetch } from './builtins.js'

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function basicFetch (text) {
  text.setText('basicFetch - start')
  let response = await fetch('http://lit.luvit.io/')
  print(JSON.stringify(response, null, 2))
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }
  let json = await response.json()
  print(JSON.stringify(json, null, 2))
  let string = 'basicFetch - Success:\n'
  text.setText(string)
}

export function makeButton (prism, text) {
  const { UiButton, EclipseButtonParams, EclipseButtonType } = ui
  let prms = new EclipseButtonParams(EclipseButtonType.kText, 'Press me')
  let node = UiButton.CreateEclipseButton(prism, prms)
  node.onActivateSub(async function (uiEventData) {
    basicFetch(text).catch(error => {
      text.setText('basicFetch - Error: ' + error.message)
    })
  })
  return node
}
