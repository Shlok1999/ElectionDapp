import { useState, useEffect, useCallback } from 'react';
import Vote from '../components/Vote';
import Leaderboard from '../components/Leaderboard';
import MessageComponent from '../components/Message';
import { getPhase } from '../actions/smartContract';
import VoterRegistration from '../components/VoterRegistration';

const VoterCafe = props => {
  const [phase, setPhase] = useState(1);

  const fetchData = useCallback(async () => {
    const newPhase = await getPhase(props.contract);
    setPhase(parseInt(newPhase));
  }, [setPhase, props.contract]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  switch (phase) {
    case 1:
      return <VoterRegistration />;
    // case 1:
    //   return <Leaderboard contract={props.contract} />;
    case 2:
      return <Vote />;
    case 3:
      return (
        <div>
          <Link
            to='/'
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
          >
            Go To Home
          </Link>
          <MessageComponent msg='Results will be declared soon ...' />;
        </div>
      );
    // case 3:
    //   return <Leaderboard contract={props.contract} />;
    case 4:
      return <Leaderboard contract={props.contract} />;
    default:
      return <></>;
  }
};

export default VoterCafe;
