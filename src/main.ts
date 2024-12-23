import './style.css'
import App from '~/scripts/App'

document.addEventListener('DOMContentLoaded', async () => {
  await document.fonts.ready
  App()
})
