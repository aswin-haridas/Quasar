import type { FilesWrapperProps } from 'types/index'
import File from './File'
import Folder from './Folder'


export default function FilesWrapper({
  files,
  folders,
  selected,
  setSelected,
}: FilesWrapperProps) {

  return (
    <div>
      <div>
        {files.map(f => (
          <File
            key={f.id}
            id={f.id}
            fileName={f.fileName}
            nested={false}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      <div>
        {folders.map(f => (
          <Folder
            key={f.id}
            id={f.id}
            files={f.files}
            folderName={f.folderName}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  )
}
