import React from 'react';
import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSidebar from '../../components/RightSidebar';
import { getLoggedInUser } from '../../lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import RecentTransactions from '@/components/RecentTransactions';

const HomePage = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id});

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  // console.log({accountsData, account});

    return (
      <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
              <HeaderBox
              type="greeting"
              title="Welcome to Broh"
              user={loggedIn?.firstName || "Guest"}
              subtext="We got you!"
              />
              <TotalBalanceBox 
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
              />
          </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
          
        </div>

        <RightSidebar 
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountsData?.slice(0, 2)}
        />

      </section>
    )
};

export default HomePage;

// const HomePage = async ({ searchParams: { id, page } }: SearchParamProps) => {
//   const currentPage = Number(page as string) || 1;
//   const loggedIn = await getLoggedInUser();
//   const accounts = await getAccounts({ userId: loggedIn.$id });

//   if (!accounts) return;

//   const accountsData = accounts?.data;
//   const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

//   const account = await getAccount({ appwriteItemId });

//   // console.log({ accountsData, account });

//   return (
//     <section className='home'>
//       <div className='home-content'>
//         <header className='home-header'>
//           <HeaderBox
//             type="greeting"
//             title="Welcome to Broh"
//             user={loggedIn?.firstName || "Guest"}
//             subtext="Your personal finance assistant"
//           />
//           <TotalBalanceBox 
//             accounts={accountsData}
//             totalBanks={accounts?.totalBanks}
//             totalCurrentBalance={accounts?.totalCurrentBalance}
//           />
//         </header>

//         <RecentTransactions 
//           accounts={accountsData}
//           transactions={account?.transactions}
//           appwriteItemId={appwriteItemId}
//           page={currentPage}
//         />
//       </div>

//       <RightSidebar 
//         user={loggedIn}
//         transactions={account?.transactions}
//         banks={accountsData?.slice(0, 2)}
//       />
//     </section>
//   )
// };

// export default HomePage;
