import { formatCurrency } from './utils';
import {
  User,
  SensorData,
  Device,
  Message,
} from './definitions'; // Adjust paths as needed

async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch data from the API.');
  }
}

// Fetch sensor data for a specific device
export async function fetchSensorData(deviceId: string): Promise<SensorData[]> {
  const endpoint = `http://your-fastapi-server.com/devices/${deviceId}/sensor-data`;
  try {
    const sensorData = await fetchData<SensorData[]>(endpoint);
    return sensorData;
  } catch (error) {
    throw new Error('Failed to fetch sensor data.');
  }
}

// Fetch user information
export async function fetchUser(userId: string): Promise<User> {
  const endpoint = `http://your-fastapi-server.com/users/${userId}`;
  try {
    const user = await fetchData<User>(endpoint);
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user data.');
  }
}

// Fetch device information and related sensor data
export async function fetchDevice(deviceId: string): Promise<Device> {
  const endpoint = `http://your-fastapi-server.com/devices/${deviceId}`;
  try {
    const device = await fetchData<Device>(endpoint);
    return device;
  } catch (error) {
    throw new Error('Failed to fetch device data.');
  }
}

// Fetch messages for a specific user
export async function fetchUserMessages(userId: string): Promise<Message[]> {
  const endpoint = `http://your-fastapi-server.com/users/${userId}/messages`;
  try {
    const messages = await fetchData<Message[]>(endpoint);
    return messages;
  } catch (error) {
    throw new Error('Failed to fetch messages.');
  }
}

// Fetch all devices owned by a specific user
export async function fetchUserDevices(userId: string): Promise<Device[]> {
  const endpoint = `http://your-fastapi-server.com/users/${userId}/devices`;
  try {
    const devices = await fetchData<Device[]>(endpoint);
    return devices;
  } catch (error) {
    throw new Error('Failed to fetch user devices.');
  }
}

// Example function for handling sensor data mapping
export async function mapSensorDataToDevices(userId: string): Promise<Device[]> {
  try {
    const devices = await fetchUserDevices(userId);
    const devicesWithSensorData: Device[] = await Promise.all(
      devices.map(async (device) => {
        const sensorData = await fetchSensorData(device.device_id);
        return {
          ...device,
          sensor_data: sensorData,
        };
      })
    );
    return devicesWithSensorData;
  } catch (error) {
    console.error('Error mapping sensor data to devices:', error);
    throw new Error('Failed to map sensor data.');
  }
}
