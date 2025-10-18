const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('Seeding database...');

  try {
    // Create default groups
    const adminGroup = await prisma.group.upsert({
      where: { name: 'Administradores' },
      update: {},
      create: {
        name: 'Administradores',
        description: 'Grupo de administradores do sistema'
      }
    });

    const managerGroup = await prisma.group.upsert({
      where: { name: 'Gestores' },
      update: {},
      create: {
        name: 'Gestores',
        description: 'Grupo de gestores de produção'
      }
    });

    const operatorGroup = await prisma.group.upsert({
      where: { name: 'Operadores' },
      update: {},
      create: {
        name: 'Operadores',
        description: 'Grupo de operadores de máquina'
      }
    });

    // Create default users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const managerPassword = await bcrypt.hash('gestor123', 10);
    const operatorPassword = await bcrypt.hash('operador123', 10);

    await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        firstName: 'Administrador',
        lastName: 'do Sistema',
        username: 'admin',
        email: 'admin@axisus.com',
        password: adminPassword,
        role: 'ADMIN',
        groupId: adminGroup.id
      }
    });

    await prisma.user.upsert({
      where: { username: 'gestor01' },
      update: {},
      create: {
        firstName: 'João',
        lastName: 'Silva - Gestor',
        username: 'gestor01',
        email: 'gestor01@axisus.com',
        password: managerPassword,
        role: 'MANAGER',
        groupId: managerGroup.id
      }
    });

    await prisma.user.upsert({
      where: { username: 'operador01' },
      update: {},
      create: {
        firstName: 'Pedro',
        lastName: 'Costa - Operador',
        username: 'operador01',
        email: 'operador01@axisus.com',
        password: operatorPassword,
        role: 'OPERATOR',
        groupId: operatorGroup.id
      }
    });

    // Create default products
    const product1 = await prisma.product.upsert({
      where: { code: 'PROD001' },
      update: {},
      create: {
        code: 'PROD001',
        name: 'Parafuso M8x20 - Aço Inox',
        description: 'Parafuso sextavado M8x20mm em aço inoxidável'
      }
    });

    const product2 = await prisma.product.upsert({
      where: { code: 'PROD002' },
      update: {},
      create: {
        code: 'PROD002',
        name: 'Porca M8 - Aço Inox',
        description: 'Porca sextavada M8 em aço inoxidável'
      }
    });

    const product3 = await prisma.product.upsert({
      where: { code: 'PROD003' },
      update: {},
      create: {
        code: 'PROD003',
        name: 'Arruela M8 - Aço Inox',
        description: 'Arruela lisa M8 em aço inoxidável'
      }
    });

    const product4 = await prisma.product.upsert({
      where: { code: 'PROD004' },
      update: {},
      create: {
        code: 'PROD004',
        name: 'Suporte Metálico 30x40cm',
        description: 'Suporte metálico para montagem 30x40cm'
      }
    });

    const product5 = await prisma.product.upsert({
      where: { code: 'PROD005' },
      update: {},
      create: {
        code: 'PROD005',
        name: 'Placa Alumínio 2mm 50x100cm',
        description: 'Placa de alumínio de 2mm de espessura, 50x100cm'
      }
    });

    const product6 = await prisma.product.upsert({
      where: { code: 'PROD006' },
      update: {},
      create: {
        code: 'PROD006',
        name: 'Tubo Aço 25mm - 1 metro',
        description: 'Tubo de aço de 25mm de diâmetro, 1 metro de comprimento'
      }
    });

    // Create machines
    await prisma.machine.createMany({
      data: [
        {
          name: 'Prensa Hidráulica 01',
          type: 'Produção',
          status: 'STOPPED',
          oee: 83.5,
          availability: 100.0,
          performance: 87.0,
          quality: 96.0
        },
        {
          name: 'Esteira Transportadora 02',
          type: 'Logística',
          status: 'STOPPED',
          oee: 40.8,
          availability: 58.3,
          performance: 70.0,
          quality: 100.0
        },
        {
          name: 'Injetora Plástico 03',
          type: 'Produção',
          status: 'STOPPED',
          oee: 14.7,
          availability: 20.0,
          performance: 75.0,
          quality: 98.0
        },
        {
          name: 'Empacotadora 04',
          type: 'Embalagem',
          status: 'RUNNING',
          oee: 89.3,
          availability: 100.0,
          performance: 93.0,
          quality: 96.0
        }
      ],
      skipDuplicates: true
    });

    // Create production orders
    const adminUser = await prisma.user.findUnique({
      where: { username: 'admin' }
    });
    
    if (adminUser) {
      await prisma.order.createMany({
        data: [
          {
            orderNumber: 'OP010',
            productId: product1.id,
            quantity: 339,
            produced: 217,
            status: 'IN_PROGRESS',
            priority: 2,
            createdById: adminUser.id
          },
          {
            orderNumber: 'OP009',
            productId: product5.id,
            quantity: 443,
            produced: 128,
            status: 'IN_PROGRESS',
            priority: 1,
            createdById: adminUser.id
          },
          {
            orderNumber: 'OP008',
            productId: product6.id,
            quantity: 547,
            produced: 54,
            status: 'IN_PROGRESS',
            priority: 3,
            createdById: adminUser.id
          },
          {
            orderNumber: 'OP007',
            productId: product5.id,
            quantity: 919,
            produced: 87,
            status: 'FINISHED',
            priority: 1,
            createdById: adminUser.id
          },
          {
            orderNumber: 'OP006',
            productId: product2.id,
            quantity: 830,
            produced: 16,
            status: 'PLANNED',
            priority: 2,
            createdById: adminUser.id
          }
        ],
        skipDuplicates: true
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});