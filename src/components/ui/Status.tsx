import { useEffect, useState } from 'react'

interface StatusData {
  status: string
  uptime: number
  db: string
  processing_tasks: number
}

export default function Status() {
  const [status, setStatus] = useState<StatusData | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    let ws: WebSocket
    let reconnectTimer: ReturnType<typeof setTimeout>

    const connect = () => {
      ws = new WebSocket('ws://localhost:8000/ws/status')

      ws.onopen = () => {
        setConnected(true)
      }

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data)
          setStatus(data)
        } catch (e) {
          console.error('Failed to parse status', e)
        }
      }

      ws.onclose = () => {
        setConnected(false)
        setStatus(null)
        // Try to reconnect after 3 seconds
        reconnectTimer = setTimeout(() => {
          connect()
        }, 3000)
      }
    }

    connect()

    return () => {
      if (ws) ws.close()
      if (reconnectTimer) clearTimeout(reconnectTimer)
    }
  }, [])

  if (!status && !connected)
    return (
      <div className="flex items-center gap-2 text-xs text-red-500">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        Disconnected
      </div>
    )

  if (!status)
    return <div className="text-text-secondary text-xs">Connecting...</div>

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-500" />
      <div className="text-text-secondary text-xs">
        Server: {status.status} | Uptime: {Math.floor(status.uptime)}s | DB:{' '}
        {status.db} | Processing: {status.processing_tasks}
      </div>
    </div>
  )
}
