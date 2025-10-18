import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSeed() {
  console.log('Testing database connection...');
  
  try {
    // Test simple create operation
    const testGroup = await prisma.group.create({
      data: {
        name: 'Test Group',
        description: 'Test group for debugging'
      }
    });
    
    console.log('Created test group:', testGroup);
    
    // Test upsert operation with name field
    const upsertResult = await prisma.group.upsert({
      where: { name: 'Test Group' },
      update: {},
      create: {
        name: 'Test Group',
        description: 'Updated test group'
      }
    });
    
    console.log('Upsert result:', upsertResult);
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSeed();