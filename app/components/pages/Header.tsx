import bg from '@/./public/images/bg-image-min.jpg'

const Header = () => {

  return (
    <header className="h-[100vh] max-h-[90vh] flex flex-col justify-center items-center mb-10" style={{backgroundImage: `url(${bg.src})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <h1 className='lg:text-[6rem] text-7xl leading-tight font-[900] text-center uppercase text-purple-800'>Marvel Universe Database</h1>
      <p className="header-description">Exploring the Epic Saga of Superheroes and Villains</p>
    </header>
  )
}

export default Header