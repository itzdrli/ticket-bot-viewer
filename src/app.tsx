import { ThemeSelector } from '~/components/ThemeSelect'
import Home from '~/routes'
import { render } from 'solid-js/web'

const root = document.getElementById('root')

render(
  () => <Router root={App}>{/*<Route path='/' component={Home} />*/}</Router>,
  root!,
)

import { onMount } from 'solid-js'
import { themeChange } from 'theme-change'
import { Route, Router } from '@solidjs/router'

onMount(async () => {
  themeChange(false)
})

export default function App() {
  return (
    <>
      <div class='navbar bg-base-100'>
        <div class='navbar-start'>
          <a class='btn btn-ghost text-xl'>Ticket Viewer</a>
        </div>
        <div class='navbar-center hidden lg:flex'>
          <ul class='menu menu-horizontal px-1'>
            <li>
              <a href='https://github.com/Kokoro-js/ticket-bot-viewer'>
                Github
              </a>
            </li>
            <li>
              <a href=''>Fantastic Help</a>
            </li>
          </ul>
        </div>
      </div>
      <div id='sidebar' class='sidebar bg-base-100'>
        <ul class='menu p-4 pl-0.5 overflow-y-auto w-80 bg-base-100 text-base-content'>
          <li class='pl-0.5'>
            <a href='#app'>Index</a>
          </li>
          <li class='pl-0.5'>
            <a href='#info'>Ticket Info</a>
          </li>
          <li class='pl-0.5'>
            <a href='#content'>Chat History</a>
          </li>
        </ul>
      </div>
      <Home />
    </>
  )
}
