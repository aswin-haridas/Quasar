import { useEditorStore } from '../store'
import api from '../utils/api'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import type { Node } from '../types'

export default function useExplorer() {
  const { selected, updateNodes } = useEditorStore(store => store)

  const fetchNodes = useCallback(async () => {
    try {
      const res = await api.get(`/nodes`)
      updateNodes(res.data)
      return res.data
    } catch (error) {
      console.error('Failed to fetch nodes', error)
      toast.error('Failed to fetch nodes')
    }
  }, [updateNodes])

  async function createNode(newNode: {
    id: string
    name: string
    isFolder: boolean
    parentId: string | null
  }) {
    const previousNodes = useEditorStore.getState().nodes
    let newNodes = JSON.parse(JSON.stringify(previousNodes)) as Node[]

    const nodeToAdd: Node = {
      id: newNode.id,
      name: newNode.name,
      isFolder: newNode.isFolder,
      children: [],
    }

    if (!newNode.parentId) {
      newNodes.push(nodeToAdd)
    } else {
      const addNodeRecursive = (nodes: Node[]): Node[] => {
        return nodes.map(node => {
          if (String(node.id) === String(newNode.parentId)) {
            return {
              ...node,
              children: [...(node.children || []), nodeToAdd],
            }
          }
          if (node.children) {
            return {
              ...node,
              children: addNodeRecursive(node.children),
            }
          }
          return node
        })
      }
      newNodes = addNodeRecursive(newNodes)
    }

    updateNodes(newNodes)

    try {
      await api.post('/node', newNode)
      toast.success('Created successfully')
    } catch (error) {
      console.error(error)
      updateNodes(previousNodes)
      toast.error('Failed to create')
    }
  }

  function createFile() {
    const parentId =
      selected.id && selected.type === 'folder' ? selected.id : null

    const newId = uuidv4()
    createNode({
      id: newId,
      name: 'New File',
      isFolder: false,
      parentId: parentId ? String(parentId) : null,
    })
    useEditorStore.getState().setRenamingNodeId(newId)
  }

  function createFolder() {
    const parentId =
      selected.id && selected.type === 'folder' ? selected.id : null

    const newId = uuidv4()
    createNode({
      id: newId,
      name: 'New Folder',
      isFolder: true,
      parentId: parentId ? String(parentId) : null,
    })
    useEditorStore.getState().setRenamingNodeId(newId)
  }

  async function deleteNode(id: string) {
    const previousNodes = useEditorStore.getState().nodes

    // Optimistic Update
    const removeNodeRecursive = (nodes: Node[]): Node[] => {
      return nodes
        .filter(node => node.id !== id)
        .map(node => ({
          ...node,
          children: node.children ? removeNodeRecursive(node.children) : [],
        }))
    }

    updateNodes(removeNodeRecursive(previousNodes))

    try {
      await api.delete(`/node/${id}`)
      toast.success('Deleted successfully')
    } catch (error) {
      console.error(error)
      updateNodes(previousNodes)
      toast.error('Failed to delete')
    }
  }

  async function renameNode({ id, name }: { id: string; name: string }) {
    const previousNodes = useEditorStore.getState().nodes

    // Optimistic Update
    const updateNodeRecursive = (nodes: Node[]): Node[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, name }
        }
        if (node.children) {
          return {
            ...node,
            children: updateNodeRecursive(node.children),
          }
        }
        return node
      })
    }

    updateNodes(updateNodeRecursive(previousNodes))

    try {
      await api.put(`/node/${id}`, { name })
      toast.success('Renamed successfully')
    } catch (error) {
      console.error(error)
      updateNodes(previousNodes)
      toast.error('Failed to rename')
    }
  }

  return { createFile, createFolder, fetchNodes, deleteNode, renameNode }
}
