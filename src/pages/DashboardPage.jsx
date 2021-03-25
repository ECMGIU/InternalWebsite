import CurrentHoldings from 'components/dashboard/CurrentHoldings';
import RecentReports from 'components/dashboard/RecentReports';
import Sidebar from 'layouts/Sidebar';
import React from 'react';

const HomePage = () => (
  <Sidebar>
    <h1 className="title">Dashboard</h1>
    <div className="grid grid-cols-4 gap-6" style={{ height: '36rem' }}>
      <div className="border border-black placeholder centered">Portfolio Performance</div>
      <div className="border border-black placeholder centered">Index Performance</div>
      <div className="border border-black placeholder centered">Reports Submitted</div>
      <div className="border border-black placeholder centered">Fourth Metric</div>
      <div className="row-span-2"><RecentReports /></div>
      <div className="col-span-3 row-span-2"><CurrentHoldings /></div>
    </div>
  </Sidebar>
);

export default HomePage;
