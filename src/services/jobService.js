import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from '@firebase/firestore';
import { db, auth } from '../config/firebase';

export const jobService = {
  // Create job
  createJob: async (jobData) => {
    try {
      const jobRef = collection(db, 'jobs');
      const newJob = {
        jobTitle: jobData.jobTitle || '',
        jobPosition: jobData.jobPosition || '',
        companyDetails: jobData.companyDetails || '',
        package: jobData.package ? parseFloat(jobData.package) : null,
        jobDescription: jobData.jobDescription || '',
        category: jobData.category,
        location: jobData.location || '',
        image: jobData.image || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: auth.currentUser?.uid,
        status: 'active'
      };

      console.log('Creating new job:', newJob);
      const docRef = await addDoc(jobRef, newJob);
      console.log('Job created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Get jobs by category
  getJobsByCategory: async (category) => {
    try {
      console.log('Fetching jobs for category:', category);
      const jobsQuery = query(
        collection(db, 'jobs'),
        where('category', '==', category)
      );

      const querySnapshot = await getDocs(jobsQuery);
      const jobs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));

      console.log('Fetched jobs:', jobs);

      // Filter active jobs and sort by date
      const sortedJobs = jobs
        .filter(job => job.status === 'active')
        .sort((a, b) => b.createdAt - a.createdAt);

      return sortedJobs;
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        jobTitle: jobData.jobTitle,
        jobPosition: jobData.jobPosition,
        companyDetails: jobData.companyDetails,
        package: jobData.package ? parseFloat(jobData.package) : null,
        jobDescription: jobData.jobDescription,
        category: jobData.category,
        location: jobData.location || '',
        image: jobData.image || '',
        updatedAt: serverTimestamp(),
        status: 'active'
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete job (hard delete)
  deleteJob: async (jobId) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobRef);
      console.log('Job deleted successfully:', jobId);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Get job by ID
  getJobById: async (jobId) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDocs(jobRef);
      if (jobSnap.exists()) {
        return {
          id: jobSnap.id,
          ...jobSnap.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  }
}; 