import { FilePlus2, PackagePlus } from 'lucide-react'
import { useEditorStore } from '../store'
import { cn } from '../utils'
import { useEffect, useState } from 'react'
import FilesWrapper from './file-explorer/FilesWrapper'
import type { FileProps, FolderProps, SelectedProps } from 'types/index'

export default function Sidebar() {
  const theme = useEditorStore(store => store.theme)
  const [currentlySelected, setCurrentlySelected] = useState<SelectedProps>({
    type: null,
    id: null,
  })
  const [files, setFiles] = useState<FileProps[]>([
    {
      id: 3,
      nested: false,
      fileName: 'First file',
      selected: currentlySelected,
      setSelected: setCurrentlySelected,
    },
  ])
  const [folders, setFolders] = useState<FolderProps[]>([
    {
      id: 4884,
      files: [],
      folderName: 'first folder',
      selected: currentlySelected,
      setSelected: setCurrentlySelected,
    },
  ])

  const setSelected = useEditorStore(state => state.setSelected)

  useEffect(() => {
    setSelected(currentlySelected)
  }, [currentlySelected, setSelected])

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 border-neutral-700 text-white' : ''
  const vaultName = '0034R'

  function createFile() {
    const isFolderSelected =
      currentlySelected.type === 'folder' && currentlySelected.id

    const newFile: FileProps = {
      id: Date.now(),
      nested: isFolderSelected ? true : false,
      fileName: `file${files.length}`,
      selected: currentlySelected,
      setSelected: setCurrentlySelected,
    }

    if (isFolderSelected) {
      setFolders(prev =>
        prev.map(folder =>
          folder.id === currentlySelected.id
            ? { ...folder, files: [...folder.files, newFile] }
            : folder
        )
      )
    } else {
      setFiles(prev => [...prev, newFile])
    }
  }

  function createFolder() {
    return setFolders(prev => [
      ...prev,
      {
        id: Date.now(),
        files: [],
        folderName: `folder${folders.length}`,
        selected: currentlySelected,
        setSelected: setCurrentlySelected,
      },
    ])
  }

  return (
    <aside
      className={cn(
        'text-text-primary w-56 min-w-56 border-r border-neutral-200',
        darkTheme
      )}
    >
      <div
        className={cn(
          'flex items-center justify-end border-b border-neutral-200',
          darkTheme
        )}
      >
        <div className="mr-auto ml-1 text-sm text-neutral-500">{vaultName}</div>
        <div className="rounded-md p-[0.2em] hover:bg-blue-400">
          <FilePlus2 onClick={createFile} size={16} />
        </div>
        <div className="rounded-md p-[0.2em] hover:bg-blue-400">
          <PackagePlus onClick={createFolder} size={16} />
        </div>
      </div>
      <FilesWrapper
        files={files}
        folders={folders}
        setSelected={setCurrentlySelected}
        selected={currentlySelected}
      />
    </aside>
  )
}
