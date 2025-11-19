import type { Node } from 'types/index'
import { useEditorStore } from '../store'
import api from 'utils/api'

export default function useExplorer() {
  const { nodes, updateNodes, selected } = useEditorStore(store => store)

  function appendNodeToTree(newNode: {
    id: number
    name: string
    isFolder: boolean
  }) {
    const updatedNodes = addNode(nodes)
    updateNodes(updatedNodes)

    function addNode(nodes: Node[]) {
      return nodes.map(node => {
        if (node.id === selected.id && node.isFolder == true) {
          const children = Array.isArray(node.children) ? node.children : []
          return {
            ...node,
            children: [...children, newNode],
          }
        }
        if (node.children) {
          addNode(node.children)
        }
        return node
      })
    }
  }

  function createFile() {
    const id = Date.now()
    const newNode = {
      id: id,
      name: `file${id}`,
      isFolder: true,
    }
    appendNodeToTree(newNode)
  }

  function createFolder() {
    const id = Date.now()
    const newNode = {
      id: id,
      name: `file${id}`,
      isFolder: false,
    }
    appendNodeToTree(newNode)
  }

  async function fetchNodes() {
    const res = await api.get(`/nodes`)
    return res.data
  }

  return { createFile, createFolder, fetchNodes }
}
