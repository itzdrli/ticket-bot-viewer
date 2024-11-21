import { onMount, Show, splitProps } from 'solid-js'
import './index.css'
import { createStore } from 'solid-js/store'
import { Portal } from 'solid-js/web'
import { InfoComponent } from '~/components/InfoComponent'
import { Ticket } from '~/types/ITicketJSON'
import { ChatComponent } from '~/components/Chat'

export default function Home() {
  const [state, setState] = createStore({
    jsonData: null as Ticket | null,
    loading: false,
    message: 'Upload JSON file or drag and drop JSON file here.',
  })

  onMount(() => {
    const params = new URLSearchParams(window.location.search)
    const jsonUrl = params.get('json')
    if (jsonUrl) {
      fetchJson(jsonUrl)
    }

    // 设置全屏拖拽事件监听
    document.addEventListener('dragover', handleDragOver, false)
    // @ts-ignore
    document.addEventListener('drop', handleDrop, false)
  })

  async function fetchJson(url: string | URL | Request) {
    setState('loading', true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setState({
        jsonData: data,
        loading: false,
      })
    } catch (error) {
      console.error('Failed to fetch JSON:', error)
      setState({
        loading: false,
        message: `Failed to fetch JSON, please check the URL: ${url}`,
      })
    }
  }

  function processFile(file: Blob) {
    if (file && file.type === 'application/json') {
      setState('loading', true)
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target == null) return
        const data = JSON.parse(e.target.result as string)
        setState({
          jsonData: data,
          loading: false,
        })
      }
      reader.readAsText(file)
    } else {
      alert('Drag a valid JSON file.')
    }
  }

  function handleDrop(event: {
    preventDefault: () => void
    dataTransfer: { files: any[] }
  }) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    processFile(file)
  }

  function handleFileChange(event: { target: { files: any } }) {
    const file = event.target.files[0]
    processFile(file)
  }

  function handleDragOver(event: { preventDefault: () => void }) {
    event.preventDefault()
  }

  return (
    <main>
      <Show when={state.loading}>
        <Portal mount={document.body}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              'z-index': 1000,
              color: 'white',
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}
          >
            Loading...
          </div>
        </Portal>
      </Show>

      <Show
        when={state.jsonData}
        fallback={
          <div
            class='flex items-end justify-center h-screen'
            style={{ 'padding-bottom': '35%' }}
          >
            <div class='card w-2/3 bg-base-100 shadow-xl'>
              <div class='card-body items-center text-center'>
                <p>{state.message}</p>
                <input
                  type='file'
                  class='file-input file-input-bordered file-input-success w-full max-w-xs'
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        }
      >
        {/* 直接在这里进行属性拆分和渲染 */}
        {state.jsonData &&
          (() => {
            const [conversation, info] = splitProps(state.jsonData, [
              'conversation',
              'participants',
            ])
            return (
              <pre>
                <InfoComponent
                  {...info}
                  participants={conversation.participants}
                />
                <div id='content' class='divider divider-accent'>
                  Chat History
                </div>
                <ChatComponent {...conversation} />
              </pre>
            )
          })()}
      </Show>
    </main>
  )
}
