import { FullEntertainer } from '../types/Entertainer';
import { Entertainer } from '../types/EntertainersStats';
import { Agent } from '../types/Project';

const API_URL = 'https://localhost:5000/Entertainment';

// ===================== AGENTS ===================== //

export const fetchAgents = async (): Promise<Agent[]> => {
  try {
    const response = await fetch(`${API_URL}/Agents`);
    if (!response.ok) {
      throw new Error('Failed to fetch agents');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};

// ===================== ENTERTAINERS ===================== //

// Get all entertainers with booking stats
export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(`${API_URL}/EntertainersWithStats`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);
    throw error;
  }
};

// Get entertainer by ID
export const getEntertainerById = async (
  id: number
): Promise<FullEntertainer> => {
  const res = await fetch(`${API_URL}/Entertainers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch entertainer');
  return await res.json();
};

// Add a new entertainer
export const addEntertainer = async (
  newEntertainer: FullEntertainer
): Promise<FullEntertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding entertainer:', error);
    throw error;
  }
};

// Update an existing entertainer
export const updateEntertainer = async (
  entertainerId: number,
  updatedEntertainer: FullEntertainer
): Promise<FullEntertainer> => {
  const response = await fetch(
    `${API_URL}/UpdateEntertainer/${entertainerId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEntertainer),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update entertainer');
  }

  return await response.json();
};

// Delete an entertainer
export const deleteEntertainer = async (
  entertainerId: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/DeleteEntertainer/${entertainerId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  } catch (error) {
    console.error('Error deleting entertainer:', error);
    throw error;
  }
};
