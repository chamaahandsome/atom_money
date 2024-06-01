import React from 'react';
import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSidebar from '../../components/RightSidebar';

const HomePage = () => {
const loggedIn = { firstName: "Bazu", lastName: "Budengele", email: "bazu@budengele.io"}

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

        RECENT TRANSACTIONS

      </div>

      <RightSidebar 
      user={loggedIn} 
      transactions={[]}
      banks={[{currentBalance: 34008}, {currentBalance: 75056}]}
      />

    </section>
  )
}

export default HomePage;
