import type { ExplorerProps } from 'types/index'
import File from './File'
import Folder from './Folder'

export default function Explorer({
  files,
  folders,
  selected,
  setSelected,
}: ExplorerProps) {
  return (
    <>
      <div>
        {folders.map(f => (
          <Folder
            key={f.id}
            id={f.id}
            files={files}
            folderName={f.folderName}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      <div>
        {files.map(f => (
          <File
            key={f.id}
            id={f.id}
            folderId={f.folderId}
            fileName={f.fileName}
            nested={false}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  )
}
