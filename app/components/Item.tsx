const Item = ({id, name, description, thumbnail} : {id: number, name: string, description: string, thumbnail: any}) => {
  return (
    <div className="item shadow-md shadow-blue-500/50">
      {thumbnail ? (<img src={`${thumbnail.path}.jpg`} alt={name} className="object-cover object-center w-[250px] aspect-square"/>) : (<img src="/public/images/image_not_available.jpg" alt='not available'/>)}
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="min-w-[200px] text-center text-black font-bold text-xl">{name}</p>
        <p className="overflow-hidden whitespace-nowrap max-w-[200px] text-ellipsis">{description ? (description) : ('Description not found')}</p>   
      </div>
    </div>
  )
}

export default Item