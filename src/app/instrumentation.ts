// export async function register() {
//   // Ensure this only runs in the Node.js environment, not the Edge runtime
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     const mqtt = await import('mqtt');

//     // Replace with your actual broker URL, such as your Raspberry Pi's IP
//     const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://192.168.x.x:1883';
//     const client = mqtt.connect(brokerUrl);

//     client.on('connect', () => {
//       console.log('✅ Successfully connected to MQTT broker');

//       // Subscribing to relevant hardware topics
//       client.subscribe('bakery/temperature', (err) => {
//         if (!err) console.log('📡 Subscribed to topic: bakery/temperature');
//       });

//       client.subscribe('bakery/humidity', (err) => {
//          if (!err) console.log('📡 Subscribed to topic: bakery/humidity');
//       });
//     });

//     client.on('message', (topic, message) => {
//       // Parse and handle incoming data from the hardware
//       const payload = message.toString();
//       console.log(`📥 Received on [${topic}]: ${payload}`);

//       // You can add logic here to process the data, 
//       // such as writing the environmental metrics to MongoDB
//       if (topic === 'bakery/temperature') {
//          // handle temp data
//       }
//     });

//     client.on('error', (error) => {
//       console.error('MQTT Client Error:', error);
//     });
//   }
// }     