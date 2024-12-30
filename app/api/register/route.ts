import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { prisma } from '@/util/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, phoneNumber, gender, major, securityQuestion, securityAnswer } = req.body;

  if (!name || !email || !password ||!phoneNumber || !gender || !major || !securityQuestion || !securityAnswer) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        phoneNumber,
        gender,
        major,
        name,
        email,
        password: hashedPassword,
        securityQuestion,
        securityAnswer,
      },
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


