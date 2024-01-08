import { useEffect, useState } from 'react'
import './App.css'
import type { GameListProps, ParamsFilterProps } from 'modules/types'
import { useGetAllAmountMutation, useGetAllGamesMutation } from './store/api'
import NavbarJSON from './assets/navbar.json'
import cornerRibbon from './assets/corner-top-right-ribbon.png'

function App() {
  const [getAllGames, games] = useGetAllGamesMutation()
  const [getAllAmount, amount] = useGetAllAmountMutation()
  const [menu, setMenu] = useState<GameListProps[]>((games.data && games.data) || [])
  const [loading, setLoading] = useState<boolean>(false)
  const [activeNavbar, setActiveNavbar] = useState<string>('')
  console.log(menu, 'menu')
  console.log(setMenu)
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllAmount()
    }, 5000)

    getAllGames()
      .unwrap()
      .then((res) => setMenu(res))

    return () => clearInterval(intervalId)
  }, [])

  const euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR'
  })

  const handleFilter = (param: ParamsFilterProps) => {
    setActiveNavbar(param.title)
    setLoading(true)
    const menuGames = (games.data && games.data) || []
    const filterMenuGames = menuGames.filter((item) => item.categories.includes(param.filter))
    setMenu(filterMenuGames)
    setLoading(false)
  }

  return (
    <div>
      <div className=' flex flex-col bg-[#373737]'>
        <ul className='flex flex-row items-center justify-around'>
          {NavbarJSON.navigation.map((item) => (
            <li
              key={item._id}
              className={`hover:bg-green-500 px-4 py-4 ${activeNavbar === item.title && 'bg-green-500'}`}
              onClick={handleFilter.bind(null, item)}
            >
              <a href={item.url} className='text-white text-lg'>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <main className='py-3 flex flex-col items-center'>
        <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1  md:grid-cols-3 md:gap-2  lg:grid lg:grid-cols-5 lg:gap-4'>
          {games.isLoading || loading && (
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]'>
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
          )}
          {games.isSuccess &&
          !loading &&
            games.data &&
            menu.map((res, index) => {
              const tempAmounts = (amount.data && amount.data) || []
              const findAmount = tempAmounts.find((item) => item.game === res.id)
              if (findAmount) {
                return (
                  <div key={index} className='relative group mr-2'>
                    <img src={res.image} alt={res.id} className='rounded-md' />
                    {res.categories.includes('new') && (
                      <div className='bg-transparent w-[120px] absolute top-[-8px] right-[-27px]'>
                        <img className='w-[100px] h-auto' src={cornerRibbon} alt='corner-ribbon' />
                      </div>
                    )}
                    <div className='w-full h-20 cursor-pointer rounded-md absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-75'>
                      <span className='text-white text-lg font-bold'>
                        {euro.format(findAmount?.amount)}
                      </span>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={index} className='relative group mr-2'>
                    <img src={res.image} alt={res.id} className='rounded-md' />
                    {res.categories.includes('new') && (
                      <div className='bg-transparent w-[120px] absolute top-[-8px] right-[-27px]'>
                        <img className='w-[100px] h-auto' src={cornerRibbon} alt='corner-ribbon' />
                      </div>
                    )}
                  </div>
                )
              }
            })}
        </div>
      </main>
    </div>
  )
}
export default App
