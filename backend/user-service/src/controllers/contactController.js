const Contact = require('../models/contact');

exports.uploadContacts = async (req, res) => {
  const contacts = req.body.contacts.map(contact => ({
    phone: contact.phone,
    userId: req.userId
  }));

  await Contact.insertMany(contacts);

  // Produce messages to Kafka
  const { Kafka } = require('kafkajs');
  const kafka = new Kafka({
    clientId: 'contact-ingestion',
    brokers: ['localhost:9092'],
  });
  const producer = kafka.producer();
  await producer.connect();
  for (const contact of contacts) {
    await producer.send({
      topic: 'contact-topic',
      messages: [{ value: JSON.stringify(contact) }],
    });
  }
  await producer.disconnect();

  res.status(200).send({ message: 'Contacts uploaded successfully' });
};
