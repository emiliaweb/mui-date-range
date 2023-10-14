import { FC } from 'react';
import DateRange from '../DateRange/DateRange';

const App: FC = () => {
  return (
    <div>
      <DateRange getValues={console.log} />
    </div>
  );
};

export default App;
