const Footer = () => {
  
  
  const date = new Date().getFullYear()

  return (
    <div className='py-5 bg-black text-center fixed bottom-0 left-0 right-0'>&copy; {date} Marvel Universe Database. Designed and Made by <strong>Gaurav</strong></div>
  )
}

export default Footer