export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const mqtt = await import('mqtt');
    
    const client = mqtt.connect({
      protocol: 'mqtts',
      host: process.env.MQTT_URL_IMAGES,
      port: Number(process.env.MQTT_PORT),
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      rejectUnauthorized: true 
    });

    client.on('connect', () => {
      console.log('[MQTT] connection successful');
      
      client.subscribe('srb/imageURL', (err) => {
        if (!err) {
          console.log('[MQTT] image url listener ready...');
        } else {
          console.error('Failed to subscribe:', err);
        }
      });
    });

    client.on('message', async (topic, message) => {
      const payload = message.toString();
      console.log(`[MQTT] Incoming message on ${topic}:`, payload);
      if (topic === 'srb/imageURL') {
        try {

          if (!payload.startsWith("https://")){
            console.warn(`[MQTT] Ignored not a valid http`);
            return
          }
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          const apiUrl = `${baseUrl}/api/images`;

          const data = {
            url: payload,
            sourceTopic: topic,
            receivedAt: new Date().toISOString()
          };
 
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
          }

          console.log('[MQTT] Successfully forwarded image URL to API endpoint');

        } catch (err) {
          console.error(`[MQTT] Failed to forward message to API: `, err);
        }
      }
    });

    client.on('error', (err) => {
      console.error('[MQTT] Connection Error:', err);
    });
  }
}