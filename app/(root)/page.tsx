import React from 'react';
import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSidebar from '../../components/RightSidebar';
import { getLoggedInUser } from '../../lib/actions/user.actions';

const HomePage = async () => {
const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
            <HeaderBox
            type="greeting"
            title="Welcome to Atom"
            user={loggedIn?.name || "Guest"}
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
};

export default HomePage;
