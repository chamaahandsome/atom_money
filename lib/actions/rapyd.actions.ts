// rapyd.actions.ts


import fetch from 'cross-fetch';
import crypto from 'crypto';

const RAPYD_API_BASE_URL = process.env.RAPYD_API_BASE_URL!;
const RAPYD_ACCESS_KEY = process.env.RAPYD_ACCESS_KEY!;
const RAPYD_SECRET_KEY = process.env.RAPYD_SECRET_KEY!;

const signRequest = (method: string, path: string, body: string) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const salt = crypto.randomBytes(12).toString('hex');
  const toSign = `${method}${path}${salt}${timestamp}${RAPYD_ACCESS_KEY}${RAPYD_SECRET_KEY}${body}`;
  const signature = crypto.createHmac('sha256', RAPYD_SECRET_KEY).update(toSign).digest('hex');

  return {
    timestamp,
    salt,
    signature,
  };
};

export const createRapydWallet = async (user: any) => {
  const path = '/v1/user';
  const method = 'POST';
  const body = JSON.stringify({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    phone_number: user.phoneNumber,
    type: 'person',
    ewallet_reference_id: `ewallet_${user.$id}`,
    contact: {
      phone_number: user.phoneNumber,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      contact_type: 'personal',
      address: {
        name: `${user.firstName} ${user.lastName}`,
        line_1: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        country: user.country || 'US',
        zip: '12345',
        phone_number: user.phoneNumber,
      },
    },
  });

  const { timestamp, salt, signature } = signRequest(method, path, body);

  const response = await fetch(`${RAPYD_API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'access_key': RAPYD_ACCESS_KEY,
      'salt': salt,
      'timestamp': timestamp.toString(),
      'signature': signature,
    },
    body,
  });

  const data = await response.json();

  if (data.status.status !== 'SUCCESS') {
    throw new Error(`Error creating wallet: ${data.status.error_code} - ${data.status.message}`);
  }

  return data.data;
};
