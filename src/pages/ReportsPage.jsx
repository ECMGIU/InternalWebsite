import Sidebar from 'layouts/Sidebar';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

const ReportsPage = () => {
  const [value, loading, error] = useCollection(firestore.collection('reports'));

  return (
    <Sidebar>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{' '}
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </div>
    </Sidebar>
  );
};

export default ReportsPage;
