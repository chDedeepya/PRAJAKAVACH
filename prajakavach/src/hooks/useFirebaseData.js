import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const usePreparednessData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'preparedness'));
        const preparednessData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(preparednessData);
      } catch (error) {
        console.error('Error fetching preparedness data:', error);
        // Fallback to static data if Firebase fails
        setData([
          { label: "Class 1-5", value: 65, color: "orange" },
          { label: "Class 6-10", value: 51, color: "green" },
          { label: "Class 11-12", value: 39, color: "blue" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export const useDrillParticipationData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'drillParticipation'));
        const participationData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(participationData);
      } catch (error) {
        console.error('Error fetching drill participation data:', error);
        // Fallback to static data if Firebase fails
        setData([
          { name: "Class 3A", percent: 92 },
          { name: "Class 7B", percent: 88 },
          { name: "Class 12C", percent: 71 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
