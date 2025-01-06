import { ref, set, get, remove, update, push, query, orderByChild } from '@firebase/database';
import { database } from "../config/firebase";

export const jobService = {
  // Create a new job
  createJob: async (jobData) => {
    try {
      const jobsRef = ref(database, 'jobs');
      const newJobRef = push(jobsRef);
      await set(newJobRef, {
        ...jobData,
        id: newJobRef.key,
        createdAt: new Date().toISOString()
      });
      return newJobRef.key;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Get all jobs
  getAllJobs: async () => {
    try {
      const jobsRef = ref(database, 'jobs');
      const snapshot = await get(jobsRef);
      if (snapshot.exists()) {
        const jobs = [];
        snapshot.forEach((childSnapshot) => {
          jobs.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        return jobs;
      }
      return [];
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  },

  // Get a specific job by ID
  getJobById: async (jobId) => {
    try {
      const jobRef = ref(database, `jobs/${jobId}`);
      const snapshot = await get(jobRef);
      if (snapshot.exists()) {
        return { id: snapshot.key, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  },

  // Update a job
  updateJob: async (jobId, jobData) => {
    try {
      const jobRef = ref(database, `jobs/${jobId}`);
      await update(jobRef, {
        ...jobData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete a job
  deleteJob: async (jobId) => {
    try {
      const jobRef = ref(database, `jobs/${jobId}`);
      await remove(jobRef);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Get jobs by user ID
  getJobsByUserId: async (userId) => {
    try {
      const jobsRef = ref(database, 'jobs');
      const userJobsQuery = query(jobsRef, orderByChild('userId'), userId);
      const snapshot = await get(userJobsQuery);
      if (snapshot.exists()) {
        const jobs = [];
        snapshot.forEach((childSnapshot) => {
          jobs.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        return jobs;
      }
      return [];
    } catch (error) {
      console.error('Error getting user jobs:', error);
      throw error;
    }
  }
}; 