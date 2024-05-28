import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox'

const HomePage = () => {
const loggedIn = { firstName: "Bazu"}

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
            <HeaderBox
            type="greeting"
            title="Welcome to Atom"
            user={loggedIn?.firstName || "Guest"}
            subtext="Your personal finance assistant"
            />
            <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={125000.24}
            />
        </header>
      </div>
    </section>
  )
}

export default HomePage
