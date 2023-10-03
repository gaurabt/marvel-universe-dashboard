const Item = ({id, name, description, thumbnail} : {id: number, name: string, description: string, thumbnail: any}) => {
  return (
    <div className="flex flex-col border-1 w-[250px] min-h-[350px] justify-center items-center">
      {thumbnail ? (<img src={`${thumbnail.path}.jpg`} alt={name} className="object-cover object-center w-[200px]"/>) : (<img src="/public/images/image_not_available.jpg" alt='not available'/>)}
      <p className="min-w-[200px]">{name}</p>
      <p className="text-center overflow-hidden whitespace-nowrap max-w-[200px] text-ellipsis">{description ? (description) : ('Description not found')}</p>
    </div>
  )
}

export default Item