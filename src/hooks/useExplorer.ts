import { useEffect, useState } from 'react'
import type { FileProps, FolderProps, SelectedProps } from 'types/index'
import { useEditorStore } from '../store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'utils/api'

export default function useExplorer() {
  const { files, folders, addFile, addFolder, updateFile } = useEditorStore(
    state => state
  )
  const [currentlySelected, setCurrentlySelected] = useState<SelectedProps>({
    type: null,
    id: null,
  })
  const setSelected = useEditorStore(state => state.setSelected)

  const queryClient = useQueryClient()

  useEffect(() => {
    setSelected(currentlySelected)
  }, [currentlySelected, setSelected])

  const { data } = useQuery<{ files: FileProps[] }>({
    queryFn: async () => {
      const res = await api.get('/files')
      return res.data
    },
    queryKey: ['files'],
  })

  if (data?.files) console.log(data.files)

  // sync with server
  const { mutateAsync: addFileMutation } = useMutation({
    mutationFn: async (newFile: {
      fileName: string
      folderId: number | null
      nested: boolean
    }): Promise<{ id: number }> => {
      const res = await api.post('/createfile', newFile)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })

  async function createFile() {
    const isFolderSelected =
      currentlySelected.type === 'folder' && currentlySelected.id != null

    const newFile: FileProps = {
      id: Date.now(),
      nested: isFolderSelected,
      folderId: isFolderSelected ? currentlySelected.id : null,
      fileName: `${Date.now()}`,
      selected: currentlySelected,
      setSelected: setCurrentlySelected,
    }

    // optimistic update
    addFile(newFile)

    const res = await addFileMutation({
      fileName: 'New file',
      folderId: isFolderSelected ? currentlySelected.id : null,
      nested: isFolderSelected,
    })

    return updateFile(newFile.id, { id: res.id })
  }

  function createFolder() {
    const newFolder: FolderProps = {
      id: Date.now(),
      folderName: `New folder`,
      selected: currentlySelected,
      files: [],
      setSelected: setCurrentlySelected,
    }

    return addFolder(newFolder)
  }

  return {
    files,
    folders,
    createFile,
    createFolder,
    currentlySelected,
    setCurrentlySelected,
  }
}
